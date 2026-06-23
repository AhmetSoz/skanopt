import json
import os

json_path = r"C:\Users\GilboTeknik\Desktop\SKANOPT OÖC\fuardan firma bulma\lead_finder\leads.json"

if not os.path.exists(json_path):
    print("leads.json not found!")
    exit(1)

with open(json_path, 'r', encoding='utf-8') as f:
    leads = json.load(f)

# Exact researched mapping for Turkish companies
tr_profiles = {
    "akoðlu otomotiv": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Otomotiv sanayi için sıcak ve soğuk metal dövme parçalar üretmekte ve bunları CNC tezgahlarında hassas şekilde işlemektedir. İşlenen süspansiyon rotları, akslar ve direksiyon kutusu milleri üzerindeki muylu çapları, büküm boyları ve salgılarının (runout) temassız kalite kontrolü için SKANOPT VR serisi uygundur."
    },
    "aksa process engineering": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel manyetik ayırıcılar, elektromanyetik ekipmanlar ve metal dedektör sistemleri üretmektedir. Paslanmaz çelik manyetik baraların, filtre gövdelerinin ve kaynaklı montaj braketlerinin boyutsal tolerans ve eksenel doğruluk kontrollerinde SKANOPT V serisi optik sistemler kullanılabilir."
    },
    "aktif elektroteknik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Orta gerilim şalt tesisleri, modüler metal hücreler ve sac elektrik panoları üretmektedir. Hücre montaj sac parçalarının büküm toleransları, pano kilit eksenleri ve bakır baraların delik merkezlerinin doğrulanmasında SKANOPT V/H serisi optik ölçüm cihazları kullanılabilir."
    },
    "ari drones teknoloji": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel insansız hava araçları (İHA/Drone) ve otopilot sistemleri geliştirmektedir. Droneların karbon fiber gövde parçaları, hassas motor şaftları ve dişli çarklarının salgı ve boyutsal tolerans kontrolünde 360° döner tablalı SKANOPT VR serisi kullanılabilir."
    },
    "armtek elektrik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Güç transformatörleri, orta gerilim panoları ve elektrik dağıtım elemanları üretmektedir. Pano içi bakır bara bağlantı klemenslerinin, bara büküm açılarının ve montaj plakası delik merkezlerinin boyutsal kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "asartech arge": {
        "sektor": "Medikal Cihaz & Dental İmplant", # High-precision electronic filters/RF
        "not": "Savunma sanayi için RF, mikrodalga haberleşme modülleri ve mikrodalga filtreler tasarlamaktadır. Elektronik kart yuvaları, alüminyum koruyucu gövde kutuları ve konnektör pinlerinin mikron seviyesindeki tolerans kontrolünde SKANOPT VRE serisi (ultra-hassas) kullanılabilir."
    },
    "atce enerji otomasyon": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Alçak ve orta gerilim elektrik dağıtım panoları imalatı ve sac pano montajı yapmaktadır. Pano şasilerinin sac metal büküm açıları ve bağlantı civata deliklerinin boyutsal doğrulamalarında SKANOPT V serisi kullanılabilir."
    },
    "basoglu kablo": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Silikon kablolar, beyaz eşya kablo grupları (wiring harnesses) ve silikon profiller üretmektedir. Ekstrüzyon hattından çıkan beyaz eşya kapı contalarının ve özel silikon profillerin en kesit geometrilerinin boyutsal doğrulaması için SKANOPT V serisi temassız optik kontrol sunar."
    },
    "bass olcme enstrumanlari": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel debimetreler, basınç transmiterleri ve seviye göstergeleri üretmektedir. Akışkan kontrol ekipmanlarının flanş yuvaları, hassas metal gövde parçaları ve bağlantı deliklerinin ölçümlerinde SKANOPT V serisi kullanılabilir."
    },
    "beta enerji": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Güç ve dağıtım trafoları üretmektedir. Trafo bobin çıkış bakır plakalarının boyutsal kontrolleri, bara büküm açıları ve bağlantı deliklerinin ölçümlerinde SKANOPT V serisi kullanılabilir."
    },
    "bosphorus endüstriyel": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Üretim yönetim sistemleri (MES) ve endüstriyel IoT yazılımları sunmaktadır. Fabrikalarda kurulu SKANOPT optik ölçüm cihazlarının kalite verilerini MES sistemlerine otomatik entegre edebilecek yazılım çözümleri geliştirebilir."
    },
    "cks kablo tasiyici": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Nylon ve metal kablolar için hareketli kablo taşıyıcı kanallar (kablo zincirleri) üretmektedir. Plastik zincir baklalarının enjeksiyon kalıplarından çıkışındaki boyutsal çekme payı ve pim yuvası çapı kontrollerinde SKANOPT V serisi kullanılabilir."
    },
    "cobro robot": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Kolaboratif robot (cobot) hücreleri, robotik tutucular (grippers) ve montaj hatları entegrasyonu yapmaktadır. Robotik hücrelerin sonundaki kalite kontrol istasyonlarında uFactory ve Stäubli robot arayüzlerine sahip SKANOPT optik ölçüm modüllerini kullanabilir."
    },
    "coskun otomat": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "CNC otomat torna tezgahlarında pirinç, çelik, alüminyum malzemelerden özel hassas pimler, burçlar, rekorlar, somunlar ve cıvatalar üretmektedir. Torna hatlarından çıkan bu küçük parçaların boy, dış çap, vida dişi geometrisi ve pah ölçümlerinin temassız kalite kontrolünde SKANOPT V/VR serisi kullanılır."
    },
    "dataguess teknoloji": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Yapay zeka tabanlı görüntü işleme ve kalite kontrol yazılımları sunmaktadır. SKANOPT cihazlarının optik donanımları üzerine özel yapay zeka analiz algoritmaları geliştirmek veya entegrasyon yapmak için potansiyel iş ortağı adayıdır."
    },
    "dekta mühendislik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel çelik konstrüksiyon yapılar ve büyük depo çadırları imal etmektedir. Çelik çerçeve montaj plakalarının delik eksenleri ve bağlantı civata dişlerinin kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "demas makina": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Somun diş açma (tapping) makineleri ve somun montaj hatları üretmektedir. Somun diş açma sonrasındaki iç dişlerin (kılavuz vida dişlerinin) boyutsal tolerans kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "demsay elektronik": {
        "sektor": "Medikal Cihaz & Dental İmplant",
        "not": "Elektronik kart dizgisi (SMT/THT) ve elektronik montaj hizmetleri vermektedir. Elektronik kartlar üzerindeki konektör pinlerinin yükseklik, büküm ve aralık toleranslarının temassız kontrolünde SKANOPT V/VRE serisi kullanılabilir."
    },
    "dinamik motor redüktör": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Elektrik motorları ve redüktörler (dişli kutuları) üretmektedir. Redüktör gövde flanşlarının çapı, motor mili ve dişli çarkların salgı, boy ve kama yuvası boyutsal kontrollerinde SKANOPT VR serisi kullanılabilir."
    },
    "eae elektroteknik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Busbar enerji dağıtım sistemleri, sac elektrik panoları ve kablo kanalları üretmektedir. Sac metal panoların büküm toleransları, kilit yuvaları ve busbar bakır plakalarının delik merkezleri kontrolünde SKANOPT V ve H serisi kullanılabilir."
    },
    "edit elektronik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Voltaj regülatörleri, kesintisiz güç kaynakları ve transformatörler üretmektedir. Regülatör içi bakır sargı bağlantıları ve metal şasi büküm toleranslarının kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "ege dinamik": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Lineer hareket sistemleri, vidalı mil yatakları, aktüatörler ve özel robotik kartezyen hatlar üretmektedir. Vidalı millerin ve aktüatör mil yataklarının hassas dış çap, yiv ve salgı tolerans kontrolü için SKANOPT VR serisi uygundur."
    },
    "egin etiket": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Endüstriyel metal etiketler, lexan paneller, asit indirme etiketler ve membran klavyeler üretmektedir. Etiketlerin dış kesim sınırları ve membran klavye kabartma yükseltilerinin boyutsal doğrulanmasında SKANOPT V serisi kullanılabilir."
    },
    "enel enerji": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Güç elektroniği, UPS (Kesintisiz Güç Kaynağı) ve solar invertörler üretmektedir. İnvertör soğutucu alüminyum bloklarının (heatsink) kanal ölçüleri ve montaj vida deliklerinin kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "energoin trafo": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Dağıtım ve güç transformatörleri üretmektedir. Trafo bağlantı baraları ve izolatör flanşlarının boyutsal doğrulamalarında SKANOPT V serisi kullanılabilir."
    },
    "entek teknik malzeme": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Pnömatik, hidrolik ve fabrika otomasyon ekipmanları distribütörlüğü ve sistem mühendisliği yapmaktadır. Müşterilerine sundukları hatlarda kalite kontrol istasyonu olarak SKANOPT optik sensör modüllerini entegre edebilir."
    },
    "entes elektronik": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Güvenlik röleleri, enerji analizörleri ve reaktif güç kontrol röleleri üretmektedir. Cihazların plastik kutu tırnakları ve klemens metal terminallerinin montaj hassasiyeti kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "eran kablo": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Tesisat kabloları ve silikon yalıtımlı özel kablolar üretmektedir. Ekstrüzyon hattından çıkan kablo dış çapı ve silikon izole kılıf et kalınlıklarının temassız kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "eurobotik otomasyon": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Endüstriyel yapay görme, kameralı kalite kontrol, 2D/3D görüntü işleme ve optik ayıklama sistemleri entegre etmektedir. Kendi kalite kontrol makine tasarımlarında ve robot hücrelerinde parça doğrulamak üzere SKANOPT telesentrik optik ölçüm modüllerini entegre edebilir."
    },
    "europhia elektrik": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Plastik ve pirinç kablo rakorları, elektrik boru aksesuarları üretmektedir. Kablo rakorlarının vida adımları ve conta yuvaları boyutsal ölçümlerinde SKANOPT V serisi kullanılır."
    },
    "ezt elektrik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel loadcell (yük hücresi) sensörleri, tartım indikatörleri ve teraziler üretmektedir. Loadcell çelik gövdelerinin hassas işlenmiş gerinim kanalları ve montaj delik toleranslarının kontrolünde SKANOPT V/VR serisi kullanılabilir."
    },
    "fego elektrik": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Elektrik klemensleri, klemens aksesuarları ve DIN rayları üretmektedir. Klemenslerin içindeki bükümlü metal yaylı iletkenlerin büküm açıları ve vida yivlerinin kalite kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "grup arge": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Enerji analizörleri, kompanzasyon cihazları ve yazılımları üretmektedir. Cihazların plastik klemens yuvaları ve metal terminallerinin boyutsal doğrulanmasında SKANOPT V serisi kullanılabilir."
    },
    "haci ayvaz": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Esnek metal hortumlar, kompansatörler, kondenstoplar, vanalar ve seviye kontrol cihazları üretmektedir. Metal hortum rakor uçları, vana milleri ve Expansion joint flanşlarının boyutsal doğrulamaları için SKANOPT V/VR serisi optik ölçüm cihazları kullanılabilir."
    },
    "hid-tek makina": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Pnömatik valfler, silindirler, hortumlar ve bağlantı elemanları üretmektedir. Pnömatik silindir millerinin dış çapı, dişleri ve valf gövdelerinin hassas delik yuvalarının kalite kontrolünde SKANOPT V/VR serisi uygundur."
    },
    "hydrogenix": {
        "sektor": "Medikal Cihaz & Dental İmplant",
        "not": "Hidrojen yakıt pilleri ve hidrojen depolama tankları geliştirmektedir. Yakıt pili bipolar kutup plakalarının (bipolar plates) mikro kanallarının hassas boyutsal kontrolü ve sızdırmazlık yüzey ölçümlerinde SKANOPT VRE serisi (ultra-hassas) kullanılabilir."
    },
    "istanbul kilit": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Endüstriyel panolar, jeneratörler ve makine kabinleri için kilitler, menteşeler ve kollar üretmektedir. Kilit dilleri, menteşe milleri ve döküm kilit gövdelerinin boyutsal tolerans ve montaj uyumluluğu kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "kant yazilim": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Yapay zeka tabanlı veri analitiği ve kestirimci bakım yazılımları üretmektedir. SKANOPT ölçüm verilerinin buluta aktarılarak kestirimci kalite analitiği yapılması için iş ortaklığı kurulabilir."
    },
    "konzek teknoloji": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Retmes MES (Üretim Takip Yazılımı) ve endüstriyel veri toplama cihazları üretmektedir. SKANOPT kalite kontrol verilerinin Retmes MES yazılımına doğrudan aktarılması için entegrasyon yapılabilir."
    },
    "kürkcüoglu jeneratör": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Dizel jeneratör setleri ve jeneratör ses izolasyon kabinleri üretmektedir. Jeneratör kumanda panolarının sac metal bükümleri ve kilit yuvalarının boyutsal kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "kuzu flex": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Paslanmaz çelik esnek hortumlar ve bağlantı elemanları üretmektedir. Hortumların uç bağlantı rakorları ve diş açılmış metal parçalarının vida adımı, boy ve çap tolerans kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "k.y.s. kürkcüoglu": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Rulman yatakları, rulman gövdeleri (pillow blocks) ve özel pik/sfero döküm parçalar üretmektedir. Döküm rulman yataklarının hassas iç çap yuvaları, flanş ölçüleri ve eksenel dairesellik doğrulamalarında SKANOPT VR/V serisi kullanılabilir."
    },
    "libal makina otomat": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Pirinç, alüminyum ve paslanmaz çelikten CNC otomat tornalama yöntemiyle hassas bağlantı elemanları, rakorlar ve konektör uçları imal etmektedir. Parçaların mikron seviyesindeki boy, çap ve yiv-diş ölçümleri için SKANOPT V serisi optik kontrol cihazları uygundur."
    },
    "mak celik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Çelik konstrüksiyon, çelik profil işleme ve çelik ticaret yapmaktadır. İşlenen yapısal çelik plakaların delik merkezleri ve kalınlık kontrollerinde SKANOPT V/H serisi kullanılabilir."
    },
    "makim makina": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Turnikeler, geçiş kontrol sistemleri, hassas döküm (investment casting) parçalar ve jeton mekanizmaları üretmektedir. Turnike milleri, kilit dilleri ve döküm hassas parçaların montaj öncesi boyutsal kontrollerinde SKANOPT V serisi kullanılabilir."
    },
    "makisan makine": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Yüksek basınçlı gaz tüpü valfleri, yangın söndürme vanaları ve pirinç bağlantı elemanları üretmektedir. Valf gövdelerinin vida dişleri, vana iğneleri ve sızdırmazlık yüzeyi açılarının hassas kontrolünde SKANOPT V/VR serisi kullanılır."
    },
    "mentpack makina": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Dikey paketleme makineleri, stick pack ve sachet paketleme hatları üretmektedir. Paketleme makinelerinin çekici çarkları, sızdırmazlık çeneleri ve şaft millerinin boyutsal doğrulamalarında SKANOPT VR/V serisi kullanılabilir."
    },
    "mis endüstriyel": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel otomasyon dolapları ve pano içi şasi montajı yapmaktadır. Kabin montaj delik eksenleri ve bara delik konumlarının boyutsal doğrulanmasında SKANOPT V serisi kullanılabilir."
    },
    "motus otomotiv": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Kamyon, iş makinesi ve traktör motorları için çelik dövme krank milleri (crankshafts) üretmekte ve hassas CNC tezgahlarında işlemektedir. Krank milleri üzerindeki rulman yatakları, muylu çapları, flanş ölçüleri ve salgılarının (runout) temassız kalite kontrolünde 360° döner tablalı SKANOPT VR serisi ve uzun miller için W serisi cihazlar kullanılabilir."
    },
    "mustafa kozanli": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Endüstriyel vakum pompaları, körükler ve kompresörler üretmektedir. Pompa rotor millerinin salgı (runout) ve dış çap toleransları ile mil kama yuvası genişliğinin kontrolünde SKANOPT VR serisi kullanılabilir."
    },
    "nara egitim": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Endüstriyel iş sağlığı ve teknik eğitimler için VR (Sanal Gerçeklik) simülasyonları üretmektedir. SKANOPT cihazlarının kullanıcı eğitim simülasyonlarının VR olarak hazırlanmasında iş birliği yapılabilir."
    },
    "noya dijital": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Endüstriyel PC'ler, panel PC'ler ve kiosklar üretmektedir. SKANOPT cihazlarının Z-Measure yazılımını çalıştıracak dayanıklı endüstriyel dokunmatik ekranlı PC ihtiyaçlarında tedarik ortağı olarak çalışılabilir."
    },
    "ortaclar elektrik": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Kablo rakorları (metal ve plastik), spiral borular ve kablo koruma aksesuarları üretmektedir. Plastik enjeksiyon kalıplarından çıkan kablo rakorlarının diş adımı, conta yuvaları ve vida çaplarının hassas kalite kontrolünde SKANOPT V ve H serisi kullanılabilir."
    },
    "ortaklar hidrolik": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Hidrolik silindirler, hidrolik liftler ve hidrolik güç üniteleri üretmektedir. Hidrolik silindir millerinin krom kaplama sonrası dış çap toleransları, mil boyu ve diş açılmış uç kısımlarının hassas kontrolü için SKANOPT V/VR serisi uygundur."
    },
    "pemaks pnömatik": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Pnömatik silindirler, piston milleri ve silindir kapakları üretmektedir. Piston millerinin dış çap toleransları, mil boyu ve diş açılmış uç kısımlarının hassas optik kontrolü için SKANOPT V/VR serisi kalite kontrol cihazları kullanılabilir."
    },
    "pilot lazer": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Lazer kesim, abkant büküm, kaynaklı imalat ve sac metal işleme yapmaktadır. Bükülen sac parçaların büküm açıları, büküm boyları ve lazerle kesilen delik merkezlerinin doğrulanmasında SKANOPT V/H serisi optik ölçüm cihazları kullanılabilir."
    },
    "poder bilisim": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Endüstriyel sunucu çözümleri ve bulut altyapısı sunmaktadır. SKANOPT cihazlarının ürettiği kalite kontrol raporlarının bulutta yedeklenmesi ve analizi için altyapı sağlayabilir."
    },
    "promotech celik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Hassas soğuk çekme çelik profiller ve kaynaklı çelik yapılar üretmektedir. Çelik profillerin en kesit geometrilerinin boyutsal tolerans kontrolünde SKANOPT V serisi optik sistemler kullanılabilir."
    },
    "rst ölcü kontrol": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Endüstriyel seviye sensörleri, flowmetreler ve otomasyon enstrümanları üretmektedir. Transmiter flanşları, sensör koruma kılıfları ve bağlantı vidalarının boyutsal kontrollerinde SKANOPT V serisi kullanılabilir."
    },
    "rumeli makina": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Otomotiv ve makine sanayi için hassas döküm ve dövme parçaların CNC makinelerinde işlenmesini yapmaktadır. İşlenen şaftlar, rotorlar ve otomotiv aksamlarının çap, boy ve salgı tolerans kontrolü için SKANOPT VR serisi uygundur."
    },
    "sami trafo": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Kuru ve yağlı tip dağıtım transformatörleri üretmektedir. Trafo çıkış baraları ve metal şasi parçalarının boyutsal kontrollerinde SKANOPT V serisi kullanılabilir."
    },
    "servomotions": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Endüstriyel servo motor ve servo sürücülerin onarım, bobinaj ve geri besleme cihazı kalibrasyon hizmetlerini vermektedir. Tamir edilen servo motorların şaft salgı ve boyutsal tolerans kontrolünde SKANOPT VR serisi kullanılabilir."
    },
    "simpa elektrik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Bara izolatörleri, busbar destek blokları ve sigorta altlıkları üretmektedir. İzolatörlerin montaj vida delikleri ve metal terminal yuvalarının boyutsal kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "siskon endüstriyel": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Fabrika otomasyon sistemleri, SCADA ve endüstriyel haberleşme hatları kurmaktadır. Kurdukları montaj hatlarındaki parça doğrulama ve hat sonu kalite kontrol istasyonlarında PLC haberleşmeli SKANOPT optik modüllerini kullanabilir."
    },
    "softbox robotik": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Robotik süreç otomasyonu (RPA) ve yazılım robotları sunmaktadır. SKANOPT kalite raporlama verilerinin ERP sistemlerine otomatik işlenmesi için RPA robotları entegre edilebilir."
    },
    "suptek yag keceleri": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "Döner mil yağ keçeleri, hidrolik-pnömatik sızdırmazlık elemanları ve o-ringler üretmektedir. Sızdırmazlık keçelerinin metal gövde çapları, kauçuk dudak geometrileri ve iç/dış çap ölçümlerinde temassız SKANOPT V serisi kullanılabilir."
    },
    "tbloc elektrik": {
        "sektor": "Plastik Enjeksiyon & Kalıp",
        "not": "DIN rayı klemensleri, klemens etiketleri ve elektrik bağlantı aksesuarları üretmektedir. Klemenslerin metal iletken barlarının büküm açıları ve plastik gövde tırnak ölçülerinin montaj öncesi kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "tekpan": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Elektrik panoları, server kabinleri ve endüstriyel sac muhafazalar üretmektedir. Panoların kilit delik eksenleri, sac büküm açıları ve menteşe bağlantı yuvalarının boyutsal kontrolü için SKANOPT V/H serisi kullanılabilir."
    },
    "tek transformatör": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "Güç ve dağıtım trafoları üretmektedir. Trafo bakır baralarının büküm açıları ve bağlantı deliklerinin boyutsal kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "terbay makina": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "İş makineleri, tarım makineleri ve otomotiv için ağır kaynaklı ve talaşlı imalat parçaları üretmektedir. Kaynak sonrası işlenen akslar, bağlantı flanşları ve rulman yuvalarının boyutsal kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "tescom elektronik": {
        "sektor": "Makine / Endüstriyel Parça",
        "not": "UPS (Kesintisiz Güç Kaynağı), statik transfer anahtarları ve invertörler üretmektedir. Cihaz içi soğutucu fan flanşları ve metal kabin büküm toleranslarının kalite kontrolünde SKANOPT V serisi kullanılabilir."
    },
    "tural-erdeniz makina": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "CNC takım tutucuları, torna aynası aparatları ve hassas makine yedek parçaları üretmektedir. Takım tutucuların konik şaft çapları, salgıları (runout) ve boyutsal tolerans doğrulamalarında SKANOPT VR serisi (360° döner tabla) mükemmel sonuç verir."
    },
    "uzman makina metal": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Sac metal şekillendirme, progresif kalıp imalatı ve metal pres parçaları üretmektedir. Preslenen küçük metal parçaların, terminallerin ve yaylı pimlerin boy, büküm açıisi ve delik çapı kalite kontrolünde SKANOPT V serisi kullanılır."
    },
    "wipelot teknoloji": {
        "sektor": "Otomasyon & Robot Entegratör",
        "not": "Fabrika içi RTLS (Gerçek Zamanlı Konum Belirleme) ve personel/ekipman takip sistemleri üretmektedir. Fabrika içi parça lojistik hareketleriyle entegre çalışan akıllı kalite kontrol istasyonlarında optik veri entegrasyonu için iş birliği yapılabilir."
    },
    "zet redüktör": {
        "sektor": "Hassas Talaşlı İmalat / Metal",
        "not": "Endüstriyel redüktörler ve dişli çarklar üretmektedir. Dişli çarkların diş adımı, dış çapı, diş yüksekliği ve salgı tolerans kontrolünde 360° döner tablalı SKANOPT VR serisi kullanılabilir."
    }
}

