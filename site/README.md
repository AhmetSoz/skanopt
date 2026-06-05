# SKANOPT — Optik Ölçüm Sistemleri

Statik tanıtım/satış sitesi. Derleme (build) gerektirmez — saf HTML / CSS / JS.

## Yerel önizleme
```bash
python -m http.server 8080
# http://localhost:8080
```
veya `index.html` dosyasını doğrudan tarayıcıda açın.

## Vercel'e yükleme
- **Framework Preset:** Other
- **Build Command:** (boş bırakın)
- **Output Directory:** (boş bırakın / `.`)
- **Root Directory:** `./`

Derleme adımı yoktur; Vercel dosyaları olduğu gibi yayınlar.

## İçerik / yapılandırma
- İletişim bilgileri (e-posta, telefon, WhatsApp, web): **`js/config.js`** — şu an placeholder, doğru bilgilerle doldurun.
- Metinler (TR/EN) ve teknik veriler: `js/i18n.js`
- Dil: Türkçe + İngilizce (sağ üstte değiştirici)
