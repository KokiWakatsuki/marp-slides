const fs = require('fs');
const path = require('path');

const slidesDir = 'slides';
const assetsDir = 'assets';
const outputDir = 'dist';
const indexFile = path.join(outputDir, 'index.html');

// --- ディレクトリの準備 ---
// 出力先とアセットディレクトリがなければ作成
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
const outputAssetsDir = path.join(outputDir, assetsDir);
if (!fs.existsSync(outputAssetsDir)) fs.mkdirSync(outputAssetsDir);

// アセットファイルを dist/assets にコピー
if (fs.existsSync(assetsDir)) {
    fs.readdirSync(assetsDir).forEach(file => {
        fs.copyFileSync(path.join(assetsDir, file), path.join(outputAssetsDir, file));
    });
}

// --- HTMLとCSSの生成 ---
// スライドファイルの一覧からカードHTMLを生成
const slideFiles = fs.readdirSync(slidesDir).filter(file => file.endsWith('.md'));

const slideCards = slideFiles.map(file => {
    const slideName = path.basename(file, '.md');
    const slidePath = `./slides/${slideName}.html`;
    const imageUrl = `./assets/${slideName}.png`;
    
    // マークダウンファイルを読み込む
    const fileContent = fs.readFileSync(path.join(slidesDir, file), 'utf-8');
    const lines = fileContent.split('\n');
    
    let title = slideName; // デフォルトはファイル名
    let description = "クリックしてスライドの詳細をご覧ください";
    let date = "";
    let contentStartIndex = 0;

    // --- と --- で囲まれたフロントマターを解析
    if (lines[0] && lines[0].trim() === '---') {
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                contentStartIndex = i + 1;
                break;
            }
            const matchTitle = lines[i].match(/^title:\s*"(.*?)"/);
            const matchDate = lines[i].match(/^date:\s*"(.*?)"/);
            const matchDescription = lines[i].match(/^description:\s*"(.*?)"/);
            if (matchTitle) title = matchTitle[1];
            if (matchDate) date = matchDate[1];
            if (matchDescription) description = matchDescription[1];
        }
    }

    // ★修正点: フロントマターにタイトルがなければ、本文の最初のH1 (`# `) を探す
    if (title === slideName) {
        for (let i = contentStartIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('# ')) {
                title = line.substring(2).trim();
                break; // 最初のH1を見つけたらループを抜ける
            }
        }
    }
    
    // カードのHTMLを生成
    return `
        <div class="slide-card" onclick="window.location.href='${slidePath}'">
          <div class="slide-image-container">
            <img
              src="${imageUrl}"
              alt="${title}"
              class="slide-image"
              onerror="this.style.display='none'; this.parentElement.style.backgroundColor='#e0e0e0';"
            />
          </div>
          <div class="slide-content">
            <h3 class="slide-title">${title}</h3>
            ${date ? `<p class="slide-date">${date}</p>` : ''}
            <p class="slide-description">${description}</p>
            <div class="slide-meta">
              <a href="${slidePath}" class="slide-button">
                <i class="fas fa-external-link-alt"></i> 閲覧する
              </a>
            </div>
          </div>
        </div>
    `;
}).join('');


