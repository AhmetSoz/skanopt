import pandas as pd
import json
import os

csv_path = r"C:\Users\GilboTeknik\Desktop\SKANOPT OÖC\fuardan firma bulma\Exhibitors\HANNOVER MESSE 2025 Exhibitors.csv"
out_dir = r"C:\Users\GilboTeknik\Desktop\SKANOPT OÖC\fuardan firma bulma\lead_finder"
json_path = os.path.join(out_dir, "leads.json")

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

if not os.path.exists(csv_path):
    print("CSV file not found!")
    exit(1)

try:
    df = pd.read_csv(csv_path, sep=';', skiprows=1, encoding='latin-1', on_bad_lines='skip', index_col=False)
    
    # Fill NAs
    df['Country'] = df['Country'].fillna('').str.strip()
    df['Exhibitor'] = df['Exhibitor'].fillna('').str.strip()
    df['Company website'] = df['Company website'].fillna('').str.strip()
    df['City'] = df['City'].fillna('').str.strip()
    df['Booth'] = df['Booth'].fillna('').str.strip()
    df['Exhibitor presentation'] = df['Exhibitor presentation'].fillna('').str.strip()
    
    # Filter targets
    # 1. All Turkish exhibitors (highly important for local sales)
    tr_mask = df['Country'].str.lower().str.contains('turk|t\xfcrk|türk|trkiye', na=False)
    tr_df = df[tr_mask]
    
    # 2. International exhibitors matching precision/machining/fasteners/automation keywords
    keywords = [
        'machining', 'turned', 'turning', 'cnc', 'fastener', 'screw', 'bolt', 'nut', 'forging', 'casting', 
        'döküm', 'talaþlý', 'imalat', 'dövme', 'cývata', 'vida', 'precision', 'hassas', 
        'mould', 'mold', 'enjeksiyon', 'injection', 'plastic', 'plastik', 'sensor', 'sensör', 
        'measure', 'measuring', 'ölçüm', 'inspect', 'inspection', 'vision', 'optical', 'optik', 
        'robot', 'robotic', 'automation', 'otomasyon', 'integrat', 'entegratör', 'implant', 'dental', 'needle', 'iðne'
    ]
    pattern = '|'.join(keywords)
    kw_mask = df['Exhibitor'].str.lower().str.contains(pattern, na=False) | df['Company website'].str.lower().str.contains(pattern, na=False)
    kw_df = df[kw_mask]
    
    # Combine (remove duplicates by name)
    combined_df = pd.concat([tr_df, kw_df]).drop_duplicates(subset=['Exhibitor'])
    
    print(f"Total parsed: {len(df)}")
    print(f"Turkish: {len(tr_df)}")
    print(f"Keyword matches: {len(kw_df)}")
    print(f"Combined leads: {len(combined_df)}")
    
    leads = []
    
    for idx, row in combined_df.iterrows():
        name = row['Exhibitor']
        country = row['Country']
        if 'trkiye' in country.lower() or 'turkey' in country.lower() or '\xfcrk' in country.lower():
            country = "Türkiye"
        city = row['City']
        website = row['Company website']
        booth = row['Booth']
        presentation = row['Exhibitor presentation']
        
        # Categorize
        name_lower = name.lower()
        web_lower = website.lower()
        
        sector = "Makine / Endüstriyel Parça"
        note = ""
        
        # Determine sector and generate professional note
        if any(w in name_lower or w in web_lower for w in ['robot', 'automation', 'otomasyon', 'integrat', 'entegratör', 'control', 'kontrol', 'vision', 'görüntü']):
            sector = "Otomasyon & Robot Entegratör"
            note = f"Hannover Messe 2025 katılımcısı otomasyon ve sistem entegrasyonu firması. Kalite kontrol ve parça izleme hatlarında, marka bağımsız PLC ve robot (Stäubli, uFactory) haberleşme arayüzlerine sahip SKANOPT 2D optik ölçüm modüllerini kullanabilir."
        elif any(w in name_lower or w in web_lower for w in ['implant', 'dental', 'medical', 'medikal', 'needle', 'iðne', 'iðnesi']):
            sector = "Medikal Cihaz & Dental İmplant"
            note = f"Tıbbi cihaz, dental implant veya cerrahi iğne üreticisi. Titanyum implant vidalarının vida adımı, çap, salgı tolerans kontrolü veya tıbbi iğnelerin uç açısı/çapı ölçümleri için sub-micron seviyede ölçüm yapan SKANOPT VRE serisi (0.001 µm çözünürlük) son derece uygundur."
        elif any(w in name_lower or w in web_lower for w in ['plastic', 'plastik', 'mould', 'mold', 'kalýp', 'enjeksiyon', 'injection']):
            sector = "Plastik Enjeksiyon & Kalıp"
            note = f"Hassas plastik enjeksiyon ve kalıp parçaları üretmektedir. Plastik geçmeli konektörler, dişliler ve tırnaklı parçaların boyutsal kalibrasyonu, kalıp çekme payı analizi için SKANOPT V ve H serisi telesentrik optik sistemler kalite kontrolü hızlandırır."
        elif any(w in name_lower or w in web_lower for w in ['screw', 'bolt', 'fastener', 'cývata', 'vida', 'somun', 'turn', 'turned', 'cnc', 'machin', 'talaþlý', 'forging', 'casting', 'döküm', 'dövme', 'metal', 'precision', 'hassas', 'valve', 'gear', 'shaft', 'rot', 'piston']):
            sector = "Hassas Talaşlı İmalat / Metal"
            note = f"CNC otomat tornalama, cıvata/bağlantı elemanları veya sıcak dövme/döküm işleme yapan üretici. Akslar, vidalar, supaplar ve hassas miller üzerindeki boy, çap, diş açısı ve salgı (runout) gibi kritik parametreleri 0.4 saniyede hatasız doğrulayabilen ve aşınma telafisini doğrudan CNC'ye aktarabilen SKANOPT V/VR/VRE serisi için idealdir."
        else:
            # Fallback
            sector = "Makine / Hassas Parça İmalatı"
            note = f"Hannover Messe 2025 katılımcısı hassas makine bileşenleri veya parça imalatı firması. Kritik boyutsal doğrulamalar (çap, boy, pah, diş geometrisi) ve temassız kalite kontrol süreçleri için SKANOPT telesentrik optik sistemleri önerilir."

        # Make contact info simple from booth/website
        contact = f"Website: {website}"
        if booth:
            contact += f" | Fuar Standı: {booth}"
            
        leads.append({
            "firma_ismi": name,
            "ulke": country,
            "sektor": sector,
            "fuar": "Hannover Messe 2025",
            "web_sitesi_linki": website,
            "iletisim_bilgileri": contact,
            "not": note,
            "city": city,
            "booth": booth,
            "presentation": presentation
        })

    # Save to JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(leads, f, ensure_ascii=False, indent=4)
        
    print(f"Successfully processed and saved {len(leads)} leads to {json_path}")
    
except Exception as e:
    print("Error:", e)
