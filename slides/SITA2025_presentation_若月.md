---
marp: true
theme: academic-tml
paginate: true
math: katex
---

<!-- _class: lead -->
# GraphVAEを用いたSlackチャットログに基づく<br>組織構造再構成に関する研究
### Dynamic Communication Structure Simulation Using Organizational Structure-Conditioned Graph VAE

若月耕紀・雲居玄道
長岡技術科学大学

SITA2025 | November 25-28, 2025

---

<!-- _header: 研究の背景 -->

## チャットツールがもたらす新たな可能性

企業内コミュニケーションのデータ化が進展 📊

- **従来**: 社員間の関係性を定量的に評価
- **課題**: クラスタリングによる現状把握のみ
- **限界**: 組織をどう変革すべきかの指針が不明

<div class="bubble">
現状分析だけでなく、将来の方向性を示唆する手法が必要
</div>

---

<!-- _header: 従来研究の課題 -->

## 既存手法の限界

<div class="two-columns">
  <div class="column">
    
### ソーシャルネットワーク分析 (SNA)
- 静的な構造分析に限定
- 動的変化を捉えられない
- 属性情報の活用が困難

### 構造的空隙理論 (Burt, 2005)
- ブローカーの重要性を指摘
- 静的分析に留まる

  </div>
  <div class="column">
    
### データ駆動型組織分析
- 現状分析と予測に限定
- 変革指針の提示は困難

<div class="bubble">
⚠️ 組織デザインへの具体的<br>アプローチが不足
</div>

  </div>
</div>

---

<!-- _header: 本研究のアプローチ -->

## 提案：GraphVAEの応用

<span class="marker">Variational Autoencoder</span>による組織構造の埋め込みと生成

### 主要な特徴
- ✅ **再構成可能**: ノード・エッジ属性を保持
- ✅ **動的シミュレーション**: 組織変化の予測
- ✅ **潜在空間の操作**: 理想状態への経路を提示

$$
\text{現状の組織} \xrightarrow{\text{Encoder}} z \xrightarrow{\text{Decoder}} \text{理想の組織}
$$

---

<!-- _header: GraphVAEの基本構造 -->

## モデルアーキテクチャ

グラフ表現: $G = (A, E, F)$

<small>

- **$A$**: 隣接行列（接続情報）
- **$E$**: エッジ属性テンソル（会話量）
- **$F$**: ノード属性行列（役職・学年）

</small>

#### エンコーダ $q_\phi(z|G)$
Edge-Conditioned Convolution (ECC) によるグラフ畳み込み → 潜在変数 $z$ へ圧縮
<br>
#### デコーダ $p_\theta(G|z)$
多層パーセプトロン → 完全結合グラフを一度に出力

---

<!-- _header: 提案手法の革新性 -->

## 条件付きGraphVAE

従来の分子構造生成を<span class="marker">コミュニケーショングラフ</span>に応用

### 新規要素: アテンション機構の導入

$$
\text{Query: } Q = zW_Q \quad \text{(潜在変数)}
$$
$$
\text{Key/Value: } K = FW_K, \, V = FW_V \quad \text{(役割行列)}
$$

$$
H = \sum_{i=1}^N \frac{\exp(Q \cdot K_i)}{\sum_k \exp(Q \cdot K_k)} V_i
$$

→ グラフ全体の構造と各ノードの役割を動的に融合

---

<!-- _header: 提案手法の革新性 -->

## データの再解釈

<div class="two-columns">
  <div class="column">
    
### 従来（分子構造）
- **ノード**: 原子の種類
- **エッジ**: 化学結合の種類
- **目的**: 新規分子の生成

  </div>
  <div class="column">
    
### 本研究（組織）
- **ノード**: メンバーの学年・役職
- **エッジ**: コミュニケーション量
- **目的**: 組織変革のシミュレーション

  </div>
</div>

<div class="bubble">
属性情報を保持した組織構造の動的生成を実現
</div>

