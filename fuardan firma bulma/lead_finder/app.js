let allLeads = [];
let filteredLeads = [];
let selectedLeads = new Set(); // store lead names

// DOM Elements
const tbody = document.getElementById('leads-tbody');
const searchInput = document.getElementById('search-input');
const countryFilter = document.getElementById('country-filter');
const priorityFilter = document.getElementById('priority-filter');
const sectorFilter = document.getElementById('sector-filter');
const selectAllCheckbox = document.getElementById('select-all-leads');

// Stats Elements
const statTotal = document.getElementById('stat-total');
const statHighPriority = document.getElementById('stat-high-priority');
const statSelected = document.getElementById('stat-selected');

// Action Buttons
const btnSaveDisk = document.getElementById('btn-save-disk');
const btnExportExcel = document.getElementById('btn-export-excel');
const btnAddLead = document.getElementById('btn-add-lead');

// Modal Elements
const editModal = document.getElementById('edit-modal');
const modalTitle = document.getElementById('modal-title');
const editForm = document.getElementById('edit-form');
const btnModalSave = document.getElementById('btn-modal-save');
const editIndexInput = document.getElementById('edit-index');

// Initialize application - with password protection check
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

// Password authorization check
function checkAuth() {
    const isAuth = sessionStorage.getItem('skanopt_authorized');
    const overlay = document.getElementById('login-overlay');
    
    if (isAuth === 'true') {
        overlay.style.display = 'none';
        loadLeads();
    } else {
        overlay.style.display = 'flex';
        
        const btnLogin = document.getElementById('btn-login');
        const passwordInput = document.getElementById('login-password');
        const loginError = document.getElementById('login-error');
        
        function tryLogin() {
            const pwd = passwordInput.value;
            if (pwd === 'robotsepeti123') {
                sessionStorage.setItem('skanopt_authorized', 'true');
                overlay.style.display = 'none';
                loadLeads();
            } else {
                loginError.textContent = "Hatalı şifre, lütfen tekrar deneyin!";
                passwordInput.value = '';
                passwordInput.focus();
            }
        }
        
        btnLogin.addEventListener('click', tryLogin);
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                tryLogin();
            }
        });
        
        // Auto focus on input
        passwordInput.focus();
    }
}

// Load leads from leads.json
async function loadLeads() {
    try {
        const response = await fetch('leads.json');
        if (!response.ok) {
            throw new Error("leads.json dosyası yüklenemedi.");
        }
        allLeads = await response.json();
        
        // Populate country filter dropdown dynamically
        populateCountryFilter();
        
        // Select all leads by default for easy initial export
        selectedLeads = new Set(allLeads.map(l => l.firma_ismi));
        
        applyFilters();
        showToast("Veritabanı başarıyla yüklendi! Toplam " + allLeads.length + " firma.", "success");
    } catch (error) {
        console.error("Yükleme hatası:", error);
        tbody.innerHTML = `<tr><td colspan="9" class="empty-cell">Hata: Veritabanı yüklenemedi. server.py sunucusunun çalıştığından ve leads.json dosyasının mevcut olduğundan emin olun.</td></tr>`;
        showToast("Veri yüklenirken hata oluştu!", "error");
    }
}

// Dynamically read unique countries and counts, then build select options
function populateCountryFilter() {
    const countryCounts = {};
    allLeads.forEach(lead => {
        const country = lead.ulke || 'Bilinmeyen';
        countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    // Sort countries by count (descending)
    const sortedCountries = Object.keys(countryCounts).sort((a, b) => countryCounts[b] - countryCounts[a]);

    // Build options
    let optionsHtml = `<option value="all">Tümü (Tüm Ülkeler) (${allLeads.length})</option>`;
    sortedCountries.forEach(country => {
        optionsHtml += `<option value="${country}">${country} (${countryCounts[country]} Firma)</option>`;
    });

    countryFilter.innerHTML = optionsHtml;
}

// Setup all event listeners
function setupEventListeners() {
    // Live filter inputs
    searchInput.addEventListener('input', applyFilters);
    countryFilter.addEventListener('change', applyFilters);
    priorityFilter.addEventListener('change', applyFilters);
    sectorFilter.addEventListener('change', applyFilters);
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', (e) => {
        const checked = e.target.checked;
        filteredLeads.forEach(lead => {
            if (checked) {
                selectedLeads.add(lead.firma_ismi);
            } else {
                selectedLeads.delete(lead.firma_ismi);
            }
        });
        updateStats();
        renderTable();
    });

    // Add Lead Button
    btnAddLead.addEventListener('click', () => {
        openEditModal(null);
    });

    // Save changes to disk (JSON)
    btnSaveDisk.addEventListener('click', saveLeadsToDisk);

    // Export selected leads to Excel
    btnExportExcel.addEventListener('click', exportSelectedToExcel);

    // Modal Close
    document.querySelectorAll('.close-modal, .close-modal-btn').forEach(el => {
        el.addEventListener('click', closeEditModal);
    });

    // Save button inside modal
    btnModalSave.addEventListener('click', saveModalForm);
}