// ページ全体のHTMLコンテンツ
const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スライドコレクション</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
        /* --- Base and Resets --- */
        html { line-height: 1.5; font-family: 'ui-sans-serif', 'system-ui', sans-serif; }
        body { margin: 0; background-color: #fefce8; font-family: 'sans-serif'; color: #374151; }
        body.loading { overflow: hidden; }

        /* --- Animations --- */
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        /* ★修正点: ローディングアニメーションをシンプル化 */
        .loader-overlay { position: fixed; inset: 0; background-color: #fefce8; display: flex; align-items: center; justify-content: center; z-index: 50; }
        .loader-spin { width: 4rem; height: 4rem; border: 5px solid #d97706; border-top-color: transparent; border-radius: 9999px; animation: spin 1s linear infinite; }

        /* --- Header --- */
        .header { background-color: rgba(146, 64, 14, 0.8); color: #fefce8; padding: 1.5rem 2rem; backdrop-filter: blur(4px); position: sticky; top: 0; z-index: 10; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header-content { max-width: 80rem; margin: auto; display: flex; flex-direction: column; align-items: center; justify-content: space-between; }
        .header-profile { display: flex; align-items: center; margin-bottom: 1rem; }
        .header-icon-wrapper { width: 4rem; height: 4rem; border-radius: 9999px; overflow: hidden; border: 2px solid #fde68a; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-right: 1rem; }
        .header-icon { width: 100%; height: 100%; object-fit: cover; }
        .header h1 { font-size: 1.5rem; font-family: serif; font-weight: 700; margin: 0; }
        .header .date { color: #fde68a; font-size: 0.875rem; margin: 0; }

        @media (min-width: 768px) {
            .header-content { flex-direction: row; }
            .header-profile { margin-bottom: 0; }
        }

        /* --- Main Content --- */
        .main-content { max-width: 80rem; margin: auto; padding: 3rem 1rem; }
        .main-intro { text-align: center; margin-bottom: 3rem; }
        .main-intro h2 { font-size: 2.25rem; font-family: serif; font-weight: 700; color: #78350f; margin-bottom: 1rem; }
        .main-intro p { color: #92400e; max-width: 42rem; margin: auto; }

        /* --- Slide Grid --- */
        .slide-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 768px) { .slide-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .slide-grid { grid-template-columns: repeat(3, 1fr); } }

        /* --- Slide Card --- */
        .slide-card { background-color: white; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: all 0.3s ease-in-out; border: 1px solid #fef3c7; cursor: pointer; }
        .slide-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transform: translateY(-4px); }
        .slide-image-container { height: 12rem; overflow: hidden; background-color: #f0f0f0; }
        .slide-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .slide-card:hover .slide-image { transform: scale(1.05); }
        .slide-content { padding: 1.5rem; border-top: 1px solid #fef3c7; }
        .slide-title { font-size: 1.25rem; font-weight: 700; color: #78350f; margin-top: 0; margin-bottom: 0.5rem; }
        .slide-date { font-size: 0.875rem; color: #b45309; margin-bottom: 0.75rem; }
        .slide-description { margin-bottom: 1rem; color: #374151; font-size: 1rem; }
        .slide-meta { display: flex; justify-content: flex-end; align-items: center; }
        .slide-button { background-color: #b45309; color: #fefce8; padding: 0.25rem 0.75rem; font-size: 0.875rem; border-radius: 9999px; transition: background-color 0.3s; display: flex; align-items: center; text-decoration: none; white-space: nowrap; }
        .slide-button:hover { background-color: #92400e; }
        .slide-button i { margin-right: 0.25rem; }
        
        /* --- Footer --- */
        .footer { background-color: #78350f; color: #fef3c7; padding: 2rem 1rem; margin-top: 4rem; }
        .footer-content { max-width: 80rem; margin: auto; display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 768px) { .footer-content { grid-template-columns: repeat(2, 1fr); } }
        .footer h3 { font-size: 1.25rem; font-family: serif; font-weight: 700; margin-bottom: 1rem; }
        .footer p { margin-bottom: 1rem; }
        .footer .social-links { display: flex; gap: 1rem; }
        .footer .social-links a, .footer .contact-link { color: #fde68a; transition: color 0.3s; text-decoration: none; }
        .footer .social-links a:hover, .footer .contact-link:hover { color: white; }
        .footer .social-links i { font-size: 1.25rem; }
        .footer-bottom { max-width: 80rem; margin: 2rem auto 0; padding-top: 1.5rem; border-top: 1px solid #92400e; text-align: center; font-size: 0.875rem; }

        /* --- Scroll-to-Top Button --- */
        .scroll-top-button { position: fixed; bottom: 1.5rem; right: 1.5rem; background-color: #b45309; color: #fefce8; width: 3rem; height: 3rem; border-radius: 9999px; display: none; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: opacity 0.3s, transform 0.3s; cursor: pointer; border: none; opacity: 0; transform: translateY(10px); }
        .scroll-top-button.visible { display: flex; opacity: 1; transform: translateY(0); }
        .scroll-top-button:hover { background-color: #92400e; }
    </style>
</head>
<body class="loading">

    <div id="loader" class="loader-overlay">
      <div class="loader-spin"></div>
    </div>

    <header class="header">
      <div class="header-content">
        <div class="header-profile">
          <div class="header-icon-wrapper">
            <img src="./assets/icon.png" alt="プロフィールアイコン" class="header-icon" />
          </div>
          <div>
            <h1>スライドコレクション</h1>
            <p id="formatted-date" class="date"></p>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="main-intro">
        <h2>スライドコレクション</h2>
        <p>これまでに作成したプレゼンテーションスライドのコレクションです</p>
      </div>

      <div class="slide-grid">
        ${slideCards}
      </div>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div>
          <h3>スライドコレクション</h3>
          <p>スライドのコレクションサイトです</p>
          <div class="social-links">
            <a href="https://x.com/koki_wakatsuki" aria-label="X"><i class="fab fa-x-twitter"></i></a>
            <a href="https://github.com/KokiWakatsuki" aria-label="GitHub"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <div>
          <h3>お問い合わせ</h3>
          <p>ご質問やフィードバックがありましたら，お気軽にご連絡ください</p>
          <a href="mailto:02.k.wakatsuki@gmail.com" class="contact-link">02.k.wakatsuki@gmail.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} スライドコレクション. All rights reserved.</p>
      </div>
    </footer>

    <button id="scroll-top-button" class="scroll-top-button" aria-label="トップに戻る">
      <i class="fas fa-arrow-up"></i>
    </button>
    
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        // --- ローディングアニメーション ---
        const loader = document.getElementById('loader');
        setTimeout(() => {
          if (loader) {
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => loader.remove(), 500);
          }
        }, 1500);

        // --- 現在の日付表示 ---
        const formattedDateEl = document.getElementById('formatted-date');
        if (formattedDateEl){
            const currentDate = new Date("2025-06-16");
            formattedDateEl.textContent = currentDate.toLocaleDateString("ja-JP", {
                year: "numeric", month: "long", day: "numeric", weekday: "long",
            });
        }
        
        // --- スクロールトップボタン ---
        const scrollTopButton = document.getElementById('scroll-top-button');
        if (scrollTopButton) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopButton.classList.add('visible');
                } else {
                    scrollTopButton.classList.remove('visible');
                }
            });
            scrollTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
      });
    </script>
</body>
</html>
`;

// index.htmlを書き出す
fs.writeFileSync(indexFile, htmlContent, 'utf-8');

console.log('Styled index.html based on React component has been generated successfully.');