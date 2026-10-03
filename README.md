# Sakura Derma

Dermatoloji asistanları ve uzmanları için bilimsel kaynaklı, statik klinik skorlama hesaplayıcıları.

## İçerik

- PASI — Psoriasis Area and Severity Index
- SALT — Severity of Alopecia Tool
- PDAI — Pemphigus Disease Area Index
- BPDAI — Bullous Pemphigoid Disease Area Index
- EASI — Eczema Area and Severity Index
- SCORAD — SCORing Atopic Dermatitis
- SCORTEN — Severity-of-Illness Score for Toxic Epidermal Necrolysis
- UAS7 — Urticaria Activity Score over 7 days
- IHS4 — International Hidradenitis Suppurativa Severity Score System
- NAPSI — Nail Psoriasis Severity Index

## Yayınlama (GitHub Pages)

1. Bu klasörün içeriğini bir GitHub deposunun köküne yükleyin.
2. GitHub'da **Settings → Pages** bölümünü açın.
3. **Deploy from a branch** seçeneğini kullanın.
4. Branch olarak `main`, klasör olarak `/ (root)` seçin ve kaydedin.
5. Site birkaç dakika içinde yayımlanır.

Build sistemi veya sunucu gerektirmez. `index.html` doğrudan açılabilir.

## Tıbbi uyarı

Bu uygulama eğitim ve klinik dokümantasyon desteği içindir. Tanı, tedavi veya acil klinik değerlendirme yerine geçmez. Özellikle SCORTEN yalnızca prognostik skordur ve SJS/TEN tıbbi acildir.

## Gizlilik

Hesaplamalar tamamen istemci tarafında JavaScript ile yapılır. Uygulama hasta verisi toplamaz veya sunucuya göndermez.


## v1.1.0 arayüz güncellemesi

- Masaüstü sol menüde SCORAD/SCORTEN gibi uzun skor kodları için ayrı kod sütunu ve güvenli metin kırılımı eklendi.
- PASI hesaplayıcısına tıklanabilir insan vücudu haritası eklendi. Baş/boyun, üst ekstremiteler, gövde ve alt ekstremiteler haritadan seçilebilir.
- Girilen bölgesel tutulum yüzdesi anatomik haritada renk yoğunluğu ve yüzde etiketiyle gösterilir; hesaplama formülü değişmemiştir.


## GitHub Pages notu

Bu dağıtımda `index.html` repository kökünde olmalıdır. ZIP dosyasını tek klasör halinde değil, ZIP içeriğini repo köküne çıkararak yükleyin. Ayrıntılar için `DEPLOY_GITHUB_PAGES.md` dosyasına bakın.
