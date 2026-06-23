import json
import os

json_path = r"C:\Users\GilboTeknik\Desktop\SKANOPT OÖC\fuardan firma bulma\lead_finder\leads.json"

if not os.path.exists(json_path):
    print("leads.json not found!")
    exit(1)

with open(json_path, 'r', encoding='utf-8') as f:
    leads = json.load(f)

# Priority mapping definitions for Turkish companies
tr_priorities = {
    # HIGH PRIORITY (⭐ ⭐ ⭐) - Fasteners, turned parts, shafts, dental implants
    "coskun otomat": ("Yüksek Öncelik", "Ürettiği otomat parçaları (pin, burç, cıvata) telesentrik ölçüm için en ideal ürün grubudur. Çap, boy ve diş hassasiyeti mikron seviyesindedir."),
    "libal makina otomat": ("Yüksek Öncelik", "Hassas bağlantı elemanları, konektörler ve pirinç pinlerin seri üretim kalite kontrolü SKANOPT V serisinin 0.4 saniyelik ölçümü ile kusursuz eşleşir."),
    "motus otomotiv": ("Yüksek Öncelik", "Dövme krank milleri üretmektedir. Krank milleri üzerindeki muylu çapları ve eksenel salgı kontrolü için döner tablalı VR serisi ve uzun parçalar için W serisi doğrudan satılabilecek yüksek değerli ürünlerdir."),
    "pemaks pnömatik": ("Yüksek Öncelik", "Pnömatik silindir milleri ve piston başları üretir. Millerin dış çap toleransı ve dişli uçlarının salgı ölçümü telesentrik ölçüm için kritik bir kullanım senaryosudur."),
    "tural-erdeniz makina": ("Yüksek Öncelik", "Hassas CNC takım tutucuları ve makine yedek parçaları üretir. Konik şaftların çap ve salgı kontrolü için döner tablalı VR serisi mükemmel bir satış adayıdır."),
    "uzman makina metal": ("Yüksek Öncelik", "Hassas metal pres terminalleri ve yaylı pimler üretir. Bu küçük parçaların boy, açı ve eksen kontrolü en hızlı optik olarak (V serisi) yapılabilir."),
    "zet redüktör": ("Yüksek Öncelik", "Dişli çarklar üretmektedir. Dişli çarkların diş yüksekliği, adımı ve dairesellik (salgı) kontrolü SKANOPT VR serisi için doğrudan bir satış fırsatıdır."),
    "hid-tek makina": ("Yüksek Öncelik", "Pnömatik silindir milleri ve bağlantı elemanları üretir. Silindir millerinin dış çap ve boy kontrolü için optik ölçüm çok uygundur."),
    "bass olcme enstrumanlari": ("Yüksek Öncelik", "Debimetre flanş parçaları ve hassas metal gövde parçaları üretmektedir. Bağlantı delikleri ve flanş çaplarının kontrolünde SKANOPT V serisi öne çıkar."),
    "haci ayvaz": ("Yüksek Öncelik", "Metal hortum rakor uçları, vana milleri ve bağlantı flanşları üretmektedir. Diş açılmış metal rakorların kontrolü için V serisi idealdir."),
    "kuzu flex": ("Yüksek Öncelik", "Hortum bağlantı rakorları ve vana parçaları üretmektedir. Diş adımı, diş açısı ve çap kontrolü telesentrik sistemlerimiz için birebirdir."),
    "k.y.s. kürkcüoglu": ("Yüksek Öncelik", "Döküm rulman yatakları ve pik parçalar üretmektedir. Rulman iç yuvasının dairesellik ve flanş ölçümlerinde SKANOPT V/VR serisi kullanılabilir."),
    "makim makina": ("Yüksek Öncelik", "Hassas döküm parçalar ve turnike milleri üretmektedir. Millerin boy ve çap tolerans kontrolü için V serisi uygundur."),
    "makisan makine": ("Yüksek Öncelik", "Pirinç gaz vanaları üretmektedir. Pirinç vanaların diş profili ve sızdırmazlık yüzey açılarının hassas ölçümünde SKANOPT VR serisi kullanılır."),
    "ortaklar hidrolik": ("Yüksek Öncelik", "Hidrolik silindir milleri üretmektedir. Krom kaplı millerin dış çap toleransları ve boylarının hassas doğrulanmasında VR/W serisi kullanılır."),
    "rumeli makina": ("Yüksek Öncelik", "CNC makinede işlenmiş döküm otomotiv parçaları üretir. Şaftlar, rotorlar ve miller için SKANOPT VR serisi çok uygundur."),
    "akoðlu otomotiv": ("Yüksek Öncelik", "Otomotiv süspansiyon rotları, akslar ve direksiyon milleri üretmektedir. Millerin çap, salgı ve boy doğrulamalarında SKANOPT VR serisi kullanılır."),

    # MEDIUM PRIORITY (⭐ ⭐) - Plastic injection, heavy assemblies, custom sensors/electronics
    "ortaclar elektrik": ("Orta Öncelik", "Plastik ve pirinç kablo rakorları üretmektedir. Plastik enjeksiyon kalıplarından çıkan dişlilerin ve rakor dişlerinin tolerans doğrulamaları için uygundur."),
    "basoglu kablo": ("Orta Öncelik", "Beyaz eşya silikon contaları ve profilleri üretmektedir. Ekstrüzyon hattından çıkan contaların kesit geometrisi doğrulamalarında SKANOPT V serisi kullanılabilir."),
    "cks kablo tasiyici": ("Orta Öncelik", "Plastik enjeksiyon kablo taşıyıcı zincirler üretmektedir. Zincir baklalarının boyutsal çekme payı ve pim yuvalarının doğrulanması için uygundur."),
    "terbay makina": ("Orta Öncelik", "İş makineleri için kaynaklı ve işlenmiş çelik flanş yuvaları üretmektedir. Talaşlı işleme sonrası delik eksenleri ve flanş çaplarının kontrolünde kullanılabilir."),
    "ege dinamik": ("Orta Öncelik", "Vidalı mil yatakları ve lineer aktüatör milleri üretmektedir. Aktüatör millerinin dış çap ve kama yuvası kontrolleri için SKANOPT VR serisi uygundur."),
    "asartech arge": ("Orta Öncelik", "Mikrodalga filtre ve alüminyum savunma sanayi kutuları üretmektedir. Kutuların montaj pinleri ve konnektör bacaklarının mikron altı kontrolü için VRE serisi önerilir."),
    "demsay elektronik": ("Orta Öncelik", "PCB dizgi ve elektronik montaj yapmaktadır. Konektör pin bacaklarının yükseklik ve büküm doğruluğunun temassız optik kontrolünde kullanılabilir."),
    "fego elektrik": ("Orta Öncelik", "Klemens yayları ve raylar üretmektedir. Bükümlü metal klemens yaylarının açıları ve vida yivlerinin doğrulanmasında SKANOPT V serisi kullanılabilir."),
    "grup arge": ("Orta Öncelik", "Enerji analizörü plastik gövdeleri ve terminalleri üretmektedir. Plastik geçmeli kapakların boyutsal kontrolü için kullanılabilir."),
    "europhia elektrik": ("Orta Öncelik", "Pirinç kablo rakorları ve conduit aksesuarları üretmektedir. Diş boyutu ve vida adımı doğrulamalarında SKANOPT V serisi kullanılabilir."),
    "ezt elektrik": ("Orta Öncelik", "Loadcell çelik sensör gövdeleri üretmektedir. Gerinim kanalları ve montaj deliklerinin boyutsal tolerans kontrolünde kullanılabilir."),
    "simpa elektrik": ("Orta Öncelik", "Busbar destek izolatörleri üretmektedir. İzolasyon gövdelerindeki montaj vida delikleri ve terminal yuvaları kontrolünde kullanılabilir."),
    "tbloc elektrik": ("Orta Öncelik", "DIN rayı klemensleri üretmektedir. Metal iletken barların büküm açıları ve plastik gövde ölçüleri kontrolünde kullanılabilir."),
    "demaş makina": ("Orta Öncelik", "Somun diş açma makineleri üretir. Diş açılan somunların iç diş adımı ve vida çaplarının laboratuvarda ara kontrolünde kullanılabilir."),
    "mentpack makina": ("Orta Öncelik", "Paketleme makineleri üretmektedir. Makinelerin şaft milleri ve çekici çarklarının boyutsal doğrulamalarında kullanılabilir."),

    # LOW PRIORITY (⭐) - Switchgears, panels, cables, software/incubator, transformers
    "aktif elektroteknik": ("Düşük Öncelik", "Büyük sac metal hücre ve pano üretmektedir. Parçalar büyük olduğu için telesentrik sensör alanımızın dışındadır, sadece baralar ve küçük sac parçalar için kullanılabilir."),
    "aksa process engineering": ("Düşük Öncelik", "Büyük manyetik ayırıcılar ve metal dedektörler üretmektedir. Büyük kaynaklı şasiler ürettiği için telesentrik optik cihazımıza uygun parça sayısı azdır."),
    "ari drones teknoloji": ("Düşük Öncelik", "Drone ve İHA üretmektedir. Çok spesifik karbon gövde parçaları ve küçük motor şaftları dışında seri ölçüm ihtiyacı düşüktür."),
    "armtek elektrik": ("Düşük Öncelik", "Büyük güç trafoları üretmektedir. Trafo parçaları büyük ve ağır olduğundan tezgah üstü optik cihazlarımıza uygunluğu düşüktür."),
    "atce enerji otomasyon": ("Düşük Öncelik", "Büyük elektrik panoları sac imalatı yapmaktadır. Parça boyutları büyüktür, sadece bara büküm kontrollerinde kullanılabilir."),
    "beta enerji": ("Düşük Öncelik", "Güç ve dağıtım trafoları üretmektedir. Büyük bakır baralar dışında seri mikron-toleranslı parça üretimi azdır."),
    "dekta mühendislik": ("Düşük Öncelik", "Endüstriyel çadır ve çelik konstrüksiyon yapmaktadır. Optik mikron seviyesi boyutsal ölçüm ihtiyacı neredeyse yoktur."),
    "edit elektronik": ("Düşük Öncelik", "UPS ve regülatör üretmektedir. Pano içi şasiler ve trafo sargıları telesentrik ölçüme uygun değildir."),
    "egin etiket": ("Düşük Öncelik", "Endüstriyel metal etiketler üretmektedir. Dış kontur, boy ve çap ölçümü yapılabilir ancak katma değeri düşüktür."),
    "enel enerji": ("Düşük Öncelik", "UPS ve inverter üretmektedir. Alüminyum heatsink soğutucu kanalları dışında seri küçük parça ölçümü azdır."),
    "energoin trafo": ("Düşük Öncelik", "Güç trafoları üretmektedir. Büyük bakır baralar dışında seri dairesel/hassas mil ölçümü azdır."),
    "entes elektronik": ("Düşük Öncelik", "Enerji analizörleri üretmektedir. Küçük plastik klemens vidaları dışında telesentrik sistem ihtiyacı azdır."),
    "eran kablo": ("Düşük Öncelik", "Tesisat kabloları üretmektedir. Kablo dış çapı hat üstü lazer mikrometrelerle ölçüldüğünden masaüstü optik cihaz gereksinimi azdır."),
    "hydrogenix": ("Düşük Öncelik", "Yarı iletken benzeri yakıt hücresi plakaları geliştirmektedir. Boyutsal kontrol yapılabilir ancak pazar hacmi henüz düşüktür."),
    "kürkcüoglu jeneratör": ("Düşük Öncelik", "Jeneratör kabinleri üretmektedir. Büyük sac büküm parçaları telesentrik görüş alanımızın çok üstündedir."),
    "mak celik": ("Düşük Öncelik", "Sac profil satışı ve ağır konstrüksiyon yapmaktadır. Mikron seviyesinde seri parça kalite kontrol ihtiyacı düşüktür."),
    "sami trafo": ("Düşük Öncelik", "Trafo üretmektedir. Büyük bakır baralar dışında telesentrik ölçüm ihtiyacı çok düşüktür."),
    "tek transformatör": ("Düşük Öncelik", "Güç trafoları üretmektedir. Ağır ve büyük bakır baralar optik test sistemimize uygun değildir."),
    "tescom elektronik": ("Düşük Öncelik", "Kesintisiz güç kaynakları üretmektedir. Sac kabin parçaları ve elektronik kartlar dışında parça kontrol ihtiyacı azdır."),
    "wipelot teknoloji": ("Düşük Öncelik", "Fabrika içi personel ve ekipman takip sistemleri üretmektedir. Fiziksel parça üreticisi değildir, RFID/RTLS yazılım/donanımı yapar."),

    # SYSTEM INTEGRATORS / PARTNERS (🤖) - Build systems for others, potential partners
    "cobro robot": ("Sistem Entegratörü", "Robotlu hatlar ve cobot sistemleri entegre etmektedir. Kalite kontrol projelerinde SKANOPT çok eksenli telesentrik optik modüllerini kullanarak iş birliği yapabilir."),
    "eurobotik otomasyon": ("Sistem Entegratörü", "Yapay görme ve kamera kontrol sistemleri yapmaktadır. Optik ölçüm modüllerimizi kendi görüntü işleme projelerinde kullanarak sistem ortağımız olabilir."),
    "entes elektronik": ("Orta Öncelik", "Endüstriyel cihaz imalatı yapar. Kendi montaj hatlarında ara kalite kontrol için kullanabilir."),
    "siskon endüstriyel": ("Sistem Entegratörü", "Fabrika otomasyonu ve MES entegratörüdür. Kurduğu otomotiv/beyaz eşya hatlarına SKANOPT ölçüm modüllerini dahil edebilir."),
    "softbox robotik": ("Sistem Entegratörü", "RPA ve yazılım otomasyonu yapar. SKANOPT kalite ölçüm verilerini fabrikaların ERP sistemlerine bağlamak için entegrasyon ortağı olabilir."),
    "wipelot teknoloji": ("Düşük Öncelik", "RTLS takip sistemleri yapar. Endüstriyel takip projelerinde lojistik ve kalite kontrolün birleştirilmesinde iş birliği yapılabilir."),
    "bosphorus endüstriyel": ("Sistem Entegratörü", "MES (Üretim Yönetim Sistemleri) yazılımları geliştirir. Kalite kontrol verilerimizin MES sistemlerine akması için yazılım entegrasyon ortağı olabilir."),
    "dataguess teknoloji": ("Sistem Entegratörü", "Yapay zeka tabanlı görüntü işleme yazılımları geliştirir. SKANOPT optik donanımları üzerine özel yazılım algoritmaları geliştirme adayıdır."),
    "noya dijital": ("Sistem Entegratörü", "Endüstriyel PC ve ekran üretmektedir. Cihazlarımızın yanında verilecek olan endüstriyel panel PC ihtiyaçlarında potansiyel tedarikçimizdir."),
}

