/* ============================================================
   SKANOPT · Site Yapılandırması
   --------------------------------------------------------------
   >>> İLETİŞİM BİLGİLERİNİ BURADAN DOLDURUN (şu an PLACEHOLDER) <<<
   Marka SKANOPT olduğu için bilgiler placeholder bırakıldı.
   Doğru değerlerle değiştirip kaydetmeniz yeterli — tüm site otomatik güncellenir.
   ============================================================ */
window.SITE = {
  brand: "SKANOPT",

  // --- İletişim (DOLDURULACAK) ---
  web:          "www.skanopt.com",          // TODO: gerçek alan adı
  webUrl:       "https://www.skanopt.com",   // TODO
  email:        "info@skanopt.com",          // TODO: gerçek e-posta
  phoneDisplay: "+90 5XX XXX XX XX",         // TODO: gerçek telefon (görünen)
  phoneE164:    "",                          // TODO: ör. "+905XXXXXXXXX" (tel: linki için; boşsa telefon linki pasif)

  // --- WhatsApp (DOLDURULACAK) ---
  whatsappNumber: "",                        // TODO: ör. "905XXXXXXXXX" (ülke kodu + numara, boşluksuz). Boşsa WhatsApp butonu gizlenir.
  whatsappText:   "Merhaba, SKANOPT optik ölçüm sistemi hakkında bilgi almak istiyorum.",

  // --- Form gönderim servisi (opsiyonel) ---
  // Boş bırakılırsa form, kullanıcının e-posta uygulamasını açar (mailto yedeği).
  // Formspree örn: "https://formspree.io/f/xxxxxxxx"
  formEndpoint: ""
};
