const fs = require('fs');
const path = require('path');

const slidesDir = 'slides'; // スライドが格納されているディレクトリ
const outputDir = 'dist';   // 出力先ディレクトリ
const indexFile = path.join(outputDir, 'index.html');

// 出力先ディレクトリがなければ作成
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// slidesディレクトリから.mdファイルの一覧を取得
const slideFiles = fs.readdirSync(slidesDir).filter(file => file.endsWith('.md'));

// HTMLのリスト項目を生成
const listItems = slideFiles.map(file => {
    const slideName = path.basename(file, '.md');
    // .mdの拡張子を.htmlに変更したパス
    const slidePath = `./slides/${slideName}.html`;
    return `<li><a href="${slidePath}">${slideName}</a></li>`;
}).join('\n');

// トップページのHTMLコンテンツ
const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スライド一覧</title>
    <style>
        body { font-family: sans-serif; padding: 2em; }
        ul { list-style: none; padding: 0; }
        li { margin: 1em 0; }
        a { text-decoration: none; font-size: 1.2em; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>スライド一覧</h1>
    <ul>
        ${listItems}
    </ul>
</body>
</html>
`;

// index.htmlを書き出す
fs.writeFileSync(indexFile, htmlContent);

console.log('index.html has been generated successfully.');