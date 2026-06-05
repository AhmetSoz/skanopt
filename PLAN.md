# SKANOPT — Optik Ölçüm Sistemleri · Premium Tek Sayfa Web Sitesi
### Detaylı Uygulama Planı + Takip/Paylaşım Dokümanı

> **MARKA: SKANOPT.** Belgelerde geçen eski "ZETMES" adı **her yerden kaldırılacak** (metin,
> başlık, görsel, 3D render, domain, e-posta dahil). Sitede hiçbir yerde "ZETMES" geçmeyecek.
> Bu dosya hem uygulama planı, hem de başka AI/ekiple paylaşılabilen takip dokümanıdır.
> *(Onay sonrası ilk iş: bu plan `…/SKANOPT OÖC/PLAN.md` ve `PLAN.txt` olarak proje klasörüne kopyalanacak.)*

---

## 0. Amaç & Bağlam
SKANOPT, Türkiye'de üretilen **2D telesentrik (shadow-based) optik boyutsal ölçüm sistemidir**
(Keyence TM-X5000 muadili). Hedef: **hassas kalite kontrol, otomotiv yan sanayi, beyaz eşya,
implant/medikal** sektörlerine satış için **beyaz, modern, ferah, güvenilir, profesyonel** bir
tanıtım/satış sitesi. Yöneticinin net talebi bu beş sıfat. Hız önemli ama kalite ödün verilmeyecek.

Tüm kaynaklar incelendi: TR broşürü (PDF), ZETMES MACHINE render PDF'i, Keyence + Besong rakip
PDF'leri, 10 slaytlık sunum, 7 sayfalık Excel rakip analizi, özellik fotoğrafları, görseller, video.

---

## 1. Kilitli Kararlar (kullanıcı onaylı)
| Konu | Karar |
|---|---|
| Marka | **SKANOPT** (ZETMES tamamen kaldırılır) |
| Dil | **TR + EN** (sağ üstte dil değiştirici, varsayılan TR, seçim `localStorage`) |
| Yapı | **Tek sayfa premium** (sticky menü + anchor scroll) |
| Fiyat | **Gösterilmez.** "Demo Talep Et / Teklif Al" CTA. Rakip tabloda SKANOPT = "Rekabetçi" |
| VRE serisi + "0.001 µm" | **Sitede KALACAK** (kullanıcı kararı; İPTAL notuna rağmen) |
| İletişim bilgisi | **Placeholder** — tek `data/site-config.json`'dan beslenir, sonra doldurulur |
| Logo | **Tipografik "SKANOPT" wordmark + favicon** (üretilecek) |

---

## 2. Değişmez İçerik Kuralları
1. **Görsellerde yazı YOK.** Yazı/logo/filigran içeren görseller kullanılmaz veya kırpılır.
2. **"ZETMES" hiçbir yerde geçmez.** 3D render'larda gövdede ZETMES markası varsa o render elenir
   veya "SKANOPT" olacak şekilde düzenlenir. Render'lar uygulama başında tek tek görsel kontrolden geçer.
3. **İptal/üstü çizili modeller kullanılmaz** (bkz. §8-A). VRE serisi — kullanıcı kararıyla — istisna.
4. **`videolar/kullanılmayacak/` klasörü kullanılmaz.** Tek geçerli video: `videolar/3.1.mp4`.
5. **Kullanılmayacak görseller:** Keyence ekran görüntüsü (`2026-04-21 18.42.02` — rakip + yazı),
   fuar fotoğrafı (`2026-05-08 12.18.37` — H_75 etiketi + Yamer/rakip logoları), `2026-05-09 08.44.23` (0 byte/bozuk).

---

## 3. Teknik Mimari
- **Saf statik HTML + CSS + JS — build adımı YOK.** Gerekçe: hız, sıfır bağımlılık, her yerde
  barınır (Netlify/Vercel/GitHub Pages/paylaşımlı hosting), eksik araçlara (pdftoppm vb.) takılmaz,
  kullanıcı geliştirici değil. `index.html` çift tıkla açılır.
