# GitHub Pages'e yükleme

Bu paket GitHub Pages için **repo köküne** açılacak şekilde hazırlanmıştır.

## Doğru dosya yapısı

Repository ana ekranında doğrudan şunları görmelisiniz:

- `index.html`
- `.nojekyll`
- `assets/`
- `README.md`
- `SOURCES.md`

`index.html` dosyası `sakura-derma/` gibi ekstra bir klasörün içinde olmamalıdır.

## Yayınlama

1. Yeni/boş GitHub repository oluşturun.
2. Bu ZIP'in **içindeki dosyaları** repository köküne yükleyin.
3. GitHub'da `Settings > Pages` bölümüne gidin.
4. `Source`: **Deploy from a branch** seçin.
5. Branch: **main**, Folder: **/(root)** seçin ve Save'e basın.
6. GitHub'ın verdiği Pages adresini açın.

## Eski sürüm görünüyorsa

Tarayıcıda hard refresh uygulayın (`Ctrl+Shift+R` / macOS: `Cmd+Shift+R`). Bu build CSS/JS dosyalarına `v=1.2.0-r5` önbellek kırıcı parametre ekler.
