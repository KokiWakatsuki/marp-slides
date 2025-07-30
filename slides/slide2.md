---
marp: true
theme: default
paginate: true
backgroundColor: #f8f9fa
color: #2c3e50
style: |
  section {
    font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
  }
  h1 {
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    border-bottom: 3px solid #ffd700;
    padding-bottom: 10px;
    font-size: 2.5em;
    text-align: center;
  }
  h2 {
    color: #ffd700;
    border-left: 5px solid #ffd700;
    padding-left: 15px;
    font-size: 1.8em;
    display: flex;
    align-items: center;
  }
  h3 {
    color: #87ceeb;
    font-size: 1.4em;
  }
  .icon-text {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  .big-number {
    font-size: 4em;
    color: #ffd700;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  .problem-box {
    background: rgba(255,107,107,0.2);
    padding: 25px;
    border-radius: 15px;
    border-left: 8px solid #ff6b6b;
    margin: 20px 0;
    font-size: 1.2em;
  }
  .solution-box {
    background: rgba(78,205,196,0.2);
    padding: 25px;
    border-radius: 15px;
    border-left: 8px solid #4ecdc4;
    margin: 20px 0;
    font-size: 1.2em;
  }
  .highlight-box {
    background: rgba(255,215,0,0.3);
    padding: 20px;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
    font-size: 1.3em;
    margin: 20px 0;
  }
  img {
    max-width: 75%;
    max-height: 45vh;
    object-fit: contain;
    margin: 15px auto;
    display: block;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.4);
  }
  .center {
    text-align: center;
  }
  .large-text {
    font-size: 1.4em;
    line-height: 1.6;
  }
  ul {
    font-size: 1.2em;
    line-height: 2;
  }
  li {
    margin-bottom: 10px;
  }
  .flow-arrow {
    text-align: center;
    font-size: 3em;
    color: #ffd700;
    margin: 20px 0;
  }
---

# 新規問題作成AI「問ジェネ」
## 高校入試対策の革新的ソリューション

---

## 📖 　今日お話しすること

<div class="center">

## 1️⃣ 　塾の現場で起きている問題
## 2️⃣ 　AIで解決できること  
## 3️⃣ 　実際に作ってみた結果
## 4️⃣　ビジネスとしての可能性

</div>

---

## 😰 　塾講師の悩み

<div class="problem-box">
<div class="icon-text">
<span style="font-size: 2em;">📚</span>
<span><strong>過去問が足りない！</strong><br>販売されているのは約10年分だけ</span>
</div>
</div>

<div class="problem-box">
<div class="icon-text">
<span style="font-size: 2em;">😵</span>
<span><strong>生徒がやり尽くしてしまう</strong><br>新しい問題がもうない...</span>
</div>
</div>

<div class="problem-box">
<div class="icon-text">
<span style="font-size: 2em;">⏰</span>
<span><strong>問題作成に時間がかかる</strong><br>質の高い問題を作るのは大変</span>
</div>
</div>

---

## 💡 　もしも...

<div class="center">
<div class="big-number">∞</div>
<div class="highlight-box">
無限に問題が作れたら？
</div>
</div>

<div class="flow-arrow">⬇️</div>

<div class="center large-text">
<div class="icon-text">
<span style="font-size: 2em;">🤖</span>
<span><strong>AIが問題を自動生成</strong></span>
</div>
</div>

---

## 🎯 　解決策：AI問題生成システム

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">📖</span>
<span><strong>過去問を学習</strong><br>各高校の傾向を分析</span>
</div>
</div>

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">⚡</span>
<span><strong>瞬時に問題生成</strong><br>必要な分だけ作成可能</span>
</div>
</div>

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">🖨️</span>
<span><strong>PDF出力対応</strong><br>紙に印刷してすぐ使える</span>
</div>
</div>

---

## 🧪 　実際に試してみました

<div class="center">
<div class="highlight-box">
ChatGPTで数学問題を生成
</div>
</div>

<div class="flow-arrow">⬇️</div>

<div class="center large-text">
結果をお見せします！
</div>

---

## 📊 　実験結果 ①：微分問題

![微分問題](../assets/biseki-mondai.png)

<div class="center large-text">
<div class="icon-text">
<span style="font-size: 2em;">✅</span>
<span>高校レベルの適切な問題が生成された</span>
</div>
</div>

---

## 📊 　実験結果 ②：解答付き問題

![微分問題と解答](../assets/biseki-kaitou.png)

<div class="center large-text">
<div class="icon-text">
<span style="font-size: 2em;">✅</span>
<span>詳しい解答プロセスも自動生成</span>
</div>
</div>

---

## 📊 　実験結果 ③：演習問題

![演習問題](../assets/enshu.png)

<div class="center large-text">
<div class="icon-text">
<span style="font-size: 2em;">✅</span>
<span>実際の授業で使えるレベル</span>
</div>
</div>

