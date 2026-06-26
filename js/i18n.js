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
      title:"SKANOPT · Telesentrik Optik Ölçüm Modülleri | 2D Boyutsal Muayene",
      desc:"SKANOPT modüler telesentrik 2D optik ölçüm modülleri: yüksek çözünürlüklü tek çekim alan tarama, marka bağımsız PLC ve robot entegrasyonu, kullanıcı dostu kalibrasyon ve sipariş bazlı kısa teslim süreleri."
    },
    nav:{why:"Neden SKANOPT",series:"Seriler",how:"Nasıl Çalışır",automation:"Otomasyon",software:"Yazılım",compare:"Karşılaştırma",sectors:"Sektörler",contact:"İletişim"},
    cta:{demo:"İletişime Geç",quote:"Teklif Al",series:"Serileri İncele"},
    hero:{
      badge:"Hassas Mühendislik",
      t1:"Optik Ölçüm\n",t2:"Hassas ve Modüler",t3:"",
      sub:"- Yüksek Hassasiyetli Boyutsal Kontrol\n- Telesentrik Optik Ölçüm\n- Entegre Aydınlatma ve Yüksek Çözünürlüklü Kamera\n- Üretim hattına ve Robot hücresine kolay entegrasyon",
      stat1:"Yüksek Hassasiyet (VRE)",stat2:"Ölçüm Süresi",stat3:"Maks. Çözünürlük",secUnit:"sn",resolUnit:"MP",
      trust1:"Marka Bağımsız PLC ve Robot Entegrasyonu",trust2:"Kullanıcı Kalibrasyonu",trust3:"Sürekli Online Üretici Desteği",
      f1s:"Tek çekim",f1b:"20 × 20 mm alan",f2s:"Ölçüm süresi",
      videoLabel1:"Ölçüm Cihazı",videoLabel2:"Matkap Ölçümü"
    },
    why:{
      eyebrow:"Neden SKANOPT",title:"SKANOPT Hangi Alanlarda Fark Yaratır?",
      sub:"Yüksek hassasiyetli telesentrik teknolojisini;\nesnek entegrasyon, kullanıcı kalibrasyonu ve\nözgün mühendislik avantajlarıyla sunuyoruz.",
      cards:[
        {icon:"rotary",t:"Modüler ve Esnek Yapı",d:"Atölye ortamında, hat kenarında veya\ndoğrudan konveyör ve robot hatlarında\ninline ölçüm için\nesnek montaj imkanı"},
        {icon:"scan",t:"Çift Telesentrik Optik (Dual-Telecentric)",d:"Bozulmasız, derin odak alanı ve yüksek çözünürlüklü tek çekim alan tarama teknolojisiyle hatasız ölçüm"},
        {icon:"plc",t:"PLC ve Robot Entegrasyonu",d:"Siemens, Mitsubishi, Fanuc, Omron gibi\npopüler PLC'ler ve robot kollarıyla\nEthernet I/O üzerinden doğrudan haberleşme"},
        {icon:"calib",t:"Kullanıcı Dostu Kalibrasyon",d:"Yazılım arayüzünden yapılabilen pratik kalibrasyon altyapısı"},
        {icon:"camera",t:"Endüstriyel Kamera Çözünürlüğü",d:"İhtiyaca uygun 5 MP ile 25 MP aralığında\nyüksek çözünürlüklü CMOS sensör yapılandırmaları"},
        {icon:"truck",t:"Kısa Teslim Süreleri",d:"Sipariş üzerine esnek üretim planlaması, hızlı teslimat ve doğrudan üreticiden uzman teknik destek"}
      ]
    },
    series:{
      eyebrow:"Ürün Serileri",title:"Her Parça ve Hat İçin\nDoğru Model",
      sub:"Kompakt sensör modüllerinden\nBüyük parça ölçüm ve tam otomasyon sistemlerine kadar\nBeş ürün ailesi.\nTüm modeller I/O hazır gelir.",
      headers:{model:"Model",fovh:"Yatay FOV (mm)",fovv:"Dikey FOV (mm)",acc:"Hassasiyet (µm)"},
      note:"Görüş alanı (FOV) ve hassasiyet değerleri modele göredir. Uygulamanıza özel konfigürasyon için bize ulaşın.",
      order:["V","VR","VRE","W","H"],
      items:{
        V:{name:"V Serisi",tag:"Kompakt · Alan Kamerası",desc:"Kompakt gövde tasarımı, alan kamerası ve 0.4 saniyede ölçüm. Atölye ve hat kenarı kalite kontrol için ideal.",
           feats:["0.4 saniyede ölçüm sonucu","Otomasyona uygun, I/O hazır gelir","Fabrika çıkışlı sistem kalibrasyonu","Otomatik raporlama ve veri entegrasyonu"]},
        VR:{name:"VR Serisi",tag:"Opsiyonel Döner Tabla Entegrasyonu",desc:"V serisi sensör modülüne entegre 360° döner tabla opsiyonu ile mil, şaft ve dairesel parçalarda dairesellik, eşmerkezlilik ve salgı ölçümü.",
           feats:["Dairesellik, eşmerkezlilik ve ovallik ölçümü","360° döner tabla entegrasyonu ile şaft/mil ölçümü","Otomasyona uygun, I/O hazır arayüz","CNC aşınma telafisi (wear offset) ve otomatik raporlama"]},
        VRE:{name:"VRE Serisi",tag:"Ultra Hassas · Uzun Parça",desc:"Ultra yüksek hassasiyet ve dikeyde 100–600 mm uzun parça ölçüm desteği.",
           feats:["0.001 µm çözünürlüğe varan hassasiyet","Dikeyde 100–600 mm ölçüm boyu","VR serisi entegrasyon opsiyonları","Uzun parça ve yüksek hassasiyet uygulamaları"]},
        W:{name:"W Serisi",tag:"Büyük Parça · Çizgisel Kamera",desc:"Büyük ve uzun parçalar için çizgisel (lineer) kamera teknolojisine sahip telesentrik sistem.",
           feats:["Büyük ve uzun parça ölçümü","Çizgisel kamera ile artırılmış hassasiyet","Dikeyde 300–1500 mm","WE modelleri ile daha yüksek hassasiyet"]},
        H:{name:"H Serisi",tag:"Hat Boyu Otomasyon",desc:"Tam otomasyon odaklı, 0.4 saniyede ölçüm yapabilen geniş modül yelpazesi.",
           feats:["0.4 saniyede ölçüm","Geniş ölçüm aralığı, 10 model","Otomasyona uygun, I/O hazır","Sistem + kullanıcı kalibrasyonu"]}
      }
    },
    how:{
      eyebrow:"Nasıl Çalışır",title:"Parçadan Sonuca Dört Adım",
      sub:"Telesentrik optik ve sub-piksel görüntü işleme ile operatör hatası olmadan, saniyeler içinde ölçüm.",
      steps:[
        {t:"Parça Yerleştirme",d:"Parça ölçüm alanına (konveyör veya\ndöner tabla opsiyonuna) yerleştirilir."},
        {t:"Alan Tarama",d:"Ölçüm alanı tek çekimde\nyüksek çözünürlüklü CMOS sensörle taranır."},
        {t:"Görüntü İşleme",d:"Z-Measure yazılımı sub-piksel hassasiyetle\nboyutsal değerleri çıkarır."},
        {t:"Entegrasyon & Raporlama",d:"PLC / robot / CNC'ye aşınma telafisi\n(wear offset) veya OK/NOK sinyali gönderilir."}
      ]
    },
    auto:{
      eyebrow:"Robot & Otomasyon",title:"Hattınıza Sorunsuz Entegre",
      sub:"Marka bağımsız PLC, robot ve konveyör uyumluluğu.\nÖlçüm sonuçlarını doğrudan tezgâha ileterek\noperatör müdahalesini sıfıra indirir.",
      videoTag:"Canlı inline ölçüm",videoTag2:"Robot hücresi — canlı",
      points:[
        {icon:"robot",t:"Robot & Konveyör",d:"Stäubli konveyör ve uFactory robot kolu entegrasyonu — Z-Measure'da hazır arayüz."},
        {icon:"plc",t:"Her PLC Markası",d:"Siemens, Mitsubishi, Fanuc, Omron — sahadan sorunsuz entegrasyon."},
        {icon:"cnc",t:"CNC Wear Offset",d:"Ölçüm sonucunu doğrudan tezgâha aşınma telafisi olarak gönderir."},
        {icon:"sync",t:"Senkron Tetikleme",d:"'Şimdi ölç' komutunu konveyör bandı veya robot ile senkronize eder."}
      ]
    },
    sw:{
      eyebrow:"Z-Measure Yazılımı",title:"Ölçümden raporlamaya tek arayüz",
      sub:"Onlarca ölçüm tipi, sub-piksel hassasiyet, otomatik raporlama ve SPC.\nÇoklu dil destekli arayüz.",
      measHead:"Desteklenen Ölçüm Tipleri",
      measurements:["Döner Çap","Çap","Boy","Açı","Pah","Radyus","Vida (Adım + Çap)","Dairesellik","Diklik","Paralellik","Simetriklik","Salgı"],
      cards:[
        {icon:"link",t:"Bağlantılar",d:"Robot haberleşmesi, ERP/SCADA entegrasyonu ve barkodla\nprogram seçimi."},
        {icon:"cnc",t:"CNC Offset",d:"Tezgâha wear offset atama arayüzü —\noperatör müdahalesi sıfır."},
        {icon:"calib",t:"Kalibrasyon",d:"Sistem fabrikada kalibre edilmiş olarak teslim edilir;\nkullanıcı dilediği zaman yeniden kalibre edebilir."},
        {icon:"report",t:"Raporlama & SPC",d:"Otomatik raporlama ve SPC\nveri kaydı, kolay dışa aktarma."}
      ],
      badges:["Windows 10 / 11","I/O Hazır","Çoklu Dil / Multilingual"]
    },
    cmp:{
      eyebrow:"Öne Çıkan Özellikler",title:"Neden SKANOPT öne çıkıyor?",
      sub:"Pazar standartları ile teknik ve ticari karşılaştırma.",
      note:"Telesentrik optik ölçüm sistemlerinde özgün tasarım, doğrudan teknik destek ve yüksek esneklikle rekabetçi çözümler sunuyoruz.",
      feature:"Özellikler",
      cols:["Standart Sistemler","SKANOPT"],
      rows:[
        {label:"Döner Tabla (Opsiyon)",cells:["❌ Genellikle yok / sınırlı","✓ Entegre edilebilir (360° Ölçüm)"]},
        {label:"Alan Tarama",cells:["Genellikle çizgisel tarama","✓ Tek çekimde hızlı alan tarama"]},
        {label:"PLC Esnekliği",cells:["Sınırlı veya tek marka bağımlı","✓ Marka bağımsız (Tüm PLC & Robotlar)"]},
        {label:"Kamera (MP)",cells:["Maksimum 5 MP","✓ 5 MP - 25 MP seçenekleri"]},
        {label:"Kullanıcı Kalibrasyon",cells:["❌ Genellikle yok (servis bağımlı)","✓ Yazılım dahil (Pratik kalibrasyon)"]},
        {label:"Teslim Süresi",cells:["4 ile 16 hafta arası","✓ Sipariş bazlı hızlı teslimat"]},
        {label:"Doğrudan Destek",cells:["Distribütör veya bayi üzerinden","✓ Doğrudan üreticiden hızlı destek"]},
        {label:"Fiyat",cells:["Yüksek yatırım maliyeti","✓ Rekabetçi ve modüler fiyatlar"]}
      ]
    },
    sec:{
      eyebrow:"Sektörler & Uygulamalar",title:"Hassas ölçüm gereken her yerde",
      sub:"Otomotiv yan sanayiden implant ve beyaz eşyaya, kalite kontrolün kritik olduğu sektörlere yönelik.",
      appsHead:"Örnek ölçülen parçalar",
      sectors:[
        {icon:"car",t:"Otomotiv Yan Sanayi",d:"Şaft, piston, valf ve dişli ölçümünde 360° kontrol opsiyonu."},
        {icon:"appliance",t:"Beyaz Eşya",d:"Yüksek hacimli üretimde hızlı\nboyutsal kalite kontrol."},
        {icon:"implant",t:"İmplant & Medikal",d:"Yüksek hassasiyet gerektiren\ntıbbi parça ve iğneler."},
        {icon:"chip",t:"Elektronik & Yarı İletken",d:"Konnektör pinleri, çip ve\nhassas elektronik parçalar."},
        {icon:"cnc",t:"CNC & Metal İşleme",d:"0.4 sn ölçüm + CNC wear offset ile üretim kaybı sıfır."},
        {icon:"mold",t:"Plastik & Kalıp",d:"Enjeksiyon parçaları için ideal telesentrik ölçüm."},
        {icon:"aero",t:"Havacılık & Savunma",d:"Kritik toleranslı parçalarda yüksek tekrarlanabilirlik."},
        {icon:"lab",t:"AR-GE & Kalibrasyon",d:"Laboratuvar ve kalite kontrol birimleri için."}
      ],
      apps:["PCB","Dişli","Yay","Şaft / Mil","Vida","Segman","Medikal iğne","Otomotiv parçaları","Seramik","Kauçuk","Konnektör pini","Kesitler"]
    },
    ref:{
      eyebrow:"Global Pazarlar",title:"Türkiye'den dünyaya",
      sub:"Küresel pazarda aktif satış, AB'ye ihracat ve ABD ortaklığı ile büyüyen bir ağ.",
      note:"CE sertifikasyon süreci devam etmektedir. Distribütör ve referans bilgileri talep üzerine paylaşılır.",
      items:[
        {flag:"🇹🇷",country:"Türkiye",role:"Aktif Satış",desc:"Otomotiv, CNC ve plastik sektörlerinde geniş müşteri ağı."},
        {flag:"🇪🇺",country:"Avrupa Birliği",role:"AB'ye İhracat",desc:"Avrupa pazarına ihracat; CE sürecinin tamamlanmasıyla büyüyen talep."},
        {flag:"🇺🇸",country:"ABD",role:"Resmi Ortaklık",desc:"Robot konumlandırma pazarı için ABD'de distribütör ortaklığı."}
      ]
    },
    contact:{
      eyebrow:"İletişim",title:"Demo veya teklif için bize ulaşın",
      sub:"Uygulamanızı paylaşın, doğru konfigürasyonu birlikte belirleyelim. Hızlı ve kesintisiz teknik destek.",
      name:"Ad Soyad",company:"Firma",email:"E-posta",phone:"Telefon",message:"Mesajınız / uygulamanız",
      categoryLabel:"Lütfen ürün kategorisini seçin. (zorunlu)",
      selectCategory:"ürün kategorisi seçin",
      catV:"V Serisi (Kompakt · Alan Kamerası)",
      catVR:"VR Serisi (Döner Tabla Entegrasyonu)",
      catVRE:"VRE Serisi (Ultra Hassas · Uzun Parçalar)",
      catW:"W Serisi (Büyük Parçalar · Çizgisel Kamera)",
      catH:"H Serisi (Hat Otomasyonu)",
      catOther:"Diğer / Genel Soru",
      interestsLabel:"Lütfen ilgilendiğiniz konuları işaretleyin. (zorunlu)",
      interestTalk:"Bir Uzmanla Görüşün",
      interestPricing:"Fiyat Teklifi",
      interestOther:"Diğer",
      messageLabel:"Lütfen uygulamanızın veya sorunuzun detaylarını aşağıdaki alanda paylaşın.",
      emailTitle:"Lütfen E-posta Adresinizi Girin",
      emailSub:"Eğer daha önce kayıt olduysanız, lütfen kayıtlı e-posta adresinizi girin. Henüz kayıt olmadıysanız, kaydınızı tamamlamak için e-posta adresinizi girin.",
      emailLabel:"Şirket E-posta Adresi (zorunlu)",
      submit:"Talebi Gönder",sending:"Gönderiliyor…",
      ok:"Teşekkürler! Talebiniz alındı, en kısa sürede dönüş yapacağız.",
      err:"Bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan e-posta ile ulaşın.",
      note:"Bilgileriniz yalnızca size dönüş yapmak için kullanılır.",
      mWeb:"Web",mMail:"E-posta",mPhone:"Telefon",mWa:"WhatsApp",
      ctaTitle:"Hızlı yanıt mı istiyorsunuz?",ctaText:"WhatsApp üzerinden ulaşın, uygulamanıza en uygun modeli birlikte belirleyelim.",ctaBtn:"WhatsApp'tan Yaz"
    },
    footer:{
      about:"Yüksek hassasiyetli modüler telesentrik\noptik ölçüm modülleri. Alan tarayan, PLC entegreli ve\ngelişmiş kalite kontrol çözümleri.",
      quick:"Hızlı Linkler",contactH:"İletişim",rights:"Tüm hakları saklıdır.",disclaimer:"Modüler Optik Ölçüm Sistemleri"
    },
    a11y:{skip:"İçeriğe atla"}
  },

  /* ===================== ENGLISH ===================== */
  en:{
    meta:{
      title:"SKANOPT · Telecentric Optical Measurement Sensors | 2D Dimensional Inspection",
      desc:"SKANOPT modular telecentric 2D optical measurement sensors: high-resolution single-shot area scanning, brand-independent PLC and robot integration, user-defined calibration and short lead times."
    },
    nav:{why:"Why SKANOPT",series:"Series",how:"How It Works",automation:"Automation",software:"Software",compare:"Comparison",sectors:"Industries",contact:"Contact"},
    cta:{demo:"Contact Us",quote:"Get a Quote",series:"Explore Series"},
    hero:{
      badge:"Precision Engineering",
      t1:"Optical Measurement\n",t2:"Precise and Modular",t3:"",
      sub:"- High-Precision Dimensional Control\n- Telecentric Optical Measurement\n- Integrated Lighting and High-Resolution Camera\n- Easy integration into production lines and robot cells",
      stat1:"High Accuracy (VRE)",stat2:"Measurement Speed",stat3:"Max. Resolution",secUnit:"s",resolUnit:"MP",
      trust1:"Brand-Independent PLC and Robot Integration",trust2:"User Calibration",trust3:"Continuous Online Manufacturer Support",
      f1s:"Single shot",f1b:"20 × 20 mm field",f2s:"Measurement time",
      videoLabel1:"Measurement System",videoLabel2:"Drill Inspection"
    },
    why:{
      eyebrow:"Why SKANOPT",title:"Where SKANOPT Stands Apart",
      sub:"We offer high-precision telecentric technology\ncombined with flexible integration, user calibration, and\noriginal engineering advantages.",
      cards:[
        {icon:"rotary",t:"Modular and Flexible Design",d:"Flexible mounting options for inline measurements\ndirectly on conveyor and robot lines, or offline\nworkshop inspection."},
        {icon:"scan",t:"Dual-Telecentric Optics",d:"Distortion-free, wide depth of field, and high-resolution single-shot area scanning for error-free metrology."},
        {icon:"plc",t:"PLC & Robot Integration",d:"Direct communication with popular PLC brands (Siemens, Mitsubishi, Fanuc, Omron) and robot arms via Ethernet I/O."},
        {icon:"calib",t:"User-Friendly Calibration",d:"Practical calibration infrastructure accessible directly via the software interface."},
        {icon:"camera",t:"Industrial Camera Options",d:"High-resolution CMOS sensor configurations ranging from 5 MP to 25 MP tailored to your requirements."},
        {icon:"truck",t:"Short Lead Times",d:"Flexible production planning based on order, fast delivery, and direct technical support from the manufacturer."}
      ]
    },
    series:{
      eyebrow:"Product Series",title:"The Right Model for\nEvery Part and Line",
      sub:"From compact sensor modules\nto large-part measurement and full automation systems,\nfive product families.\nAll models ship I/O-ready.",
      headers:{model:"Model",fovh:"Horizontal FOV (mm)",fovv:"Vertical FOV (mm)",acc:"Accuracy (µm)"},
      note:"Field of view (FOV) and accuracy values depend on the model. Contact us for a configuration tailored to your application.",
      order:["V","VR","VRE","W","H"],
      items:{
        V:{name:"V Series",tag:"Compact · Area Camera",desc:"Compact body design, area camera, and 0.4-second measurement speed. Ideal for workshop and line-side quality control.",
           feats:["Measurement result in 0.4 s","Automation-ready, ships I/O-ready","Factory-calibrated system","Automatic reporting and data integration"]},
        VR:{name:"VR Series",tag:"Optional Rotary Stage Integration",desc:"V-series sensor module combined with an optional 360° rotary stage for measuring roundness, concentricity, and ovality of shafts and cylindrical parts.",
           feats:["Roundness, concentricity, and ovality measurements", "Shaft/pin metrology with 360° rotary stage integration", "Automation-ready, I/O-ready interface", "CNC wear offset and automatic reporting"]},
        VRE:{name:"VRE Series",tag:"Ultra-Precise · Long Parts",desc:"Ultra-high accuracy and vertical measuring length of 100–600 mm.",
           feats:["Accuracy down to 0.001 µm","Vertical measuring length 100–600 mm","VR series integration options","Long-part and high-precision applications"]},
        W:{name:"W Series",tag:"Large Parts · Line Camera",desc:"For large and long parts. Uses a line camera in the telecentric system to boost accuracy.",
           feats:["Large and long-part measurement","Higher accuracy with line camera","Vertical 300–1500 mm","Even higher accuracy with WE models"]},
        H:{name:"H Series",tag:"Line Automation",desc:"A wide range focused on full automation. Measurement in 0.4 seconds, 10 model options.",
           feats:["Measurement in 0.4 s","Wide measuring range, 10 models","Automation-ready, I/O-ready","Factory + user calibration"]}
      }
    },
    how:{
      eyebrow:"How It Works",title:"Four Steps from Part to Result",
      sub:"Telecentric optics and sub-pixel image processing deliver measurement in seconds, without operator error.",
      steps:[
        {t:"Part Placement",d:"The part is placed in the measurement area (conveyor or optional rotary stage)."},
        {t:"Area Scan",d:"A high-resolution area scan is captured in one shot by the CMOS sensor."},
        {t:"Image Processing",d:"Z-Measure software calculates dimensional values with sub-pixel accuracy."},
        {t:"Integration & Reporting",d:"A wear offset or OK/NOK signal is sent to the PLC / robot / CNC."}
      ]
    },
    auto:{
      eyebrow:"Robot & Automation",title:"Seamless Integration Into Your Line",
      sub:"Brand-independent PLC, robot and conveyor compatibility.\nSends measurement results directly to the machine\nto reduce operator intervention to zero.",
      videoTag:"Live inline measurement",videoTag2:"Robot cell — live",
      points:[
        {icon:"robot",t:"Robot & Conveyor",d:"Stäubli conveyor and uFactory robot-arm integration — ready interface in Z-Measure."},
        {icon:"plc",t:"Any PLC Brand",d:"Siemens, Mitsubishi, Fanuc, Omron — smooth on-site integration."},
        {icon:"cnc",t:"CNC Wear Offset",d:"Sends the measurement result to the machine directly as a wear offset."},
        {icon:"sync",t:"Synchronized Trigger",d:"Synchronizes the 'measure now' command with the conveyor or robot."}
      ]
    },
    sw:{
      eyebrow:"Z-Measure Software",title:"One interface from measurement to reporting",
      sub:"Dozens of measurement types, sub-pixel accuracy, automatic reporting and SPC.\nMultilingual interface support.",
      measHead:"Supported Measurement Types",
      measurements:["Rotary diameter","Diameter","Length","Angle","Chamfer","Radius","Thread (pitch + dia.)","Roundness","Perpendicularity","Parallelism","Symmetry","Runout"],
      cards:[
        {icon:"link",t:"Connectivity",d:"Robot communication, ERP/SCADA integration and barcode-based program selection."},
        {icon:"cnc",t:"CNC Offset",d:"Interface to assign wear offset to the machine — zero operator intervention."},
        {icon:"calib",t:"Calibration",d:"Ships factory-calibrated; the user can calibrate at any time."},
        {icon:"report",t:"Reporting & SPC",d:"Automatic reporting and SPC data logging with easy export."}
      ],
      badges:["Windows 10 / 11","I/O Ready","Multilingual Support"]
    },
    cmp:{
      eyebrow:"Key Highlights",title:"Why SKANOPT stands out",
      sub:"Technical and commercial comparison of features with market standards.",
      note:"We offer competitive solutions in telecentric optical measurement systems with original design, direct manufacturer support, and high flexibility.",
      feature:"Features",
      cols:["Standard Systems","SKANOPT"],
      rows:[
        {label:"Rotary Stage (Option)",cells:["❌ Generally unavailable","✓ Integrable (360° Measurement)"]},
        {label:"Area Scan",cells:["Line scan or video-based","✓ Fast single-shot area scan"]},
        {label:"PLC Flexibility",cells:["Brand-dependent or limited","✓ Brand-independent (Any PLC & Robot)"]},
        {label:"Camera (MP)",cells:["Maximum 5 MP","✓ 5 MP to 25 MP CMOS options"]},
        {label:"User Calibration",cells:["❌ Service-dependent","✓ Easy software-integrated calibration"]},
        {label:"Delivery Time",cells:["4 to 16 weeks","✓ Fast order-based delivery"]},
        {label:"Direct Support",cells:["Dealer or agency dependent","✓ Direct online manufacturer support"]},
        {label:"Price",cells:["High initial investment","✓ Competitive and modular pricing"]}
      ]
    },
    sec:{
      eyebrow:"Industries & Applications",title:"Wherever precise measurement matters",
      sub:"From automotive suppliers to implants and home appliances — built for industries where quality control is critical.",
      appsHead:"Example measured parts",
      sectors:[
        {icon:"car",t:"Automotive Suppliers",d:"Shaft, piston, valf and gear measurement with optional 360° control."},
        {icon:"appliance",t:"Home Appliances",d:"Fast dimensional quality control\nin high-volume production."},
        {icon:"implant",t:"Implants & Medical",d:"Medical parts and needles\nthat demand high precision."},
        {icon:"chip",t:"Electronics & Semiconductor",d:"Connector pins, chips and\nprecise electronic parts."},
        {icon:"cnc",t:"CNC & Metalworking",d:"0.4 s measurement + CNC wear offset means zero production loss."},
        {icon:"mold",t:"Plastics & Molding",d:"Ideal telecentric measurement for injection-molded parts."},
        {icon:"aero",t:"Aerospace & Defense",d:"High repeatability on parts with critical tolerances."},
        {icon:"lab",t:"R&D & Calibration",d:"For laboratories and quality-control departments."}
      ],
      apps:["PCB","Gears","Springs","Shafts","Screws","Circlips","Medical needles","Automotive parts","Ceramics","Rubber","Connector pins","Cross-sections"]
    },
    ref:{
      eyebrow:"Global Markets",title:"From Türkiye to the world",
      sub:"Global sales presence, exports to the EU, and a US partnership — a growing network.",
      note:"CE certification is in progress. Distributor and reference details are shared on request.",
      items:[
        {flag:"🇹🇷",country:"Türkiye",role:"Active Sales",desc:"Active sales and distributor network in automotive, CNC, and plastics."},
        {flag:"🇪🇺",country:"European Union",role:"EU Export",desc:"Exports to the European market, growing with the completion of CE."},
        {flag:"🇺🇸",country:"USA",role:"Official Partnership",desc:"Distributor partnership in the US for the robot-positioning market."}
      ]
    },
    contact:{
      eyebrow:"Contact",title:"Reach us for a demo or quote",
      sub:"Share your application and let's define the right configuration together. Fast and seamless manufacturer technical support.",
      name:"Full Name",company:"Company",email:"E-mail",phone:"Phone",message:"Your message / application",
      categoryLabel:"Please select product category. (required)",
      selectCategory:"select product category",
      catV:"V Series (Compact · Area Scan)",
      catVR:"VR Series (Rotary Stage)",
      catVRE:"VRE Series (High Precision / Long Parts)",
      catW:"W Series (Large Parts / Line Scan)",
      catH:"H Series (Full Automation)",
      catOther:"Other / General Inquiry",
      interestsLabel:"Please check the item(s) you are interested in. (required)",
      interestTalk:"Talk to a Specialist",
      interestPricing:"Pricing",
      interestOther:"Other",
      messageLabel:"Please share the details of your application or inquiry in the section below.",
      emailTitle:"Please Enter Your Email Address",
      emailSub:"If you have registered in the past, please enter your registered email address below. If you are not yet registered, please enter your email address below to complete your submission.",
      emailLabel:"Business E-mail Address (required)",
      submit:"Send Request",sending:"Sending…",
      ok:"Thank you! Your request has been received; we'll get back to you shortly.",
      err:"Something went wrong. Please try again or contact us by e-mail.",
      note:"Your information is used only to get back to you.",
      mWeb:"Web",mMail:"E-mail",mPhone:"Phone",mWa:"WhatsApp",
      ctaTitle:"Need a quick reply?",ctaText:"Reach us on WhatsApp and we'll pick the best model for your application together.",ctaBtn:"Message on WhatsApp"
    },
    footer:{
      about:"High-precision modular telecentric\noptical measurement sensors. Single-shot area scanning, PLC-integrated, advanced quality control solutions.",
      quick:"Quick Links",contactH:"Contact",rights:"All rights reserved.",disclaimer:"Modular Optical Measurement Systems"
    },
    a11y:{skip:"Skip to content"}
  }
};