- **i18n:** `data-i18n` attribute'leri + `data/i18n.json` (TR/EN sözlüğü). `js/i18n.js` metinleri
  değiştirir, seçim `localStorage`'da saklanır; `<html lang>` + `<meta hreflang>` güncellenir.
- **Site içeriği & iletişim:** `data/site-config.json` (iletişim placeholder'ları, linkler) tek
  kaynaktan beslenir → sonradan doldurmak tek dosyada.
- **Animasyon:** Native — IntersectionObserver scroll-reveal (staggered), CSS transitions, stat
  count-up, hover-lift, sticky-nav aktif bölüm, `scroll-behavior:smooth`. Harici JS animasyon
  kütüphanesi yok (güvenilirlik + offline). `prefers-reduced-motion` tam saygı.
- **Fontlar:** Başlık `Sora`, gövde `Inter` (Google Fonts `latin-ext` ⇒ Türkçe karakter tam;
  `preconnect` + sistem font fallback). İstenirse self-host'a alınır (offline garanti).
- **Bağımlılık:** Yok. (Görsel/video optimizasyonu için `fitz`/Python ve `ffmpeg` kullanılır;
  yoksa orijinaller kullanılır — site yine çalışır.)

---

## 4. Dosya Yapısı (oluşturulacak)
```
SKANOPT OÖC/
└─ site/
   ├─ index.html
   ├─ css/styles.css
   ├─ js/main.js            (nav, mobil menü, scroll-reveal, sayaç, seri sekmeleri, form)
   ├─ js/i18n.js            (TR/EN dil değiştirme)
   ├─ data/i18n.json        (tüm metinler TR+EN)
   ├─ data/site-config.json (iletişim, linkler — placeholder)
   ├─ assets/img/           (optimize, yazısız görseller + logo.svg + favicon)
   ├─ assets/video/         (web'e uygun 3.1.mp4 / .webm)
   └─ og-image, favicon
```

---

## 5. Tasarım Sistemi
**Renk paleti** (beyaz/ferah hâkim, marka–ürün uyumlu):
| Token | Değer | Kullanım |
|---|---|---|
| `--bg` | `#FFFFFF` | Ana zemin |
| `--bg-soft` | `#F5F7F9` | Bölüm ayırıcı kesitler |
| `--ink` | `#14181D` | Birincil metin/başlık |
| `--ink-soft` | `#5A6571` | İkincil metin |
| `--brand` | `#0E6E66` (petrol/teal) | Birincil aksan (cihaz gövde rengi) |
| `--brand-700` | `#0A524C` | Hover/derinlik |
| `--accent` | `#EE7A1B` (turuncu) | CTA/istatistik vurgusu (az ve yerinde, cihaz tutamağı) |
| `--line` | `#E7ECEF` | İnce border |

- **Tipografi:** `clamp()` ile akışkan ölçek (H1 ~clamp(2.4rem,5vw,4rem)), geniş satır aralığı,
  ince başlık ağırlığı, bol negatif boşluk (ferah). Sora 600/700 başlık, Inter 400/500/600 gövde.
- **Spacing:** 8px tabanlı ölçek; bölümler arası geniş `padding` (masaüstü ~120px dikey).
- **Yüzey:** Yumuşak gölge (`0 10px 30px rgba(20,24,29,.06)`), `border-radius` 14–20px, ince border.
- **Butonlar:** Birincil (teal dolgu / beyaz yazı), ikincil (çerçeve), accent CTA (turuncu).
- **Grid:** 12 kolon konteyner, `max-width: 1200–1280px`, mobil-öncelikli.
- **Breakpoint:** ≤480 (mobil), 768 (tablet), 1024, 1280+ (masaüstü).
- **Erişilebilirlik:** Kontrast AA, klavye odak halkaları, `aria` etiketleri, `alt` metinleri,
  `prefers-reduced-motion`, semantik HTML.

---

## 6. Bölüm Bölüm Detay (her bölüm: amaç · içerik · yerleşim · görsel · animasyon)
Sıra = sticky menü sırası. Menü: Neden · Seriler · Nasıl Çalışır · Otomasyon · Yazılım · Karşılaştırma · Sektörler · İletişim.

**1) Header (sticky)** — Solda SKANOPT wordmark; ortada/sağda anchor menü; sağ üstte **[TR|EN]**
dil; sağda **[Demo Talep Et]** (accent). Scroll'da yarı saydam + blur + alt border. Mobilde hamburger.