// Filter and search logic
function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedCountry = countryFilter.value;
    const selectedPriority = priorityFilter.value;
    const selectedSector = sectorFilter.value;

    filteredLeads = allLeads.filter(lead => {
        // 1. Search Query (Name or Website)
        const nameMatch = lead.firma_ismi.toLowerCase().includes(query);
        const webMatch = lead.web_sitesi_linki.toLowerCase().includes(query);
        const matchSearch = nameMatch || webMatch;

        // 2. Country Filter
        const matchCountry = selectedCountry === 'all' || lead.ulke === selectedCountry;

        // 3. Priority Filter
        const matchPriority = selectedPriority === 'all' || lead.oncelik === selectedPriority;

        // 4. Sector Filter
        const matchSector = selectedSector === 'all' || lead.sektor === selectedSector;

        return matchSearch && matchCountry && matchPriority && matchSector;
    });

    // Sort: High priority first, then medium, then integrator, then low
    const priorityWeight = {
        "Yüksek Öncelik": 4,
        "Orta Öncelik": 3,
        "Sistem Entegratörü": 2,
        "Düşük Öncelik": 1
    };
    filteredLeads.sort((a, b) => {
        const wA = priorityWeight[a.oncelik] || 0;
        const wB = priorityWeight[b.oncelik] || 0;
        return wB - wA; // descending
    });

    // Update select all checkbox state
    const allFilteredSelected = filteredLeads.length > 0 && filteredLeads.every(lead => selectedLeads.has(lead.firma_ismi));
    selectAllCheckbox.checked = allFilteredSelected;

    updateStats();
    renderTable();
}

// Update top statistics panel
function updateStats() {
    statTotal.textContent = allLeads.length;
    statHighPriority.textContent = allLeads.filter(l => l.oncelik === 'Yüksek Öncelik').length;
    statSelected.textContent = selectedLeads.size;
}