# Update leads array
updated_count = 0
for lead in leads:
    name_key = lead['firma_ismi'].lower().strip()
    
    # Check for direct or partial match
    matched = False
    for profile_name, data in tr_profiles.items():
        if profile_name in name_key or name_key in profile_name:
            lead['sektor'] = data['sektor']
            lead['not'] = data['not']
            matched = True
            updated_count += 1
            break
            
    # For international/global companies, apply cleaner and more descriptive heuristics
    if not matched:
        name_lower = lead['firma_ismi'].lower()
        web_lower = lead['web_sitesi_linki'].lower()
        
        if any(w in name_lower or w in web_lower for w in ['robot', 'automation', 'otomasyon', 'integrat', 'entegratör', 'control', 'kontrol', 'vision', 'görüntü']):
            lead['sektor'] = "Otomasyon & Robot Entegratör"
            lead['not'] = f"{lead['firma_ismi']}, robotik entegrasyon, fabrika otomasyonu ve hat içi izleme sistemleri kurmaktadır. Marka bağımsız PLC ve robot (Stäubli, uFactory vb.) haberleşme protokollerine sahip olan SKANOPT telesentrik optik ölçüm modüllerini, hat sonu kalite kontrol veya pick-and-place parça doğrulama projelerine entegre edebilir."
        elif any(w in name_lower or w in web_lower for w in ['implant', 'dental', 'medical', 'medikal', 'needle', 'iðne', 'iðnesi']):
            lead['sektor'] = "Medikal Cihaz & Dental İmplant"
            lead['not'] = f"{lead['firma_ismi']}, cerrahi tıbbi cihazlar, diş implantları veya medikal iğneler üretmektedir. Titanyum implant vidalarının adımı, yiv boyları, çapı ve tıbbi iğnelerin kesim ucu açısının temassız kontrolü için nanometre çözünürlük sunan SKANOPT VRE dikey ölçüm serisi kalite laboratuvarlarına konumlandırılabilir."
        elif any(w in name_lower or w in web_lower for w in ['plastic', 'plastik', 'mould', 'mold', 'kalýp', 'enjeksiyon', 'injection']):
            lead['sektor'] = "Plastik Enjeksiyon & Kalıp"
            lead['not'] = f"{lead['firma_ismi']}, hassas plastik enjeksiyon bileşenleri, konektör soketleri ve kalıp aparatları üretmektedir. Enjeksiyon sonrasında plastik geçme tırnaklarının, dairesel dişlilerin boyutsal ölçümü ve kalıp çekme payı doğrulaması için SKANOPT V/H serisi telesentrik optik sistemler kullanılabilir."
        elif any(w in name_lower or w in web_lower for w in ['screw', 'bolt', 'fastener', 'cývata', 'vida', 'somun', 'turn', 'turned', 'cnc', 'machin', 'talaþlý', 'forging', 'casting', 'döküm', 'dövme', 'metal', 'precision', 'hassas', 'valve', 'gear', 'shaft', 'rot', 'piston']):
            lead['sektor'] = "Hassas Talaşlı İmalat / Metal"
            lead['not'] = f"{lead['firma_ismi']}, CNC otomat torna tezgahlarında hassas metal miller, cıvatalar, pimler, burçlar ve vanalar üretmektedir. Millerin ve vidaların diş adımı, boy, kafa yüksekliği, salgı (runout) ve boyutsal çap toleranslarını 0.4 saniyede ölçebilen ve torna ünitesine otomatik aşınma telafisi (wear offset) besleyen SKANOPT V/VR serisine ihtiyaç duymaktadır."
        else:
            lead['sektor'] = "Makine / Hassas Parça İmalatı"
            lead['not'] = f"{lead['firma_ismi']}, endüstriyel makine bileşenleri ve özel tasarım hassas parçalar üretmektedir. Hassas parçaların dış çap, boy, pah kırımı, salgı, dairesellik ve delik ekseni gibi kritik geometrik özelliklerin kalite kontrolü ve raporlanması için SKANOPT optik test sistemleri kullanılabilir."

# Save back to leads.json
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(leads, f, ensure_ascii=False, indent=4)

print(f"Successfully enriched {updated_count} Turkish leads and updated global ones.")