**2) Hero** — Sol: H1 "Optik Ölçüm Sistemlerinde **Hassas, Yerli** Çözüm" + alt başlık
"Döner Tablalı · Alan Tarayan · PLC Entegreli". 3 istatistik çipi (count-up): **0.001 µm hassasiyet ·
360° döner tabla · ~4 hafta teslim**. CTA: [Demo Talep Et] [Serileri İncele]. Sağ: en temiz CAD/
makine render'ı (hafif float/parallax, yumuşak gölge). Arka planda çok hafif teal mesh/gradyan.
Animasyon: yüklemede kademeli fade-up.

**3) Neden SKANOPT?** (6 kart, scroll-reveal staggered) — bkz §8-B: 360° döner tabla · Alan tarayan
tek çekim 20×20 mm · Her PLC/Robot/Konveyör (marka bağımsız) · Kullanıcı kalibrasyonu · 5–25 MP
kamera seçeneği · ~4 hafta yerli teslim. Her kart: ikon (SVG line) + başlık + 1-2 cümle.

**4) Ürün Serileri** (sekmeli: V · VR · VRE · W · H) — Her sekmede: kısa açıklama + öne çıkan
özellikler + **spec tablosu** (Model | Yatay FOV mm | Dikey FOV mm | Hassasiyet µm) + ilgili render.
Veriler **birebir** §8-A'dan; iptal modeller yok. Tablo mobilde yatay kaydırılır. Sekme geçişi yumuşak.

**5) Nasıl Çalışır?** (4 adım yatay zaman çizelgesi) — 1 Parça yerleştirme (döner tabla/konveyör) →
2 Tek çekim alan tarama (20×20 mm CMOS) → 3 Z-Measure sub-piksel işleme → 4 PLC/Robot/CNC'ye wear
offset veya OK/NOK. Bağlantı çizgisi scroll'da çizilir (SVG path / progressive reveal).

**6) Robot & Otomasyon** — Sol metin (4 madde: Stäubli konveyör · uFactory robot kolu — Z-Measure'da
hazır arayüz · PLC marka bağımsız: Siemens/Mitsubishi/Fanuc/Omron · CNC wear offset, sıfır operatör).
Sağ: **`3.1.mp4`** (sessiz, autoplay, loop, `playsinline`, poster görsel; tıkla-büyüt opsiyon).

**7) Z-Measure Yazılımı** — Üstte ölçüm çeşitleri **çip ızgarası** (§8-C: Çap/Boy/Açı/Pah/Radyus/
Vida(Adım+Çap)/Dairesellik/Diklik/Paralellik/Simetriklik/Salgı/Döner Çap). Altta 4 özellik kartı:
Bağlantılar (Robot, ERP/SCADA, barkod) · CNC offset · Kullanıcı kalibrasyon · Otomatik raporlama+SPC.
Rozetler: Windows 10/11 · IO Hazır · TR + EN arayüz.

