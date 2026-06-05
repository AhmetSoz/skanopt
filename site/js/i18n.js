/* ============================================================
   SKANOPT · İçerik sözlüğü (TR + EN) ve teknik veriler
   Tüm site metinleri burada. main.js bunları işler.
   ============================================================ */

/* Dile bağlı OLMAYAN teknik veriler — [Model, Yatay FOV mm, Dikey FOV mm, Hassasiyet µm]
   (İptal/üstü çizili modeller hariç tutulmuştur.) */
window.SPECS = {
  V: [
    ["V024","24.29","20.26","3"],["V036","34.98","29.18","4"],["V048","46.2","38.53","5"],
    ["V056","54.14","45.16","6"],["V064","61.59","51.38","7"]
  ],
  VR: [
    ["VR024","24.29","20.26","3"],["VR036","34.98","29.18","4"],["VR048","46.2","38.53","5"],
    ["VR056","54.14","45.16","6"],["VR064","61.59","51.38","7"]
  ],
  VRE: [
    ["VRE009-100","8.5","100","0.001"],["VRE016-100","16.1","100","0.002"],["VRE036-100","34.98","100","0.004"],
    ["VRE036-200","34.98","200","0.004"],["VRE048-300","46.2","300","0.005"],["VRE056-300","54.14","300","0.006"],
    ["VRE064-600","61.59","600","0.007"],["VRE080-600","77.27","600","0.009"],["VRE096-600","91.4","600","0.01"]
  ],
  W: [
    ["W60","60","300","5"],["WE60","60","300","2.5"],["W90","90","600","8"],["WE90","90","600","4"],
    ["W120","120","1200","10"],["WE120","120","1200","5"],["W180","180","1500","16"],["WE180","180","1500","8"]
  ],
  H: [
    ["H70","53.64","39.28","5"],["H85","64.95","47.57","6"],["H105","80.45","58.92","7"],["H125","95.68","70.07","9"],
    ["H155","118.99","87.14","11"],["H185","141.6","103.7","13"],["H215","164.56","120.52","15"],
    ["H245","187.52","137.33","17"],["H270","206.66","151.35","19"],["H315","240","175.76","22"]
  ]
};