---

## 📊 　実験結果 ④：増減表問題

![増減表問題](../assets/zougenhyou.png)

<div class="center large-text">
<div class="icon-text">
<span style="font-size: 2em;">✅</span>
<span>複雑な問題形式にも対応</span>
</div>
</div>

---

## 🎉 　実験で分かったこと

<div class="center">
<div class="big-number">👍</div>
</div>

<div class="solution-box center">
<div class="icon-text">
<span style="font-size: 2em;">🎯</span>
<span><strong>技術的に実現可能！</strong></span>
</div>
</div>

<div class="large-text">
<div class="icon-text">
<span style="font-size: 1.5em;">📝</span>
<span>数学的に正確な問題</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">📚</span>
<span>解答プロセスも論理的</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">🎓</span>
<span>高校入試レベルに適合</span>
</div>
</div>

---

## 🏢 　誰に売る？

<div class="center">
<div class="highlight-box">
塾講師の皆さん
</div>
</div>

<div class="large-text">
<div class="icon-text">
<span style="font-size: 1.5em;">🏫</span>
<span>NSG教育研究会</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">🌲</span>
<span>森塾</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">⭐</span>
<span>TOP</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">🌟</span>
<span>Polaris長岡</span>
</div>
</div>

---

## 💰 　どうやって稼ぐ？

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">💼</span>
<span><strong>月額サービス</strong><br>塾向けの問題生成サービス</span>
</div>
</div>

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">💾</span>
<span><strong>問題ストック機能</strong><br>生成した問題を蓄積・再利用</span>
</div>
</div>

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">📖</span>
<span><strong>教材販売</strong><br>蓄積した問題で問題集作成</span>
</div>
</div>

---

## ⚠️ 　課題：お金がかかる

<div class="problem-box center">
<div class="icon-text">
<span style="font-size: 2em;">💸</span>
<span><strong>API料金が高い</strong></span>
</div>
</div>

<div class="flow-arrow">⬇️</div>

<div class="solution-box center">
<div class="icon-text">
<span style="font-size: 2em;">💡</span>
<span><strong>解決策：問題を貯める</strong><br>一度作った問題は再利用</span>
</div>
</div>

---

## ⚠️ 　課題：図が難しい

<div class="problem-box center">
<div class="icon-text">
<span style="font-size: 2em;">📐</span>
<span><strong>図形問題の精度が低い</strong></span>
</div>
</div>

<div class="flow-arrow">⬇️</div>

<div class="solution-box center">
<div class="icon-text">
<span style="font-size: 2em;">🤝</span>
<span><strong>解決策：人間と協力</strong><br>AIが文章、人間が図を作成</span>
</div>
</div>

---

## 🚀 　まずは数学から

<div class="center">
<div class="big-number">📊</div>
<div class="highlight-box">
数学が一番需要がありそう
</div>
</div>

<div class="large-text">
<div class="icon-text">
<span style="font-size: 1.5em;">📈</span>
<span>需要が高い科目</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">✏️</span>
<span>図は講師が描ける</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">🎯</span>
<span>問題パターンが豊富</span>
</div>
</div>

---

## 📈 　期待される効果

<div class="center">
<div class="big-number">🎉</div>
</div>

### 塾講師にとって
<div class="icon-text">
<span style="font-size: 1.5em;">⏰</span>
<span>時間短縮</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">📚</span>
<span>無制限の問題供給</span>
</div>

### 生徒にとって
<div class="icon-text">
<span style="font-size: 1.5em;">💪</span>
<span>豊富な練習機会</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">🎯</span>
<span>入試対策強化</span>
</div>

---

## 🎯 　今後の計画

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">1️⃣</span>
<span><strong>数学プロトタイプ完成</strong></span>
</div>
</div>

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">2️⃣</span>
<span><strong>塾での実証実験</strong></span>
</div>
</div>

<div class="solution-box">
<div class="icon-text">
<span style="font-size: 2em;">3️⃣</span>
<span><strong>他科目への展開</strong></span>
</div>
</div>

---

## 💪 　成功の鍵

<div class="center">
<div class="highlight-box">
塾講師 × AIエンジニア
</div>
</div>

<div class="large-text">
<div class="icon-text">
<span style="font-size: 1.5em;">👨‍🏫</span>
<span>現場を知っている</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">💻</span>
<span>技術力がある</span>
</div>
<div class="icon-text">
<span style="font-size: 1.5em;">🏠</span>
<span>地域に根ざしている</span>
</div>
</div>

---

# 🙏 ありがとうございました

<div class="center">
<div class="big-number">❓</div>
<div class="highlight-box">
ご質問・ご意見をお聞かせください
</div>
</div>

<div class="center large-text" style="margin-top: 40px;">
<strong>新規問題作成AI（BtoB）</strong><br>
〜 教育現場の課題をAIで解決 〜
</div>