**8) Rakip Karşılaştırma** (tablo — yapışkan ilk sütun, mobilde yatay kaydırma) — bkz §8-D özet tablo.
Satırlar: Döner Tabla · Alan Tarama · PLC Esnekliği · Kamera MP · Kullanıcı Kalibrasyon · Teslim ·
Yerli Destek · Fiyat. Sütunlar: Keyence TM-X5000 · OPT SmartFlash · Janpos · AZE Otomasyon · **SKANOPT**
(vurgulu sütun). SKANOPT fiyat satırı = "Rekabetçi". Üstte küçük "ViciVision 30.000€+ — 360° döner
tablası olan tek pahalı alternatif; SKANOPT rekabetçi" notu.

**9) Sektörler & Uygulama Alanları** — Sektör kartları (§8-E): Hassas kalite kontrol · Otomotiv yan
sanayi (şaft/piston/valf) · Beyaz eşya · İmplant & Medikal · Elektronik & yarı iletken · CNC/metal
işleme · Plastik & kalıp · Havacılık & savunma. Altında ince **uygulama alanları şeridi** (§8-G):
PCB · dişli · yay · şaft/mil · vida · segman · medikal iğne · otomotiv parçaları · seramik · kauçuk.

**10) Global Pazarlar & Referanslar** (güven) — TR/DE/US bayrak kartları (§8-F). Distribütör/partner
isimleri (doğrulanacak). CE: "sertifikasyon süreci devam ediyor" (temkinli ifade, yanıltıcı tam-CE yok).

**11) İletişim / Demo Talebi** — Sol: form (Ad · Firma · E-posta · Telefon · Mesaj) → form servisi +
`mailto` yedeği. Sağ: WhatsApp tıkla-konuş · e-posta · telefon · web (hepsi `site-config.json`
placeholder). Büyük CTA: "Demo Talep Et — Türkiye'ye ~4 haftada teslim".

**12) Footer** — Wordmark, kısa açıklama, hızlı linkler, iletişim, © SKANOPT.

---

## 7. Görsel & Medya Envanteri + Üretim Hattı (pipeline)
**Hazır temiz görseller (yazısız, kullanıma uygun):**
- `görseller/WhatsApp Image 2026-05-18 at 14.58.37(.jpeg/(1)/(2)/(3))` → 4 CAD render (beyaz zemin,
  V/VR makine + altın 360° döner tabla). **Markasız.** Sol-alt eksen gizmosu **kırpılacak**.
- `görseller/düzenlenmiş görseller/…` → stüdyo fotoğrafı (gri fon). Yazısız. Hero/galeri adayı.

**PDF'ten çıkarılacak ek temiz render'lar (uygulama 1. adımı):**
- `ZETMES MACHINE 13062024.pdf` içinde **17 × 1920×1200 JPEG render + 1 × 4961×3508 dev render
  (s.6, hero adayı)**. `fitz` ile JPEG katmanları çıkarılır (metin/logo ayrı PNG katmanda → JPEG'ler
  temiz olmalı). **Her render ZETMES markası için görsel QA'dan geçer**; markalı olan elenir/düzenlenir.
- Gerekirse TR broşürü (2481×3509 sayfalar) içinden ürün render bölgeleri kırpılır.

**Video:** `videolar/3.1.mp4` → otomasyon bölümünde sessiz/loop. `ffmpeg` varsa web için sıkıştır +
`.webm` türev + poster karesi üret; yoksa orijinal mp4.

**İşlemler:** gizmo/kenar kırpma, web boyutuna ölçekleme, mümkünse **WebP + JPEG fallback**,
`loading="lazy"`, `width/height` (CLS önleme). Araç yoksa orijinal JPEG kullanılır (launch için yeterli).

**Logo/favicon:** Tipografik "SKANOPT" wordmark (Sora, teal aksan + küçük optik/lens amblemi) **SVG**
olarak üretilir; favicon + 512px OG görseli türetilir.

**Eksik görseller:** Bazı bölümler için ürün görseli yetersizse, marka renginde soyut/şematik SVG
illüstrasyon veya temiz render kırpıntısı kullanılır (asla yazı içeren görsel değil).

---

## 8. İÇERİK VERİ EKİ (site metinlerinin kaynağı — birebir)