window.I18N = {
  /* ===================== TÜRKÇE ===================== */
  tr:{
    meta:{
      title:"SKANOPT · Optik Ölçüm Sistemleri | Döner Tablalı, Telesentrik 2D Ölçüm",
      desc:"SKANOPT yerli üretim telesentrik 2D optik ölçüm sistemleri: 360° döner tabla, alan tarayan tek çekim, marka bağımsız PLC/robot entegrasyonu, kullanıcı kalibrasyonu ve ~4 hafta teslim."
    },
    nav:{why:"Neden SKANOPT",series:"Seriler",how:"Nasıl Çalışır",automation:"Otomasyon",software:"Yazılım",compare:"Karşılaştırma",sectors:"Sektörler",contact:"İletişim"},
    cta:{demo:"Demo Talep Et",quote:"Teklif Al",series:"Serileri İncele"},
    hero:{
      badge:"Yerli Üretim · Telesentrik 2D Ölçüm",
      t1:"Optik ölçümde",t2:"hassas, yerli",t3:"çözüm",
      sub:"Döner tablalı, alan tarayan ve PLC entegreli optik boyutsal ölçüm sistemleri. Pazar lideri muadili teknoloji; yerli üretim, hızlı teslim ve Türkçe destekle.",
      stat1:"Hassasiyete kadar (VRE)",stat2:"Döner tabla",stat3:"Türkiye'ye teslim",week:"hafta",
      trust1:"Marka bağımsız PLC / robot",trust2:"Kullanıcı kalibrasyonu",trust3:"Türkçe üretici desteği",
      f1s:"Tek çekim",f1b:"20 × 20 mm alan",f2s:"Ölçüm süresi"
    },
    why:{
      eyebrow:"Neden SKANOPT",title:"Rakiplerin sunmadığı avantajlar",
      sub:"Pazar lideri sistemlerin teknolojisini; döner tabla, esnek entegrasyon ve yerli üretim avantajlarıyla birleştiriyoruz.",
      cards:[
        {icon:"rotary",t:"360° Döner Tabla",d:"Keyence, OPT ve Janpos'ta yok. Şaft ve mil ölçümünü tek kurulumda, her açıdan yapın."},
        {icon:"scan",t:"Alan Tarayan — Tek Çekim",d:"Rakipler çizgi çizgi tarar; SKANOPT 20×20 mm alanı tek çekimde ölçer."},
        {icon:"plc",t:"Marka Bağımsız Entegrasyon",d:"Siemens, Mitsubishi, Fanuc, Omron; Stäubli ve uFactory robotlarıyla doğrudan çalışır."},
        {icon:"calib",t:"Kullanıcı Kalibrasyonu",d:"Müşteri yazılım arayüzünden istediği zaman kalibre eder — sabit değil."},
        {icon:"camera",t:"5–25 MP Kamera Seçeneği",d:"İhtiyacınıza göre çözünürlük. Pazar liderinde maksimum 5 MP iken sizde 25 MP'e kadar."},
        {icon:"truck",t:"~4 Hafta Yerli Teslim",d:"İthal rakipler 4–16 hafta. Yerli üretim, döviz avantajı ve Türkçe destek."}
      ]
    },
    series:{
      eyebrow:"Ürün Serileri",title:"Her parça ve hat için doğru model",
      sub:"Kompakt döner tablalıdan büyük parça ve tam otomasyona kadar beş ürün ailesi. Tüm modeller IO hazır gelir.",
      headers:{model:"Model",fovh:"Yatay FOV (mm)",fovv:"Dikey FOV (mm)",acc:"Hassasiyet (µm)"},
      note:"Görüş alanı (FOV) ve hassasiyet değerleri modele göredir. Uygulamanıza özel konfigürasyon için bize ulaşın.",
      order:["V","VR","VRE","W","H"],
      items:{
        V:{name:"V Serisi",tag:"Kompakt · Alan kamerası",desc:"Kompakt gövde, alan kamerası ve 0.4 saniyede ölçüm. Atölye ve hat kenarı kalite kontrol için ideal.",
           feats:["0.4 saniyede ölçüm sonucu","Otomasyona uygun, IO hazır gelir","Sistem kalibrasyonlu; kullanıcı kalibrasyonu","Otomatik raporlama + CNC wear offset"]},
        VR:{name:"VR Serisi",tag:"Döner tabla · Form ölçümü",desc:"V serisinin tüm yetenekleri + 360° döner tabla ile dairesellik, eşmerkezlilik ve ovallik ölçümü.",
           feats:["Dairesellik, eşmerkezlilik, ovallik ölçümü","360° döner tabla ile şaft/mil ölçümü","Otomasyona uygun, IO hazır","Otomatik raporlama + CNC wear offset"]},
        VRE:{name:"VRE Serisi",tag:"Ultra hassas · Uzun parça",desc:"Ultra yüksek hassasiyet ve uzun parça ölçümü. Dikeyde 100–600 mm ölçüm boyu.",
           feats:["0.001 µm'e varan hassasiyet","Dikeyde 100–600 mm ölçüm boyu","VR serisinin tüm özellikleri","Uzun parça ve yüksek hassasiyet uygulamaları"]},
        W:{name:"W Serisi",tag:"Büyük parça · Çizgisel kamera",desc:"Büyük ve uzun parçalar için. Telesentrik sistemde çizgisel kamera kullanarak hassasiyeti artırır.",
           feats:["Büyük ve uzun parça ölçümü","Çizgisel kamera ile artırılmış hassasiyet","Dikeyde 300–1500 mm","WE modelleri ile daha yüksek hassasiyet"]},
        H:{name:"H Serisi",tag:"Otomasyon · 10 model",desc:"Tam otomasyon odaklı geniş yelpaze. 0.4 saniyede ölçüm, 10 farklı model seçeneği.",
           feats:["0.4 saniyede ölçüm","Geniş ölçüm aralığı, 10 model","Otomasyona uygun, IO hazır","Sistem + kullanıcı kalibrasyonu"]}
      }
    },
    how:{
      eyebrow:"Nasıl Çalışır",title:"Parçadan sonuca dört adımda",
      sub:"Telesentrik optik ve sub-piksel görüntü işleme ile operatör hatası olmadan, saniyeler içinde ölçüm.",
      steps:[
        {t:"Parça Yerleştirme",d:"Parça döner tablaya veya konveyöre yerleştirilir."},
        {t:"Alan Tarama",d:"20×20 mm alan tek çekimde CMOS sensörle taranır."},
        {t:"Görüntü İşleme",d:"Z-Measure yazılımı sub-piksel hassasiyetle ölçer."},
        {t:"Sonuç & Entegrasyon",d:"PLC / robot / CNC'ye wear offset veya OK/NOK sinyali gönderilir."}
      ]
    },
    auto:{
      eyebrow:"Robot & Otomasyon",title:"Hattınıza sorunsuz entegre",
      sub:"Marka bağımsız PLC, robot ve konveyör uyumu. Ölçüm sonucunu doğrudan tezgâha gönderin, operatör müdahalesini sıfıra indirin.",
      videoTag:"Canlı inline ölçüm",videoTag2:"Robot hücresi — canlı",
      points:[
        {icon:"robot",t:"Robot & Konveyör",d:"Stäubli konveyör ve uFactory robot kolu entegrasyonu — Z-Measure'da hazır arayüz."},
        {icon:"plc",t:"Her PLC Markası",d:"Siemens, Mitsubishi, Fanuc, Omron — sahadan sorunsuz entegrasyon."},
        {icon:"cnc",t:"CNC Wear Offset",d:"Ölçüm sonucunu doğrudan tezgâha aşınma telafisi olarak gönderir."},
        {icon:"sync",t:"Senkron Tetikleme",d:"'Şimdi ölç' komutunu konveyör bandı veya robot ile senkronize edin."}
      ]
    },
    sw:{
      eyebrow:"Z-Measure Yazılımı",title:"Ölçümden raporlamaya tek arayüz",
      sub:"Onlarca ölçüm tipi, sub-piksel hassasiyet, otomatik raporlama ve SPC. Türkçe ve İngilizce arayüz.",
      measHead:"Desteklenen ölçüm tipleri",
      measurements:["Çap","Boy","Açı","Pah","Radyus","Vida (Adım + Çap)","Dairesellik","Diklik","Paralellik","Simetriklik","Salgı","Döner Çap"],
      cards:[
        {icon:"link",t:"Bağlantılar",d:"Robot haberleşmesi, ERP/SCADA entegrasyonu ve barkodla program seçimi."},
        {icon:"cnc",t:"CNC Offset",d:"Tezgâha wear offset atama arayüzü — operatör müdahalesi sıfır."},
        {icon:"calib",t:"Kalibrasyon",d:"Sistem kalibrasyonlu gelir; kullanıcı istediği zaman kalibre eder."},
        {icon:"report",t:"Raporlama & SPC",d:"Otomatik raporlama ve SPC veri kaydı, kolay dışa aktarma."}
      ],
      badges:["Windows 10 / 11","IO Hazır","Türkçe + İngilizce"]
    },
    cmp:{
      eyebrow:"Rakip Karşılaştırma",title:"Neden SKANOPT öne çıkıyor?",
      sub:"Pazar lideri ve yerli/ithal alternatiflerle teknik ve ticari karşılaştırma.",
      note:"360° döner tablaya sahip tek pahalı alternatif ViciVision (30.000 €+) iken, SKANOPT bu özelliği rekabetçi fiyatla sunar.",
      feature:"Özellik",
      cols:["Keyence TM-X5000","OPT SmartFlash","Janpos","AZE Otomasyon","SKANOPT"],
      rows:[
        {label:"Döner Tabla",cells:["❌","❌","❌","◐","✓ 360°"]},
        {label:"Alan Tarama",cells:["Lineer tarama","✓ Alan","Lineer tarama","Video","✓ Tek çekim"]},
        {label:"PLC Esnekliği",cells:["Sadece Mitsubishi","Kısmi","Kısmi","Proje bazlı","Her PLC / robot"]},
        {label:"Kamera (MP)",cells:["Maks. 5 MP","Yüksek","—","Yüksek","5–25 MP"]},
        {label:"Kullanıcı Kalibrasyon",cells:["❌","❌","❌","✓","✓ Yazılım dahil"]},
        {label:"Teslim Süresi",cells:["4–12 hafta","3–8 hafta","2–6 hafta","8–16 hafta","~4 hafta"]},
        {label:"Yerli Destek",cells:["Bayi","❌","❌","✓","✓ Üretici"]},
        {label:"Fiyat",cells:["$8–25 bin+","$3–10 bin","$1,5–6 bin","€6–30 bin+","Rekabetçi"]}
      ]
    },
    sec:{
      eyebrow:"Sektörler & Uygulamalar",title:"Hassas ölçüm gereken her yerde",
      sub:"Otomotiv yan sanayiden implant ve beyaz eşyaya, kalite kontrolün kritik olduğu sektörlere yönelik.",
      appsHead:"Örnek ölçülen parçalar",
      sectors:[
        {icon:"car",t:"Otomotiv Yan Sanayi",d:"Şaft, piston, valf ve dişli ölçümünde 360° kontrol."},
        {icon:"appliance",t:"Beyaz Eşya",d:"Yüksek hacimli üretimde hızlı boyutsal kalite kontrol."},
        {icon:"implant",t:"İmplant & Medikal",d:"Yüksek hassasiyet gerektiren tıbbi parça ve iğneler."},
        {icon:"chip",t:"Elektronik & Yarı İletken",d:"Konnektör pinleri, çip ve hassas elektronik parçalar."},
        {icon:"cnc",t:"CNC & Metal İşleme",d:"0.4 sn ölçüm + CNC wear offset ile üretim kaybı sıfır."},
        {icon:"mold",t:"Plastik & Kalıp",d:"Enjeksiyon parçaları için ideal telesentrik ölçüm."},
        {icon:"aero",t:"Havacılık & Savunma",d:"Kritik toleranslı parçalarda yüksek tekrarlanabilirlik."},
        {icon:"lab",t:"AR-GE & Kalibrasyon",d:"Laboratuvar ve kalite kontrol birimleri için."}
      ],
      apps:["PCB","Dişli","Yay","Şaft / Mil","Vida","Segman","Medikal iğne","Otomotiv parçaları","Seramik","Kauçuk","Konnektör pini","Kesitler"]
    },
    ref:{
      eyebrow:"Global Pazarlar",title:"Türkiye'den dünyaya",
      sub:"Yerli pazarda aktif satış, Almanya'ya ihracat ve ABD ortaklığı ile büyüyen bir ağ.",
      note:"CE sertifikasyon süreci devam etmektedir. Distribütör ve referans bilgileri talep üzerine paylaşılır.",
      items:[
        {flag:"🇹🇷",country:"Türkiye",role:"Birincil Pazar",desc:"Otomotiv, CNC ve plastik sektörlerinde aktif satış ve distribütör ağı."},
        {flag:"🇩🇪",country:"Almanya",role:"Aktif İhracat",desc:"Avrupa pazarına ihracat; CE sürecinin tamamlanmasıyla büyüyen talep."},
        {flag:"🇺🇸",country:"ABD",role:"Resmi Ortaklık",desc:"Robot konumlandırma pazarı için ABD'de distribütör ortaklığı."}
      ]
    },
    contact:{
      eyebrow:"İletişim",title:"Demo veya teklif için bize ulaşın",
      sub:"Uygulamanızı paylaşın, doğru konfigürasyonu birlikte belirleyelim. Türkiye'ye ~4 haftada teslim.",
      name:"Ad Soyad",company:"Firma",email:"E-posta",phone:"Telefon",message:"Mesajınız / uygulamanız",
      submit:"Talebi Gönder",sending:"Gönderiliyor…",
      ok:"Teşekkürler! Talebiniz alındı, en kısa sürede dönüş yapacağız.",
      err:"Bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan e-posta ile ulaşın.",
      note:"Bilgileriniz yalnızca size dönüş yapmak için kullanılır.",
      mWeb:"Web",mMail:"E-posta",mPhone:"Telefon",mWa:"WhatsApp",
      ctaTitle:"Hızlı yanıt mı istiyorsunuz?",ctaText:"WhatsApp üzerinden ulaşın, uygulamanıza en uygun modeli birlikte belirleyelim.",ctaBtn:"WhatsApp'tan Yaz"
    },
    footer:{
      about:"Yerli üretim telesentrik 2D optik ölçüm sistemleri. Döner tablalı, alan tarayan ve PLC entegreli — hassas kalite kontrol için.",
      quick:"Hızlı Linkler",contactH:"İletişim",rights:"Tüm hakları saklıdır.",disclaimer:"Optik ölçüm sistemleri · Türkiye"
    }
  },

  /* ===================== ENGLISH ===================== */
  en:{
    meta:{
      title:"SKANOPT · Optical Measurement Systems | Rotary-table Telecentric 2D Metrology",
      desc:"SKANOPT locally manufactured telecentric 2D optical measurement systems: 360° rotary table, single-shot area scan, brand-independent PLC/robot integration, user calibration and ~4-week delivery."
    },
    nav:{why:"Why SKANOPT",series:"Series",how:"How It Works",automation:"Automation",software:"Software",compare:"Comparison",sectors:"Industries",contact:"Contact"},
    cta:{demo:"Request a Demo",quote:"Get a Quote",series:"Explore Series"},
    hero:{
      badge:"Locally Made · Telecentric 2D Metrology",
      t1:"Precise, local",t2:"optical measurement",t3:"solutions",
      sub:"Rotary-table, area-scanning, PLC-integrated optical dimensional measurement systems. Market-leader-class technology, made locally, delivered fast with manufacturer support.",
      stat1:"Accuracy up to (VRE)",stat2:"Rotary table",stat3:"Delivery to Türkiye",week:"weeks",
      trust1:"Brand-independent PLC / robot",trust2:"User calibration",trust3:"Manufacturer support",
      f1s:"Single shot",f1b:"20 × 20 mm field",f2s:"Measurement time"
    },
    why:{
      eyebrow:"Why SKANOPT",title:"Advantages competitors don't offer",
      sub:"We combine market-leader technology with a rotary table, flexible integration and local manufacturing.",
      cards:[
        {icon:"rotary",t:"360° Rotary Table",d:"Not available on Keyence, OPT or Janpos. Measure shafts and pins from every angle in a single setup."},
        {icon:"scan",t:"Area Scan — Single Shot",d:"Competitors scan line by line; SKANOPT captures a 20×20 mm field in one shot."},
        {icon:"plc",t:"Brand-Independent Integration",d:"Works directly with Siemens, Mitsubishi, Fanuc, Omron; Stäubli and uFactory robots."},
        {icon:"calib",t:"User Calibration",d:"Customers calibrate any time from the software interface — not fixed."},
        {icon:"camera",t:"5–25 MP Camera Options",d:"Resolution to fit your needs. The market leader maxes out at 5 MP; you can go up to 25 MP."},
        {icon:"truck",t:"~4-Week Local Delivery",d:"Imported rivals take 4–16 weeks. Local production, currency advantage and local support."}
      ]
    },
    series:{
      eyebrow:"Product Series",title:"The right model for every part and line",
      sub:"Five product families, from a compact rotary-table unit to large parts and full automation. All models ship IO-ready.",
      headers:{model:"Model",fovh:"Horizontal FOV (mm)",fovv:"Vertical FOV (mm)",acc:"Accuracy (µm)"},
      note:"Field of view (FOV) and accuracy values depend on the model. Contact us for a configuration tailored to your application.",
      order:["V","VR","VRE","W","H"],
      items:{
        V:{name:"V Series",tag:"Compact · Area camera",desc:"Compact body, area camera and measurement in 0.4 seconds. Ideal for workshop and line-side quality control.",
           feats:["Measurement result in 0.4 s","Automation-ready, ships IO-ready","Factory-calibrated; user calibration","Automatic reporting + CNC wear offset"]},
        VR:{name:"VR Series",tag:"Rotary table · Form measurement",desc:"All V-series capabilities plus a 360° rotary table for roundness, concentricity and ovality.",
           feats:["Roundness, concentricity, ovality","Shaft/pin measurement with 360° rotary table","Automation-ready, IO-ready","Automatic reporting + CNC wear offset"]},
        VRE:{name:"VRE Series",tag:"Ultra-precise · Long parts",desc:"Ultra-high accuracy and long-part measurement. Vertical measuring length of 100–600 mm.",
           feats:["Accuracy down to 0.001 µm","Vertical measuring length 100–600 mm","All VR-series features","Long-part and high-precision applications"]},
        W:{name:"W Series",tag:"Large parts · Line camera",desc:"For large and long parts. Uses a line camera in the telecentric system to boost accuracy.",
           feats:["Large and long-part measurement","Higher accuracy with line camera","Vertical 300–1500 mm","Even higher accuracy with WE models"]},
        H:{name:"H Series",tag:"Automation · 10 models",desc:"A wide range focused on full automation. Measurement in 0.4 seconds, 10 model options.",
           feats:["Measurement in 0.4 s","Wide measuring range, 10 models","Automation-ready, IO-ready","Factory + user calibration"]}
      }
    },
    how:{
      eyebrow:"How It Works",title:"From part to result in four steps",
      sub:"Telecentric optics and sub-pixel image processing deliver measurement in seconds, without operator error.",
      steps:[
        {t:"Part Placement",d:"The part is placed on the rotary table or conveyor."},
        {t:"Area Scan",d:"A 20×20 mm field is captured in one shot by the CMOS sensor."},
        {t:"Image Processing",d:"Z-Measure software measures with sub-pixel accuracy."},
        {t:"Result & Integration",d:"A wear offset or OK/NOK signal is sent to the PLC / robot / CNC."}
      ]
    },
    auto:{
      eyebrow:"Robot & Automation",title:"Seamless integration into your line",
      sub:"Brand-independent PLC, robot and conveyor compatibility. Send results straight to the machine and reduce operator intervention to zero.",
      videoTag:"Live inline measurement",videoTag2:"Robot cell — live",
      points:[
        {icon:"robot",t:"Robot & Conveyor",d:"Stäubli conveyor and uFactory robot-arm integration — ready interface in Z-Measure."},
        {icon:"plc",t:"Any PLC Brand",d:"Siemens, Mitsubishi, Fanuc, Omron — smooth on-site integration."},
        {icon:"cnc",t:"CNC Wear Offset",d:"Sends the measurement result to the machine directly as a wear offset."},
        {icon:"sync",t:"Synchronized Trigger",d:"Synchronize the 'measure now' command with the conveyor or robot."}
      ]
    },
    sw:{
      eyebrow:"Z-Measure Software",title:"One interface from measurement to reporting",
      sub:"Dozens of measurement types, sub-pixel accuracy, automatic reporting and SPC. Turkish and English interface.",
      measHead:"Supported measurement types",
      measurements:["Diameter","Length","Angle","Chamfer","Radius","Thread (pitch + dia.)","Roundness","Perpendicularity","Parallelism","Symmetry","Runout","Rotary diameter"],
      cards:[
        {icon:"link",t:"Connectivity",d:"Robot communication, ERP/SCADA integration and barcode-based program selection."},
        {icon:"cnc",t:"CNC Offset",d:"Interface to assign wear offset to the machine — zero operator intervention."},
        {icon:"calib",t:"Calibration",d:"Ships factory-calibrated; the user can calibrate any time."},
        {icon:"report",t:"Reporting & SPC",d:"Automatic reporting and SPC data logging with easy export."}
      ],
      badges:["Windows 10 / 11","IO Ready","Turkish + English"]
    },
    cmp:{
      eyebrow:"Competitive Comparison",title:"Why SKANOPT stands out",
      sub:"Technical and commercial comparison with the market leader and local/imported alternatives.",
      note:"The only expensive alternative with a 360° rotary table is ViciVision (€30,000+); SKANOPT offers this feature at a competitive price.",
      feature:"Feature",
      cols:["Keyence TM-X5000","OPT SmartFlash","Janpos","AZE Otomasyon","SKANOPT"],
      rows:[
        {label:"Rotary Table",cells:["❌","❌","❌","◐","✓ 360°"]},
        {label:"Area Scan",cells:["Line scan","✓ Area","Line scan","Video","✓ Single shot"]},
        {label:"PLC Flexibility",cells:["Mitsubishi only","Partial","Partial","Project-based","Any PLC / robot"]},
        {label:"Camera (MP)",cells:["Max 5 MP","High","—","High","5–25 MP"]},
        {label:"User Calibration",cells:["❌","❌","❌","✓","✓ Software incl."]},
        {label:"Delivery Time",cells:["4–12 weeks","3–8 weeks","2–6 weeks","8–16 weeks","~4 weeks"]},
        {label:"Local Support",cells:["Dealer","❌","❌","✓","✓ Manufacturer"]},
        {label:"Price",cells:["$8–25k+","$3–10k","$1.5–6k","€6–30k+","Competitive"]}
      ]
    },
    sec:{
      eyebrow:"Industries & Applications",title:"Wherever precise measurement matters",
      sub:"From automotive suppliers to implants and home appliances — built for industries where quality control is critical.",
      appsHead:"Example measured parts",
      sectors:[
        {icon:"car",t:"Automotive Suppliers",d:"360° control for shaft, piston, valve and gear measurement."},
        {icon:"appliance",t:"Home Appliances",d:"Fast dimensional quality control in high-volume production."},
        {icon:"implant",t:"Implants & Medical",d:"Medical parts and needles that demand high precision."},
        {icon:"chip",t:"Electronics & Semiconductor",d:"Connector pins, chips and precise electronic parts."},
        {icon:"cnc",t:"CNC & Metalworking",d:"0.4 s measurement + CNC wear offset means zero production loss."},
        {icon:"mold",t:"Plastics & Molding",d:"Ideal telecentric measurement for injection-molded parts."},
        {icon:"aero",t:"Aerospace & Defense",d:"High repeatability on parts with critical tolerances."},
        {icon:"lab",t:"R&D & Calibration",d:"For laboratories and quality-control departments."}
      ],
      apps:["PCB","Gears","Springs","Shafts","Screws","Circlips","Medical needles","Automotive parts","Ceramics","Rubber","Connector pins","Cross-sections"]
    },
    ref:{
      eyebrow:"Global Markets",title:"From Türkiye to the world",
      sub:"Active sales at home, exports to Germany and a US partnership — a growing network.",
      note:"CE certification is in progress. Distributor and reference details are shared on request.",
      items:[
        {flag:"🇹🇷",country:"Türkiye",role:"Primary Market",desc:"Active sales and a distributor network in automotive, CNC and plastics."},
        {flag:"🇩🇪",country:"Germany",role:"Active Export",desc:"Exports to the European market, growing with the completion of CE."},
        {flag:"🇺🇸",country:"USA",role:"Official Partnership",desc:"Distributor partnership in the US for the robot-positioning market."}
      ]
    },
    contact:{
      eyebrow:"Contact",title:"Reach us for a demo or quote",
      sub:"Share your application and let's define the right configuration together. Delivery to Türkiye in ~4 weeks.",
      name:"Full Name",company:"Company",email:"E-mail",phone:"Phone",message:"Your message / application",
      submit:"Send Request",sending:"Sending…",
      ok:"Thank you! Your request has been received; we'll get back to you shortly.",
      err:"Something went wrong. Please try again or contact us by e-mail.",
      note:"Your information is used only to get back to you.",
      mWeb:"Web",mMail:"E-mail",mPhone:"Phone",mWa:"WhatsApp",
      ctaTitle:"Need a quick reply?",ctaText:"Reach us on WhatsApp and we'll pick the best model for your application together.",ctaBtn:"Message on WhatsApp"
    },
    footer:{
      about:"Locally manufactured telecentric 2D optical measurement systems. Rotary-table, area-scanning and PLC-integrated — for precise quality control.",
      quick:"Quick Links",contactH:"Contact",rights:"All rights reserved.",disclaimer:"Optical measurement systems · Türkiye"
    }
  }
};
