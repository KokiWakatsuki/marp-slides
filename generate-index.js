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
    return `
        <a href="${slidePath}" class="slide-card">
            <h3>${slideName}</h3>
            <p>クリックしてスライドを見る</p>
        </a>
    `;
}).join('');

// ページ全体のHTMLコンテンツ
const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スライド一覧</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #4a4a4a;
            --secondary-color: #7a7a7a;
            --bg-color: #f4f4f9;
            --card-bg-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }
        body {
            margin: 0;
            font-family: 'Noto Sans JP', sans-serif;
            background-color: var(--bg-color);
            color: var(--primary-color);
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        header {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 3rem;
            text-align: center;
        }
        .icon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            box-shadow: 0 4px 15px var(--shadow-color);
        }
        header h1 {
            font-size: 2.5rem;
            margin: 0;
            font-weight: 700;
        }
        .slide-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        .slide-card {
            background-color: var(--card-bg-color);
            border-radius: 10px;
            padding: 1.5rem;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 4px 15px var(--shadow-color);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .slide-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px var(--shadow-color);
        }
        .slide-card h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.2rem;
            color: var(--primary-color);
        }
        .slide-card p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--secondary-color);
        }
        footer {
            text-align: center;
            margin-top: 4rem;
            padding: 1rem;
            color: var(--secondary-color);
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <img src="./assets/icon.png" alt="アイコン" class="icon">
            <h1>Slides</h1>
        </header>

        <main>
            <div class="slide-grid">
                ${slideCards}
            </div>
        </main>

        <footer>
            <p>&copy; ${new Date().getFullYear()} Your Name or Project Name. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
`;

// index.htmlを書き出す
fs.writeFileSync(indexFile, htmlContent);

console.log('Styled index.html has been generated successfully.');