### 8-A. Ürün Serileri — Tam Spec Tabloları (Yatay FOV × Dikey FOV / Hassasiyet)
**V Serisi** (kompakt, alan kamerası, 0.4 sn ölçüm, IO hazır):
`V024 24.29×20.26 / 3µ · V036 34.98×29.18 / 4µ · V048 46.2×38.53 / 5µ · V056 54.14×45.16 / 6µ · V064 61.59×51.38 / 7µ`
**VR Serisi** (V + Dairesellik · Eşmerkezlilik · Ovallik): VR024…VR064, V ile aynı FOV/hassasiyet.
**VRE Serisi** (ultra hassas, uzun parça — KALIYOR):
`VRE009-100 8.5×100 / 0.001µ · VRE016-100 16.1×100 / 0.002µ · VRE036-100 34.98×100 / 0.004µ ·
VRE036-200 34.98×200 / 0.004µ · VRE048-300 46.2×300 / 0.005µ · VRE056-300 54.14×300 / 0.006µ ·
VRE064-600 61.59×600 / 0.007µ · VRE080-600 77.27×600 / 0.009µ · VRE096-600 91.4×600 / 0.01µ`
**W Serisi** (büyük/uzun parça, çizgisel kamera; WE = daha hassas varyant):
`W60 60×300 / 5µ · WE60 60×300 / 2.5µ · W90 90×600 / 8µ · WE90 90×600 / 4µ · W120 120×1200 / 10µ ·
WE120 120×1200 / 5µ · W180 180×1500 / 16µ · WE180 180×1500 / 8µ`
**H Serisi** (otomasyon, 0.4 sn, 10 model):
`H70 53.64×39.28 / 5µ · H85 64.95×47.57 / 6µ · H105 80.45×58.92 / 7µ · H125 95.68×70.07 / 9µ ·
H155 118.99×87.14 / 11µ · H185 141.6×103.7 / 13µ · H215 164.56×120.52 / 15µ · H245 187.52×137.33 / 17µ ·
H270 206.66×151.35 / 19µ · H315 240×175.76 / 22µ`
**HARİÇ (iptal/üstü çizili):** V & VR → 009, 016, 080, 096 · H → ilk 5 satır (H11.5 ve altı).