# Update leads with detailed priorities and reasons
updated_count = 0
for lead in leads:
    name_key = lead['firma_ismi'].lower().strip()
    
    # 1. Check Turkish mapping
    matched = False
    for profile_name, priority_data in tr_priorities.items():
        if profile_name in name_key or name_key in profile_name:
            lead['oncelik'] = priority_data[0]
            lead['oncelik_gerekcesi'] = priority_data[1]
            matched = True
            updated_count += 1
            break
            
    # 2. Check Global/International heuristics
    if not matched:
        sector = lead['sektor']
        if sector == "Medikal Cihaz & Dental İmplant":
            lead['oncelik'] = "Yüksek Öncelik"
            lead['oncelik_gerekcesi'] = "Dental implantlar ve medikal iğneler mikron altı toleranslara sahip olup, telesentrik optik sistemler (özellikle VRE serisi) için en yüksek satış potansiyeline sahiptir."
        elif sector == "Hassas Talaşlı İmalat / Metal":
            lead['oncelik'] = "Yüksek Öncelik"
            lead['oncelik_gerekcesi'] = "Seri üretilen cıvata, vida, somun, pin, mil ve supap gibi torna/CNC parçaları, SKANOPT V/VR serisinin temassız 0.4 sn hızlı ölçüm ve CNC aşınma telafisi için mükemmel bir satış eşleşmesidir."
        elif sector == "Plastik Enjeksiyon & Kalıp":
            lead['oncelik'] = "Orta Öncelik"
            lead['oncelik_gerekcesi'] = "Plastik enjeksiyon dişliler, soketler ve kalıp çekme payı boyutsal kontrolleri optik olarak doğrulanabilir. CMM'e kıyasla hızlıdır ancak parça karmaşıklığına göre ek ölçüm gerektirebilir."
        elif sector == "Otomasyon & Robot Entegratör":
            lead['oncelik'] = "Sistem Entegratörü"
            lead['oncelik_gerekcesi'] = "Doğrudan cihaz satın almaz ancak beyaz eşya ve otomotiv hatlarına kurduğu robotik/otomasyon hücrelerinde SKANOPT çok eksenli telesentrik optik sensör modüllerini entegre ederek kanal ortaklığı sağlar."
        else:
            lead['oncelik'] = "Düşük Öncelik"
            lead['oncelik_gerekcesi'] = "Ürünleri büyük boyutlu sac panolar, ağır şasiler veya kablolar olup, telesentrik görüş alanımızın dışındadır veya seri mikron-seviyeli parça sayısı azdır."

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(leads, f, ensure_ascii=False, indent=4)

print(f"Successfully applied priorities and reasons to {len(leads)} leads.")