---

<!-- _header: 損失関数 -->

## 学習の最適化

変分下界の最大化:

$$
\mathcal{L} = \mathcal{L}_{\text{rec}} + \beta \cdot \mathcal{L}_{\text{KL}}
$$

### 再構成損失
$$
\mathcal{L}_{\text{rec}} = \lambda_A \cdot \mathcal{L}_A + \lambda_F \cdot \mathcal{L}_F + \lambda_E \cdot \mathcal{L}_E
$$

- $\mathcal{L}_A$: 隣接行列の再構成（Binary Cross-Entropy）
- $\mathcal{L}_F$: ノード属性の再構成（Categorical Cross-Entropy）
- $\mathcal{L}_E$: エッジ属性の再構成（Categorical Cross-Entropy）

実験設定: $\lambda_A = 10.0, \lambda_F = 1.0, \lambda_E = 10.0, \beta = 1.0$

---

<!-- _header: 実験設定 -->

## データセットと実験環境

### データ
学生団体のSlackチャットログ（2019-2023年）

<small>

- **グラフ数**: 28個
- **ノード数**: 2〜19名
- **ノード属性**: 7種類（B1, B2, B3, B4, M1, M2, 卒業生）
- **エッジ属性**: 3段階の密度（低・中・高）


### モデル設定
<!-- - エンコーダ: 4層グラフ畳み込み（隠れ層256）
- デコーダ: 4ヘッドマルチアテンション + MLP -->
- 潜在次元: $d_z = 2$
- 学習: Adam（$\eta = 5 \times 10^{-5}$, 2000エポック）

</small>

---

<!-- _header: 実験結果：潜在空間 -->

## 組織構造の可視化

<div class="two-columns">
  <div class="column">
    
![w:500](../assets/visualization_placeholder.png)

  </div>
  <div class="column">
    
- 類似した組織が近接して配置 ✅
- 異なる年度の組織も<br>構造的類似性で配置
- 2次元空間での解釈可能な<br>埋め込み

<div class="bubble">
潜在空間が組織構造の特性を<br>効果的に捉えている
</div>

  </div>
</div>

---

<!-- _header: 実験結果：構造遷移 -->

## グリッド再構成による動的変化

### リーダー交代のシミュレーション

<div class="two-columns">
  <div class="column">
    
![w:450](../assets/grid_reconstruction_1.png)

  </div>
  <div class="column">
    
左下（B4中心の中央集権構造）<br>
↓<br>
右上（B3中心の双権構造）

<span class="marker">リーダーの役割が滑らかに移行</span>する様子を<br>可視化

  </div>
</div>

---

<!-- _header: 実験結果：構造遷移 -->

## グリッド再構成の詳細（リーダー交代）

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
table td {
  width: 33.33%;
  text-align: center;
  vertical-align: top;
  padding: 10px;
}
</style>

<table>
<tr>
<td>

![w:280](../assets/grid1-0.png)

(0,0)：B4中心の中央集権

</td>
<td>

![w:280](../assets/grid1-1.png)

(1,3)：移行過程

</td>
<td>

![w:280](../assets/grid1-2.png)

(4,4)：B3中心の双権構造

</td>
</tr>
</table>

---

<!-- _header: 実験結果：構造遷移 -->

## コミュニケーション密度の変化

### 疎な構造から密な構造へ

<div class="two-columns">
  <div class="column">
    
![w:450](../assets/grid_reconstruction_2.png)

  </div>
  <div class="column">
    
左下（疎な構造）<br>
↓<br>
右上（密な構造）

メンバー間の<span class="marker">横のつながりが段階的に増加</span>

  </div>
</div>

---

<!-- _header: 実験結果：構造遷移 -->

## グリッド再構成の詳細（密度変化）

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
table td {
  width: 33.33%;
  text-align: center;
  vertical-align: top;
  padding: 10px;
}
</style>

