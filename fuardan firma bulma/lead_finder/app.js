let allLeads = [];
let filteredLeads = [];
let selectedLeads = new Set(); // store lead names

// Dynamic API Base URL detection (uses Python backend port 8500 when running locally)
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
    ? 'http://localhost:8500'
    : '';

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
        let fileLeads = [];
        
        // 1. First load from the actual source (file or preloaded script)
        if (window.location.protocol === 'file:') {
            if (window.LEADS_DATA && window.LEADS_DATA.length > 0) {
                fileLeads = window.LEADS_DATA;
            } else {
                throw new Error("Local leads.js data not found.");
            }
        } else {
            const response = await fetch('leads.json?t=' + Date.now());
            if (!response.ok) {
                throw new Error("leads.json dosyası yüklenemedi.");
            }
            fileLeads = await response.json();
        }
        
        // 2. Compare with localStorage cache to prevent stale views
        const localData = localStorage.getItem('skanopt_leads');
        if (localData) {
            const localLeads = JSON.parse(localData);
            // If file database is newer/larger, force upgrade local storage
            if (localLeads.length >= fileLeads.length) {
                allLeads = localLeads;
                console.log("Loaded leads from browser localStorage.");
            } else {
                allLeads = fileLeads;
                localStorage.setItem('skanopt_leads', JSON.stringify(fileLeads));
                console.log("LocalStorage cache was stale. Upgraded to latest database with " + fileLeads.length + " leads.");
            }
        } else {
            allLeads = fileLeads;
            console.log("Loaded leads from database (no cache).");
        }
        
        // Populate country and sector filters dynamically
        populateCountryFilter();
        populateSectorFilter();
        
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

// Dynamically read unique sectors and counts, then build main filter options and modal form options
function populateSectorFilter() {
    const sectorCounts = {};
    allLeads.forEach(lead => {
        const sector = lead.sektor || 'Bilinmeyen';
        sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    });

    // Sort sectors by count (descending)
    const sortedSectors = Object.keys(sectorCounts).sort((a, b) => sectorCounts[b] - sectorCounts[a]);

    // Build options for main filter dropdown
    let filterOptionsHtml = `<option value="all">Tümü (Tüm Sektörler)</option>`;
    sortedSectors.forEach(sector => {
        filterOptionsHtml += `<option value="${sector}">${sector} (${sectorCounts[sector]} Firma)</option>`;
    });
    sectorFilter.innerHTML = filterOptionsHtml;

    // Build options for edit modal form select dropdown
    const editSectorSelect = document.getElementById('edit-sector');
    if (editSectorSelect) {
        let editOptionsHtml = '';
        sortedSectors.forEach(sector => {
            if (sector !== 'Bilinmeyen') {
                editOptionsHtml += `<option value="${sector}">${sector}</option>`;
            }
        });
        
        // Ensure default core target sectors are always present as fallback options
        const defaultSectors = [
            "Hassas Talaşlı İmalat / Metal",
            "Makine / Endüstriyel Parça",
            "Plastik Enjeksiyon & Kalıp",
            "Medikal Cihaz & Dental İmplant",
            "Otomasyon & Robot Entegratör"
        ];
        defaultSectors.forEach(ds => {
            if (!sortedSectors.includes(ds)) {
                editOptionsHtml += `<option value="${ds}">${ds}</option>`;
            }
        });
        editSectorSelect.innerHTML = editOptionsHtml;
    }
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
            <td class="cell-fair" style="font-weight: 500; color: #4A5568;">${lead.fuar || ''}</td>
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
        document.getElementById('edit-fair').value = lead.fuar || "";
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
        document.getElementById('edit-fair').value = "Hannover Messe 2025";
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
    const fair = document.getElementById('edit-fair').value.trim() || "Hannover Messe 2025";
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
        fuar: fair,
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
    
    // Save to localStorage as a client-side backup (essential for static Vercel deployments)
    localStorage.setItem('skanopt_leads', JSON.stringify(allLeads));
    
    try {
        const response = await fetch(API_BASE + '/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allLeads)
        });
        
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Not a JSON response");
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showToast(data.message, "success");
        } else {
            throw new Error(data.message || "Kaydetme başarısız.");
        }
    } catch (error) {
        console.warn("Backend save failed, saved to browser localStorage only:", error);
        showToast("Değişiklikler tarayıcı hafızasına (localStorage) kaydedildi! (Vercel/Static mod)", "success");
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

    // Try calling the local server backend first
    try {
        const response = await fetch(API_BASE + '/api/export_excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ leads: leadsToExport })
        });
        
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Not a JSON response");
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showToast(data.message, "success");
            btnExportExcel.disabled = false;
            btnExportExcel.innerHTML = "💚 Seçilenleri Excel'e Aktar";
            return;
        } else {
            throw new Error(data.message || "Excel yazma hatası.");
        }
    } catch (error) {
        console.warn("Backend API export failed, falling back to client-side CSV download:", error);
        
        // Client-side CSV fallback (perfect for Vercel/static deployment and file locks)
        try {
            const BOM = "\uFEFF"; // UTF-8 BOM so Excel opens it with correct characters (Turkish & Chinese)
            let csvContent = BOM;
            
            // Header row
            const headers = ["Firma İsmi", "Ülke", "Sektör", "Fuar", "Web Sitesi", "İletişim Bilgileri", "Not"];
            csvContent += headers.map(h => '"' + h.replace(/"/g, '""') + '"').join(";") + "\r\n";
            
            // Data rows
            leadsToExport.forEach(lead => {
                const row = [
                    lead.firma_ismi || '',
                    lead.ulke || '',
                    lead.sektor || '',
                    lead.fuar || '',
                    lead.web_sitesi_linki || '',
                    lead.iletisim_bilgileri || '',
                    lead.not || ''
                ];
                csvContent += row.map(val => '"' + String(val).replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"').join(";") + "\r\n";
            });
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "Robotsepeti_Fuar_Hedef_Firmalar.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showToast("Veriler Robotsepeti_Fuar_Hedef_Firmalar.csv olarak indirildi! (Tarayıcı modu)", "success");
        } catch (csvError) {
            console.error(csvError);
            showToast("Aktarma hatası: " + error.message, "error");
        }
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