// Render data table rows
function renderTable() {
    if (filteredLeads.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="empty-cell">Aradığınız kriterlere uygun firma bulunamadı.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    filteredLeads.forEach((lead) => {
        const isChecked = selectedLeads.has(lead.firma_ismi);
        const tr = document.createElement('tr');
        if (isChecked) {
            tr.classList.add('row-selected');
        }

        // Web Link formatting
        let webLinkHtml = '';
        if (lead.web_sitesi_linki) {
            let url = lead.web_sitesi_linki;
            if (!url.startsWith('http')) {
                url = 'http://' + url;
            }
            webLinkHtml = `<a href="${url}" target="_blank" title="${url}">${lead.web_sitesi_linki}</a>`;
        }

        // Priority Badge HTML
        let priorityBadge = '';
        const priority = lead.oncelik || 'Düşük Öncelik';
        if (priority === 'Yüksek Öncelik') {
            priorityBadge = `<span class="badge-priority badge-high">⭐ Yüksek</span>`;
        } else if (priority === 'Orta Öncelik') {
            priorityBadge = `<span class="badge-priority badge-medium">⭐ Orta</span>`;
        } else if (priority === 'Sistem Entegratörü') {
            priorityBadge = `<span class="badge-priority badge-integrator">🤖 Entegratör</span>`;
        } else {
            priorityBadge = `<span class="badge-priority badge-low">⭐ Düşük</span>`;
        }

        tr.innerHTML = `
            <td>
                <input type="checkbox" class="lead-checkbox" data-name="${lead.firma_ismi}" ${isChecked ? 'checked' : ''}>
            </td>
            <td class="cell-bold">${lead.firma_ismi}</td>
            <td>
                <span class="cell-country">${lead.ulke}</span>
                <span class="cell-city">${lead.city}</span>
            </td>
            <td class="cell-sector">${lead.sektor}</td>
            <td>
                ${priorityBadge}
                <span class="priority-reason">${lead.oncelik_gerekcesi || ''}</span>
            </td>
            <td class="cell-link">${webLinkHtml}</td>
            <td class="cell-contact">${lead.iletisim_bilgileri || ''}</td>
            <td>
                <div class="cell-note">${lead.not}</div>
            </td>
            <td class="action-cell">
                <button class="btn-action btn-edit" title="Düzenle" onclick="editLeadByName('${lead.firma_ismi}')">✏️</button>
                <button class="btn-action btn-delete" title="Sil" onclick="deleteLeadByName('${lead.firma_ismi}')">🗑️</button>
            </td>
        `;

        // Toggle checkbox click event
        const checkbox = tr.querySelector('.lead-checkbox');
        checkbox.addEventListener('change', (e) => {
            const name = e.target.getAttribute('data-name');
            if (e.target.checked) {
                selectedLeads.add(name);
                tr.classList.add('row-selected');
            } else {
                selectedLeads.delete(name);
                tr.classList.remove('row-selected');
            }
            updateStats();
            
            const allFilteredSelected = filteredLeads.every(l => selectedLeads.has(l.firma_ismi));
            selectAllCheckbox.checked = allFilteredSelected;
        });

        tbody.appendChild(tr);
    });
}

// Edit lead lookup by unique name
window.editLeadByName = function(name) {
    const idx = allLeads.findIndex(l => l.firma_ismi === name);
    if (idx !== -1) {
        openEditModal(idx);
    }
}

// Delete lead by unique name
window.deleteLeadByName = function(name) {
    if (confirm(`'${name}' firmasını silmek istediğinize emin misiniz?`)) {
        const idx = allLeads.findIndex(l => l.firma_ismi === name);
        if (idx !== -1) {
            allLeads.splice(idx, 1);
            selectedLeads.delete(name);
            applyFilters();
            showToast("Firma silindi. Kalıcı olması için sol menüden disk kaydetmeyi unutmayın.", "success");
        }
    }
}

// Open modal for editing or adding
function openEditModal(index) {
    editForm.reset();
    
    if (index !== null) {
        // Edit mode
        modalTitle.textContent = "Firma Bilgilerini Düzenle";
        const lead = allLeads[index];
        editIndexInput.value = index;
        
        document.getElementById('edit-name').value = lead.firma_ismi;
        document.getElementById('edit-country').value = lead.ulke;
        document.getElementById('edit-city').value = lead.city;
        document.getElementById('edit-priority').value = lead.oncelik || "Yüksek Öncelik";
        document.getElementById('edit-priority-reason').value = lead.oncelik_gerekcesi || "";
        document.getElementById('edit-sector').value = lead.sektor;
        document.getElementById('edit-website').value = lead.web_sitesi_linki;
        document.getElementById('edit-contact').value = lead.iletisim_bilgileri;
        document.getElementById('edit-note').value = lead.not;
    } else {
        // Add mode
        modalTitle.textContent = "Yeni Firma Ekle";
        editIndexInput.value = "new";
        document.getElementById('edit-country').value = "Türkiye";
        document.getElementById('edit-priority').value = "Yüksek Öncelik";
        document.getElementById('edit-sector').value = "Hassas Talaşlı İmalat / Metal";
    }
    
    editModal.style.display = 'flex';
}

// Close Modal
function closeEditModal() {
    editModal.style.display = 'none';
}

// Save Modal Data (form values)
function saveModalForm() {
    const name = document.getElementById('edit-name').value.trim();
    const country = document.getElementById('edit-country').value.trim();
    const city = document.getElementById('edit-city').value.trim();
    const priority = document.getElementById('edit-priority').value;
    const reason = document.getElementById('edit-priority-reason').value.trim();
    const sector = document.getElementById('edit-sector').value;
    const website = document.getElementById('edit-website').value.trim();
    const contact = document.getElementById('edit-contact').value.trim();
    const note = document.getElementById('edit-note').value.trim();
    const indexVal = editIndexInput.value;

    if (!name || !country || !note) {
        showToast("Lütfen gerekli alanları (Firma İsmi, Ülke, Satış Notu) doldurun!", "error");
        return;
    }

    // Preserve existing booth or presentation if editing
    let existingBooth = "";
    let existingPres = "";
    if (indexVal !== "new") {
        const oldLead = allLeads[parseInt(indexVal)];
        existingBooth = oldLead.booth || "";
        existingPres = oldLead.presentation || "";
    }

    const leadData = {
        firma_ismi: name,
        ulke: country,
        sektor: sector,
        oncelik: priority,
        oncelik_gerekcesi: reason || getDefaultReason(priority, sector),
        fuar: "Hannover Messe 2025",
        web_sitesi_linki: website,
        iletisim_bilgileri: contact || ("Website: " + website + (existingBooth ? " | Fuar Standı: " + existingBooth : "")),
        not: note,
        city: city,
        booth: existingBooth,
        presentation: existingPres
    };

    if (indexVal === "new") {
        // Add new
        allLeads.unshift(leadData); // Put new items at the top
        selectedLeads.add(name); // Select automatically
        showToast("Yeni firma listeye eklendi!", "success");
    } else {
        // Edit existing
        const idx = parseInt(indexVal);
        const oldName = allLeads[idx].firma_ismi;
        
        // Update selection tracking if name changed
        if (oldName !== name) {
            if (selectedLeads.has(oldName)) {
                selectedLeads.delete(oldName);
                selectedLeads.add(name);
            }
        }
        
        allLeads[idx] = leadData;
        showToast("Firma bilgileri başarıyla güncellendi!", "success");
    }

    closeEditModal();
    
    // Repopulate country filter since a new country could have been added/modified
    populateCountryFilter();
    applyFilters();
}

function getDefaultReason(priority, sector) {
    if (priority === 'Yüksek Öncelik') {
        return "Yüksek hassasiyetli metal/CNC veya medikal parçalar üretmekte olup, telesentrik optik sistemler için en ideal müşteri eşleşmesidir.";
    } else if (priority === 'Orta Öncelik') {
        return "Plastik enjeksiyon veya hassas montaj parçaları üretmektedir. Optik kalite kontrol cihazlarımıza uygundur ancak parça limitleri değerlendirilmelidir.";
    } else if (priority === 'Sistem Entegratörü') {
        return "Doğrudan cihaz satın almaz, ancak kurduğu robotik/otomasyon hatlarına SKANOPT ölçüm modüllerini entegre edebilecek kanal ortağıdır.";
    } else {
        return "Telesentrik cihaz görüş alanımızın dışında büyük sac parçalar veya kablolar üretmektedir; optik ölçüm ihtiyacı düşüktür.";
    }
}

// Save current list state to disk via POST /api/save
async function saveLeadsToDisk() {
    btnSaveDisk.disabled = true;
    btnSaveDisk.innerHTML = "Saving...";
    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allLeads)
        });
        const data = await response.json();
        
        if (response.ok && data.status === 'success') {
            showToast(data.message, "success");
        } else {
            throw new Error(data.message || "Kaydetme başarısız.");
        }
    } catch (error) {
        console.error(error);
        showToast("Hata: Disk kaydetme işlemi başarısız oldu! " + error.message, "error");
    } finally {
        btnSaveDisk.disabled = false;
        btnSaveDisk.innerHTML = "💾 Değişiklikleri Kaydet (JSON)";
    }
}

// Export selected leads to Excel via POST /api/export_excel
async function exportSelectedToExcel() {
    if (selectedLeads.size === 0) {
        showToast("Lütfen Excel'e aktarmak için en az bir firma seçin!", "error");
        return;
    }

    btnExportExcel.disabled = true;
    btnExportExcel.innerHTML = "Exporting...";

    const leadsToExport = allLeads.filter(l => selectedLeads.has(l.firma_ismi));

    try {
        const response = await fetch('/api/export_excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ leads: leadsToExport })
        });
        const data = await response.json();
        
        if (response.ok && data.status === 'success') {
            showToast(data.message, "success");
        } else {
            throw new Error(data.message || "Excel yazma hatası.");
        }
    } catch (error) {
        console.error(error);
        showToast("Excel aktarma hatası: " + error.message, "error");
    } finally {
        btnExportExcel.disabled = false;
        btnExportExcel.innerHTML = "💚 Seçilenleri Excel'e Aktar";
    }
}

// Helper to show a notification toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    
    toastMsg.textContent = message;
    toast.className = 'toast ' + type;
    toast.style.display = 'flex';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 4500);
}