<table>
<tr>
<td>

![w:280](../assets/grid2-0.png)

(0,0)：疎な構造

</td>
<td>

![w:280](../assets/grid2-1.png)

(4,2)：移行過程

</td>
<td>

![w:280](../assets/grid2-2.png)

(4,4)：密な構造

</td>
</tr>
</table>

---

<!-- _header: 考察 -->

## 潜在空間の解釈可能性

### 従来手法との比較

<div class="two-columns">
  <div class="column">
    
**静的分析（SNA, クラスタリング）**
- ✓ 現状把握（As-Is）
- ✗ 変革指針の欠如
- ✗ 動的変化の予測困難

  </div>
  <div class="column">
    
**提案手法（条件付きGraphVAE）**
- ✓ 現状把握（As-Is）
- ✓ <span class="marker">変革シミュレーション（What-if）</span>
- ✓ 具体的アクションプランの導出

  </div>
</div>

<div class="bubble">
データ駆動型組織デザインへの新たなアプローチ
</div>

---

<!-- _header: 考察 -->

## アテンション機構の効果

### なぜアテンションが重要か？

従来の条件付けはラベルベクトル（スカラー）のみ
→ 詳細な役割情報を活用できない

提案手法は役割行列（行列）をアテンション機構で融合
→ <span class="marker">各ノードの役割を文脈的に考慮</span>

$$
\text{潜在変数 } z \text{（グラフ全体の構造）} + \text{役割行列 } F \text{（個別の役割）}
$$

これにより、リーダー交代などの役割ベースの構造変化を捉えることが可能に 🎯

---

<!-- _header: 研究の限界 -->

## 今後の課題

<small>

### データの制約
- 単一の学生団体に限定 → 企業組織での検証が必要
- Slackログのみ → オフライン会議の考慮が不足 💬

### モデルの拡張性
- 学年情報（7種類）のみ → より複雑な役割のモデル化
- 会話量の3段階分類 → コミュニケーションの質の考慮

### 評価指標
- 生成グラフの「質」や「妥当性」の定量評価が不十分 📊

</small>

---

<!-- _header: まとめ -->

## 本研究の貢献

### 技術的貢献

<small>

1. **条件付きGraphVAE**の提案
   - アテンション機構による役割情報の統合
   - コミュニケーショングラフへの応用

2. **解釈可能な潜在空間**の獲得
   - 組織構造の特性を反映
   - 連続的な構造遷移のシミュレーション

</small>

### 経営工学的貢献
データ駆動型組織デザインの実現可能性を示唆
現状分析 → <span class="marker">変革のWhat-ifシナリオ</span> → 具体的指針

---

<!-- _header: 今後の展望 -->

## Future Work

<small>

### 短期的目標 ⏱️
- 企業組織データでの検証
- 定量的評価指標の確立
- より複雑な役割情報のモデル化

### 長期的ビジョン 🎯
- 管理者が理想の組織を探索
- 変革へのステップを自動提示

</small>

<div class="bubble">
組織マネジメントの新たなツールとしての実用化を目指す
</div>

---

<!-- _header: 謝辞 -->

## Acknowledgments

本研究にご協力いただいた学生団体の皆様に感謝申し上げます

### 参考文献
> - 野中ほか (2023) "グラフ埋め込み手法に基づく従業員のビジネスコミュニケーション分析" 情報処理学会論文誌
> - Simonovsky & Komodakis (2018) "GraphVAE: Towards generation of small graphs using variational autoencoders" ICANN
> - Burt (2005) "Brokerage and Closure: An Introduction to Social Capital" Oxford University Press
> - Vaswani et al. (2017) "Attention is all you need" NIPS

---

<!-- _class: lead -->

# ご清聴ありがとうございました

### 質問をお待ちしております

**Contact**
若月耕紀
s233331@stn.nagaokaut.ac.jp

長岡技術科学大学
機械学習理論研究室