### 8-B. Neden SKANOPT? (6 USP)
1. **360° Döner Tabla** — Keyence/OPT/Janpos'ta yok. Tek pahalı alternatif ViciVision 30.000€+.
2. **Alan Tarayan — Tek Çekim 20×20 mm** — Rakipler çizgi çizgi (lineer) tarar; SKANOPT tüm alanı tek çekimde.
3. **Her PLC / Robot / Konveyör** — Marka bağımsız (Siemens, Mitsubishi, Fanuc, Omron; Stäubli, uFactory). Keyence sadece Mitsubishi.
4. **Kullanıcı Kalibrasyonu** — Müşteri istediği zaman kalibre eder (Keyence'de sabit).
5. **5–25 MP Kamera** — Keyence TM-X5000 max 5 MP; SKANOPT 5–25 MP konfigürasyon.
6. **~4 Hafta Yerli Teslim** — İthal rakipler 4–16 hafta. Yerli üretim + Türkçe destek + döviz avantajı.

### 8-C. Z-Measure Yazılımı
Ölçümler: Çap · Boy · Açı · Pah · Radyus · Vida (Adım+Çap) · Dairesellik · Diklik · Paralellik ·
Simetriklik · Salgı · Döner Çap. Bağlantı: Robot haberleşmesi, ERP/SCADA, barkodla program seçimi.
CNC wear offset arayüzü. Kullanıcı kalibrasyonu. Otomatik raporlama + SPC. Windows 10/11, IO hazır, TR+EN.

### 8-D. Rakip Karşılaştırma (kaynak: 7 sayfalık Excel + sunum)
**Özet (site tablosu):**
| | Keyence TM-X5000 | OPT SmartFlash | Janpos | AZE Otomasyon | **SKANOPT** |
|---|---|---|---|---|---|
| Döner Tabla | ❌ | ❌ | ❌ | ◐ | **✓ 360°** |
| Alan Tarama | Lineer | ✓ Alan | Lineer | Video | **✓ Tek çekim** |
| PLC Esnekliği | Sadece Mitsubishi | Kısmi | Kısmi | Proje bazlı | **Her PLC** |
| Kamera MP | Max 5 MP | Yüksek | — | Yüksek | **5–25 MP** |
| Kullanıcı Kalibrasyon | ❌ | ❌ | ❌ | ✓ | **✓ Yazılım dahil** |
| Teslim Süresi | 4–12 hafta | 3–8 hafta | 2–6 hafta | 8–16 hafta | **~4 hafta** |
| Yerli Destek (TR) | Bayi | ❌ | ❌ | ✓ | **✓ Üretici** |
| Fiyat | $8.000–$25.000+ | $3.000–$10.000 | $1.500–$6.000 | €6.000–€30.000+ | **Rekabetçi** |

**Detay veriler (appendix — gerekirse genişletilebilir):** Keyence ±0.2–3.5µm doğruluk, ±0.03–0.2µm
tekrarlanabilirlik, 100+ ölçüm aracı, EtherNet/IP+PROFINET+EtherCAT, IP64, 13 dil; SKANOPT hedef
≤±2µm doğruluk, ±0.1µm tekrarlanabilirlik, ±15mm DOF, 2D CMOS, LED yeşil ışık, Ethernet+PLC, IP64,
0–45°C. **Rekabetçilik skoru (1-5):** SKANOPT fiyat=5, teslim=5, yerli destek=5, Türkçe arayüz=5,
özelleştirme=5; Keyence marka=5, dokümantasyon=5, hassasiyet=5. *(Not: "hedef/planlanmış" ibareli
özellikler sitede kesin iddia gibi sunulmayacak; doğrulanmış olanlar öne çıkarılacak.)*

### 8-E. Sektörler & Öncelik (kaynak: Excel sektör matrisi + sunum + kullanıcı notu)
Yüksek öncelik: **Otomotiv yan sanayi**, CNC/metal işleme, plastik & kalıp, takım tezgâhı, AR-GE/
kalibrasyon lab, elektronik & yarı iletken. Kullanıcı vurgusu: **beyaz eşya, implant/medikal,
hassas kalite kontrol**. Orta: medikal, havacılık & savunma (CE sonrası güçlenir).

### 8-F. Global Pazarlar & Referanslar
🇹🇷 Türkiye (birincil) — distribütör/partner: Yamer, Bilginoğlu, Robotsepeti.com · 🇩🇪 Almanya (aktif
ihracat) · 🇺🇸 ABD — Roboride USA partneri (robot konumlandırma). *(Partner/referans isimleri yayından
önce doğrulanacak.)* CE: süreç devam ediyor.

### 8-G. Uygulama Alanları (kaynak: Besong OEM + sektörler)
PCB · pin/iğne · dişli · yay · işlenmiş parçalar · metal parçalar · segman (circlip) · vida · kesitler ·
otomotiv parçaları · seramik · kauçuk · chip pin · medikal iğne · şaft/mil.

### 8-H. İletişim (placeholder — `site-config.json`)
Web: `www.skanopt.com` · E-posta: `info@skanopt.com` · Telefon/WhatsApp: `+90 ___ ___ __ __`
*(Kullanıcı kararı: placeholder; doğru bilgilerle sonradan doldurulacak.)*

---

## 9. Animasyon & Etkileşim
Hero fade-up; bölüm scroll-reveal (IntersectionObserver, stagger 60–90ms); stat **count-up**; kart
hover-lift + gölge; sticky-nav aktif bölüm vurgusu; yumuşak anchor scroll; seri **sekme** geçişleri;
"Nasıl Çalışır" bağlantı çizgisi progresif çizim; tablo satır hover; mobil hamburger slide.
Tümü `prefers-reduced-motion: reduce` ile sadeleşir. 60fps hedef; sadece `transform`/`opacity`.

## 10. SEO / Meta / Performans
`<title>`, meta description (TR/EN), Open Graph + Twitter card, `hreflang` TR/EN, `JSON-LD`
(Organization + Product), semantik başlık hiyerarşisi, `alt` metinleri, sitemap/robots, favicon.
Performans: görsel lazy-load + boyutlandırma, font `display:swap` + preconnect, kritik CSS satır içi,
minify (opsiyonel). **Lighthouse hedef: 90+** (Perf/Erişilebilirlik/SEO/Best-Practices).

## 11. Form / İletişim Altyapısı
Statik form → varsayılan **Formspree** (host Netlify ise Netlify Forms) + `mailto:` yedeği. WhatsApp
`wa.me`, `tel:`, `mailto:` linkleri her zaman çalışır. Form alanları + servis anahtarı `site-config`'te.
*(Form servisi seçimi uygulama başında netleştirilecek; placeholder ile başlanır.)*

## 12. Yayınlama (Deployment)
Statik çıktı `site/`. Netlify/Vercel'e sürükle-bırak veya `skanopt.com`'a FTP. Build gerekmez.
Yerelde `index.html` doğrudan açılır. (CI gerekirse sonradan eklenir.)

## 13. Açık Noktalar / Riskler
- **İletişim & domain** placeholder → kullanıcı dolduracak.
- **Render'larda ZETMES markası** → QA'da elenecek/düzenlenecek; markasız CAD render'lar garanti güvenli.
- **Referans/partner isimleri & CE ifadesi** → yayından önce doğrulanmalı (yanıltıcı iddia yok).
- **"Hedef/planlanmış" teknik özellikler** → kesin iddia gibi sunulmaz.
- **ffmpeg/görsel optimizasyon araçları** yoksa orijinaller kullanılır (site çalışır, dosyalar büyük).

## 14. Doğrulama (Test)
1. `site/index.html` tarayıcıda hatasız açılır (konsol temiz).
2. **Dil:** TR↔EN tüm metinleri değiştirir; seçim yenilemede korunur; `lang`/`hreflang` doğru.
3. **Responsive:** 480 / 768 / 1280; mobil hamburger; tablolar mobilde yatay kayar.
4. **Animasyon:** reveal + count-up tetiklenir; `prefers-reduced-motion` açıkken sade.
5. **Linkler:** anchor menü doğru bölüme; WhatsApp/tel/mailto açılır; form (servis bağlıysa) gönderir, yoksa mailto.
6. **İçerik doğruluğu:** Seri tabloları §8-A ile birebir; iptal modeller yok; **hiçbir yerde "ZETMES" yok**;
   görsellerde yazı yok; `kullanılmayacak` videolar kullanılmamış.
7. (Opsiyon) Lighthouse 90+ kontrolü.

## 15. Yapım Sırası (iş kalemleri)
0. Bu planı `SKANOPT OÖC/PLAN.md` + `PLAN.txt` olarak proje klasörüne kopyala (takip/paylaşım için).
1. **Görsel hazırlığı:** Machine PDF render'larını çıkar → ZETMES QA → CAD render gizmo kırpma →
   web optimizasyon → `assets/img`. Video işleme. Logo/favicon/OG üret.
2. İskelet: `index.html` + tasarım sistemi (`styles.css` değişkenleri, tipografi, grid).
3. i18n altyapısı (`i18n.js`, `i18n.json`) + `site-config.json`.
4. Bölümleri sırayla inşa (Header→Hero→…→Footer) — içerik §8'den.
5. Animasyonlar (`main.js`) + responsive + erişilebilirlik.
6. SEO/meta, form, son cila.
7. Doğrulama (§14) + yerel önizleme.
