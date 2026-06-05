# SKANOPT Web Sitesi — DEVAM PROMPTU (handoff)

Aşağıdaki promptu yeni bir oturuma/AI'a olduğu gibi verebilirsin.

---

## GÖREV
`C:\Users\GilboTeknik\Desktop\SKANOPT OÖC` klasöründeki **SKANOPT optik ölçüm sistemleri** tanıtım sitesini
geliştirmeye **kaldığın yerden** devam et. Site `site/` altında, statik (HTML/CSS/JS), tek sayfa, TR+EN.
Tam plan ve tüm ürün/rakip verileri: proje kökündeki **PLAN.md** (özellikle §8). Marka/tasarım kuralları aşağıda.

## MARKA & DEĞİŞMEZ KURALLAR
- Marka **SKANOPT**. Hiçbir yerde "ZETMES"/"CONCEPT 0001" geçmeyecek (kontrol: `grep -i zetmes`).
- Tasarım: **beyaz, modern, ferah, güvenilir, profesyonel** (yöneticinin net talebi).
- **Görsellerde yazı/marka YOK.** Kullanılacak her görsel tek tek (Read ile) görülüp kontrol edilecek;
  üzerinde logo, marka, okunaklı yazı veya markalı cihaz/insan olan görsel ELENİR. Makro/parça çekimleri en güvenlisi.
- `videolar/kullanılmayacak/` kullanılmaz. Markalı makine-PDF render'ları (belgeler/ZETMES MACHINE...pdf) kullanılmaz.

## ŞU AN TAMAMLANMIŞ DURUM
- Site tam çalışıyor: `site/index.html`, `css/styles.css`, `js/config.js`, `js/i18n.js`, `js/main.js`.
- TR+EN dil değiştirici, 11 bölüm (Hero→Neden→Seriler V/VR/VRE/W/H→Nasıl Çalışır→Otomasyon(video)→Yazılım→
  Karşılaştırma→Sektörler→Referanslar→İletişim→Footer). JS sözdizimi OK, "ZETMES" yok, TR+EN render Edge ile doğrulandı.
- Hazır görseller (`site/assets/img/`): product-a..d (temiz CAD render, gizmo silinmiş, jpg+webp), studio,
  automation-poster, favicon/apple-touch/og-image, favicon.svg. Video: `assets/video/automation.mp4/.webm` (gerçek inline ölçüm).
- İletişim bilgileri **placeholder** (kullanıcı kararı) → `site/js/config.js` içinde (skanopt.com / info@skanopt.com / telefon+WhatsApp boş). Kullanıcı dolduracak.
- Yerel önizleme: `python -m http.server 8080 --directory "site"` → http://localhost:8080/

## DEVAM EDİLEN İŞ (yarıda kaldı): DAHA FAZLA GERÇEK GÖRSEL + VİDEO
Kullanıcı hero'daki düz CAD render'ı zayıf buldu ve **çok daha fazla gerçek, markasız görsel/video** istiyor.
Kaynak: **Pexels** (ücretsiz ticari lisans, atıf gerekmez).
- İndirme kalıbı (PowerShell, tarayıcı User-Agent ile):
  `https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1400`
  (Eski/küçük ID'ler 404 verebilir; yeni ID'ler standart kalıba uyar.)
- ID toplama: WebFetch ile `https://www.pexels.com/search/<konu>/` sayfasından foto ID'lerini çıkar.

### `site/assets/img/_src/` içinde ZATEN İNDİRİLMİŞ adaylar
QA EDİLDİ — KULLANILABİLİR (markasız, alakalı):
- `c3_10406128` CNC talaşlı işleme (temiz, mavi-gri) ★  → CNC/Nasıl çalışır
- `q1_5290119` hassas ölçüm aletleri, koyu zemin + boş alan ★ → Kalite kontrol / hero/section overlay
- `c1_8956445` soğutma sıvılı CNC, `c2_8865187` CNC spindle → CNC/otomasyon
- `b1_19911421` rulmanlar (hafif pembe ton, nötrlenebilir) → otomotiv/mekanik
- `m1_239419` dişliler (sıcak ton), `m4_7568427` şanzıman dişlileri → mekanik/otomotiv
- `b4_34792550` çelik bilye dokusu → arka plan/doku
- `test_cpu_6636497` kırmızı PCB makro (yalnız minik komponent yazıları) → elektronik (sınırda uygun)

QA EDİLDİ — ELENDİ: `test_robot_34207359`(FANUC logo+insan), `b2_35568191`(belirsiz), `b3_20339264`(gıda hattı),
`c4_7480241`(ahşap), `m2_19499386`(dağınık), `m3_5279346`("brose" markası), `q2_5973888`(STANLEY+ahşap),
`q3_7166968`(insan+ahşap), `q4_5466152`("DIGITAL INCLINOMETER" yazısı).

HENÜZ İNCELENMEDİ (Read ile görüp QA yap — markasız olanları seç):
- Cerrahi/medikal: `s1_7585018`, `s2_4483319`, `s3_7585025`
- Türbin/havacılık: `t1_11213147`, `t2_16160818`, `t3_19101570`
- Plastik/kalıp: `p1_5973348`, `p2_4210550`, `p3_31115985`
- Tornalanmış metal parça: `n1_5846176`, `n2_17937673`, `n3_19004429`, `n4_30335403`, `n5_7220818`

## SIRADAKİ ADIMLAR
1. `_src` içindeki incelenmemiş adayları Read ile gör; medikal, havacılık, plastik, (mümkünse beyaz eşya) ve
   güçlü bir hero makrosu için markasız olanları seç. Eksik kategori için ek WebFetch/indirme yapılabilir.
2. Seçilenleri web'e optimize et (PIL): ~1400–1600px, jpg(q82-86)+webp, gerekiyorsa renk tonu nötrle (örn. b1 pembe).
   `site/assets/img/` altına anlaşılır adlarla kaydet: ör. `sec-automotive`, `sec-cnc`, `sec-electronics`,
   `sec-medical`, `sec-aero`, `sec-plastic`, `qc-tools`, `cnc-hero` vb.
3. **Hero'yu güçlendir**: zayıf `product-a` yerine daha iyi bir görsel kurgu (gerçek `studio.jpg` veya
   ürün + gerçek-makro aksanı). Beyaz/ferah kalsın, ürün görünür kalsın.
4. **Sektör kartlarını görselli yap**: her `.sector` kartının üstüne `<img>`. `js/i18n.js` içinde `sec.sectors`
   öğelerine görsel anahtarı ekle (tr+en) veya icon-key → görsel eşlemesi; `main.js renderDynamic` ve CSS güncelle.
5. (Opsiyon) Uygulama/galeri görsel şeridi ve/veya `q1`/`c3` ile ince bölüm arka planı. (Opsiyon) Pexels'ten
   markasız 1 fabrika/CNC ambiyans videosu (pexels.com/search/videos/) — QA + ffmpeg ile sıkıştır.
6. Doğrula: Edge headless screenshot (aşağıdaki komut), `grep -i zetmes` boş, kullanılan hiçbir görselde yazı/marka yok, responsive.
7. `_src` ve geçici klasörleri temizle.

## TEKNİK NOTLAR / TUZAKLAR (önemli)
- **Türkçe içerik dosyaları DAİMA Write aracıyla yazılır (UTF-8).** Türkçe metni ASLA `python -` pipe'ına gömme
  (konsol "?" yapar). Python gerekiyorsa: ya Write ile `.py` dosyası yazıp çalıştır, YA da proje yolunu Desktop'ı
  tarayarak bul (`startswith("SKANOPT")`) — yol içindeki "Ö" kaynağa gömülünce bozuluyor.
- Mevcut araçlar: Python (PIL, numpy, fitz, openpyxl; cv2 YOK), ffmpeg, node, Edge.
- Edge headless screenshot (Edge açık olduğundan ayrı profil şart):
  `& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --hide-scrollbars
   --no-first-run --no-default-browser-check --user-data-dir="$env:TEMP\skanopt_edge" --virtual-time-budget=7000
   --window-size=1440,5600 --screenshot="out.png" "file-url"`  (URL: `(New-Object System.Uri($indexPath)).AbsoluteUri`)
- Pexels indirme: `Invoke-WebRequest $u -OutFile $out -Headers @{ "User-Agent"="Mozilla/5.0 ... Chrome/124 Safari/537.36" }`
- i18n mimarisi: index.html'de TR metin + `data-i18n` anahtarları; `js/i18n.js` = tam TR+EN sözlük + `SPECS` (seri tabloları);
  `js/main.js` dinamik bölümleri `I18N[lang]`'dan render eder. Sektör görseli eklerken tr+en tutarlı güncelle.

## KARARLAR (kilitli, değiştirme)
Dil TR+EN · Tek sayfa · Fiyat gizli (SKANOPT="Rekabetçi", Demo/Teklif CTA) · VRE serisi + 0.001µm KALIR ·
İletişim placeholder (config.js) · Tipografik SKANOPT logo.
