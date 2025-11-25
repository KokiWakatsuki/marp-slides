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


### 近年，企業内のコミュニケーションのデータ化が急速に進展
- Slack，Microsoft Teamsなどの普及
- 社員間の関係性を定量的に評価できるようになった

### 従来手法では...
- **従来**: クラスタリングによる分析で組織構造の把握はできる
- **課題**: 組織をどのように変革すべきかという具体的な指針を得ることが困難

### 本研究
<div class="bubble">
現状分析だけでなく，将来の方向性を示唆する手法が必要
</div>

---

<!-- _header: 従来研究の課題 -->

<div class="two-columns">
  <div class="column">

### ソーシャルネットワーク分析（SNA）
- 静的な構造分析に限定され，
時間経過に伴う
動的変化を捉えられない
- メンバーの役割などの
属性情報の活用が困難

### 構造的空隙理論（Burt, 2005）
- ブローカーとして機能する
人物の重要性を指摘
- 静的分析に留まる

### 

  </div>
  <div class="column">

### データ駆動型組織分析（Pentland, 2012）
- センサーデータによる
現状分析・将来予測は可能
- 変革指針の提示は困難

### 従来研究
<div class="bubble">
組織デザインへの具体的<br>アプローチが不足している
</div>

  </div>
</div>

---

<!-- _header: 本研究のアプローチ -->

<span class="marker">Graph Variational Autoencoder（GraphVAE）</span>を応用する
- グラフ構造を連続的な潜在空間に埋め込み，<br>新しいグラフを生成できる深層生成モデル
- 従来は分子構造の生成に用いられていた

### 主要な特徴
1.  **再構成が可能**: ノードやエッジの属性を保持したままグラフを再現
2.  **動的シミュレーション**: 構造の変化をモデルが予測し，シミュレートできる
3. **潜在空間の操作**: 現在の構造から理想構造への経路を具体的に提示

$$
\text{現状の構造} \xrightarrow{\text{Encoder}} 潜在空間 z \xrightarrow{\text{Decoder}} \text{理想の構造}
$$

---

<!-- _header: GraphVAEの基本構造 -->
<small>

### グラフの表現方法: $G = (A, E, F)$

1. **$A$**: 隣接行列（接続情報）
2. **$E$**: エッジ属性テンソル（結合の種類：単結合，二重結合，三重結合）
3. **$F$**: ノード属性行列（原子の種類：炭素，窒素，酸素など）

### エンコーダ $q_\phi(z|G)$
- グラフ畳み込みで潜在変数 $z$ へ圧縮
- ECC（Edge-Conditioned Convolution）

### デコーダ $p_\theta(G|z)$
- 潜在変数 $z$ からグラフを再構成
- MLP（多層パーセプトロン）

</small>

---

<!-- _header: 提案手法（グラフの表現方法について） -->

従来の分子構造生成を<span class="marker">コミュニケーショングラフ</span>に応用

<div class="two-columns">
  <div class="column">
    
### 従来のGraphVAE
- **目的**: 分子構造の生成
- **ノード$F$**: 原子の種類
  - 炭素や窒素，酸素など
- **エッジ$E$**: 結合の種類
  - 単結合，二重結合，三重結合
### 

  </div>
  <div class="column">
    
### 本研究でのアプローチ
- **目的**: 組織変革のシミュレーション
- **ノード$F$**: メンバーの学年
  - 学部1年生 ~ 卒業生まで
- **エッジ$E$**: コミュニケーションの量
  - 3段階に分類
###

  </div>
</div>

---

<!-- _header: 組織構造グラフの例 -->

<div class="two-columns">
  <div class="column">

### 隣接行列 $A$（接続情報）

<small>

|     | 2 | 3 | 7 | 1 | 0 | 5 | 6 | 4 |
|-----|---|---|---|---|---|---|---|---|
| **2** | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| **3** | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 |
| **7** | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 |
| **1** | 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
| **0** | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 |
| **5** | 0 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |
| **6** | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 |
| **4** | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 |

</small>

  </div>
  <div class="column">

### ノード属性行列 $F$（学年情報）

<small>

| ID | B1 | B2 | B3 | B4 | M1 | M2 | 卒 |
|----|----|----|----|----|----|----|-----|
| **0** | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| **1** | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| **2** | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| **3** | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| **4** | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| **5** | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| **6** | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| **7** | 0 | 0 | 0 | 1 | 0 | 0 | 0 |

</small>

  </div>
</div>

### エッジ属性テンソル $E$（コミュニケーション量）
3次元テンソル（ノード × ノード × コミュニケーション回数）のため非表示

---

<!-- _header: 組織構造グラフの例（可視化） -->

![center w:600](../assets/sample.png)

---

<!-- _header: 条件付きGraphVAE：ラベル$y$について -->

### ラベル $y$ の役割：生成するグラフの**特性を制御する条件情報**

<small>

<div class="two-columns">
  <div class="column">

### 従来の分子生成
- **ラベル**: 原子の種類ごとの数（ベクトル）
- 例: $y = [7, 1, 1, 0]$
  - 炭素7，窒素1，酸素1，フッ素0
- **目的**: 条件を満たす分子構造の生成
- **ポイント**: 炭素はどの炭素でも一緒

  </div>
  <div class="column">

### 本研究での応用
- **ラベル**: 役割行列 $F$（全メンバーの属性）
- **目的**: 構成と順番を満たす組織構造の生成
- **順番を知ることで，各個人を判定できる**
  - 役割が同じでも，対応する個人は異なる
  - より詳細な情報を保持する必要がある

  </div>
</div>

</small>

<div class="bubble">
条件付けにより，ランダムな生成ではなく，<br>特定の特性を持つグラフを制御的に生成することができる
</div>

---

<!-- _header: 潜在変数$z$と行列の融合について --> 

### 新規要素: アテンション機構の導入

**従来のGraphVAE**: ラベルベクトル $y$ と潜在変数$z$を連結して，条件づけ

**本研究**: 役割行列 $F$ と潜在変数$z$を**アテンション機構**で融合

$$
\text{Query: } Q = zW_Q \quad \text{(潜在変数 = グラフ全体の構造)}
$$
$$
\text{Key/Value: } K = FW_K, \, V = FW_V \quad \text{(役割行列 = 個別の役割)}
$$

$$
重み付き和　H = \sum_{i=1}^N \frac{\exp(Q \cdot K_i)}{\sum_k \exp(Q \cdot K_k)} V_i
$$

<div class="bubble">
グラフ全体の構造と各ノードの役割を動的に融合することで<br>組織構造の文脈を考慮した生成が可能
</div>

---

<!-- _header: 提案手法（まとめ） -->

<div class="two-columns">
  <div class="column">
    
### 従来のGraphVAE
- **目的**: 分子構造の生成
- **ノード$F$**: 原子の種類
  - 炭素や窒素，酸素など
- **エッジ$E$**: 結合の種類
  - 単結合，二重結合，三重結合
- **条件**: ベクトル$y$
### 

  </div>
  <div class="column">
    
### 本研究でのアプローチ
- **目的**: 組織変革のシミュレーション
- **ノード$F$**: メンバーの学年
  - 学部1年生 ~ 卒業生まで
- **エッジ$E$**: コミュニケーションの量
  - 3段階に分類
- **条件**: 役割行列$F$
###

  </div>
</div>

<div class="bubble">
属性情報を保持した組織構造の動的生成を実現
</div>

---

<!-- _header: 損失関数 -->

### 損失関数: **再構成損失とKLダイバージェンスの損失の和**

$$
\mathcal{L} = \mathcal{L}_{\text{rec}} + \beta \cdot \mathcal{L}_{\text{KL}}
$$

### 再構成損失
$$
\mathcal{L}_{\text{rec}} = \lambda_A \cdot \mathcal{L}_A + \lambda_F \cdot \mathcal{L}_F + \lambda_E \cdot \mathcal{L}_E
$$

- $\mathcal{L}_A$: 隣接行列の再構成損失（Binary Cross-Entropy）
- $\mathcal{L}_F$: ノード属性の再構成損失（Categorical Cross-Entropy）
- $\mathcal{L}_E$: エッジ属性の再構成損失（Categorical Cross-Entropy）

実験設定: $\lambda_A = 10.0, \lambda_F = 1.0, \lambda_E = 10.0, \beta = 1.0$

---

<!-- _header: 実験設定 -->

###  データ：**学生団体のSlackチャットログ（2019-2023年）**

- **グラフ数**: 28個
- **ノード数**: 2〜19名
- **ノード属性**: 7種類（B1, B2, B3, B4, M1, M2, 卒業生）
- **エッジ属性**: 3段階の密度
  - **低**: 1〜9回/年，**中**: 10〜99回/年，**高**: 100回以上/年

### モデル設定
- **潜在空間の次元数**: $d_z = 2$（可視化と解釈可能性を重視）
- **学習**: Adamオプティマイザ（学習率：$\eta = 5 \times 10^{-5}$, エポック数：2000）

---

<!-- _header: 実験結果：潜在空間 -->
    
![center w:780](../assets/visualization_placeholder.png)

---

<!-- _header: 実験結果：潜在空間の具体例 -->
    
### 左側の2点について詳しく見る（ほぼ同じ位置）

![center w:700](../assets/z-topleft.png)

---

<!-- _header: 実験結果：潜在空間の具体例 -->

<small>

- どちらもリーダー・サブリーダーが存在し，双権構造である
- 学年の偏りがほぼない
- 類似性が高い

</small>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
table td {
  width: 50%;
  text-align: center;
  vertical-align: top;
  padding: 10px;
}
</style>

<table>
<tr>
<td>

![w:400](../assets/topleft-1.png)

</td>
<td>

![w:400](../assets/topleft-2.png)

</td>
</tr>
</table>

---

<!-- _header: 実験結果：潜在空間の具体例 -->
    
### 中央の2点について詳しく見る（縦軸は非常に近いが，横軸では距離がある）

![center w:700](../assets/z-center.png)

---

<!-- _header: 実験結果：潜在空間の具体例 -->

<small>

- 組織構造はどちらも中央集権で同じ構造を持つ

</small>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
table td {
  width: 50%;
  text-align: center;
  vertical-align: top;
  padding: 10px;
}
</style>

<table>
<tr>
<td>

![w:400](../assets/center-1.png)

年齢層が少し高め
エッジが実線で，強固な関係性

</td>
<td>

![w:400](../assets/center-2.png)

全体的に若い
エッジが点線で，薄い関係性

</td>
</tr>
</table>

---

<!-- _header: 実験結果：潜在空間のまとめ -->

<div class="two-columns">
  <div class="column">
    
![w:500](../assets/visualization_placeholder.png)

**28個のグラフを2次元空間に可視化**

  </div>
  <div class="column">
    
<small>

### 観察結果
- 類似した組織が近接して配置
- 異なる年度の組織も<br>構造的類似性で配置
- 組織構造が類似していても<br>属性情報が異なる場合は距離ができる

</small>

<div class="bubble">
潜在空間が組織構造の特性を<br>効果的に捉えている
</div>

  </div>
</div>

---

<!-- _header: 実験結果：構造遷移 -->

<small>

- 潜在空間上の2点間を5×5グリッドで再構成
- (0,0)のノード属性を保持し，(4,4)の組織構造に変化させる

</small>

![center w:600](../assets/grid-read-subread.png)

---

<!-- _header: 実験結果：サブリーダー追加のシミュレーション -->

### 

<style scoped>
.column p, .column strong {
  font-size: 32px;
}
</style>

<div class="two-columns">
  <div class="column">
    
![w:580](../assets/grid_reconstruction_1.png)

  </div>
  <div class="column">
    
**左下(0,0)**: B4中心の中央集権構造<br>
↓<br>
**右上(4,4)**: B3中心の双権構造

<span class="marker">リーダーシップの移行を可視化</span>

  </div>
</div>

---

<!-- _header: 実験結果：サブリーダー追加のシミュレーション -->

<small>

- **左**: B4中心の組織構造
- **中央**: B4からB3へのリーダーシップ移行過程
- **右**: B3中心の組織構造（サブリーダー追加の最適解）

</small>

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

(0,0)：B4中心の構造

</td>
<td>

![w:280](../assets/grid1-1.png)

(1,3)：移行過程

</td>
<td>

![w:280](../assets/grid1-2.png)

(4,4)：B3中心の構造

</td>
</tr>
</table>

---


<!-- _header: 実験結果：構造遷移 -->

<small>

- 潜在空間上の2点間を5×5グリッドで再構成
- (0,0)のノード属性を保持し，(4,4)の組織構造に変化させる（アテンション機構で融合）

</small>

![center w:600](../assets/grid-comu.png)

---

<!-- _header: 実験結果：疎な構造から密な構造へ -->

<style scoped>
.column p, .column strong {
  font-size: 32px;
}
</style>

<div class="two-columns">
  <div class="column">
    
![w:580](../assets/grid_reconstruction_2.png)

  </div>
  <div class="column">
    
**左下(0,0)**: 疎な構造<br>
↓<br>
**右上(4,4)**: 密な構造

メンバーの<span class="marker">横のつながりが段階的に増加</span>

  </div>
</div>

---

<!-- _header: 実験結果：疎な構造から密な構造へ -->

<small>

- **左**: メンバー間のコミュニケーションが限定的
- **中央**: 徐々にコミュニケーションが活発化
- **右**: 多くのメンバー間で活発なコミュニケーション

</small>

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

<!-- _header: 考察：本研究の検証項目 -->
1. **潜在空間の解釈可能性の検証**
   - 学習後の潜在空間が，<span class="marker">組織構造の特性を反映した解釈可能な空間</span>として<br>構造化されているか
2. **構造遷移のシミュレーション**
   - 潜在空間上の2点間を，グリッド状に再構成することで，<br>組織構造の動的な変化過程をシミュレーションできるか

---

<!-- _header: 考察：検証結果 -->

<small>

1. ### 解釈可能な潜在空間を獲得
   - 類似した組織が潜在空間上で近接して配置される傾向を確認
   - 潜在空間が組織構造の特性を効果的に反映している

2. ### 滑らかで意味のある構造遷移を確認
   - 潜在空間上を移動する過程で生成されたグラフは，<br>組織構造が滑らかに，かつ意味のある形で変化する様子を捉えていた

3. ### 具体的な構造変化のシミュレーションが成功
   - サブリーダーの追加
     - B4中心の中央集権 → B3中心の双権構造へ自然に移行
   - コミュニケーション密度
     - 疎な状態 → 密な状態へ段階的に変化

</small>

---

<!-- _header: 考察：なぜそのような結果が得られたか -->

<small>

## アテンション機構による動的融合の効果

**従来の条件付けGraphVAE**
- ラベルベクトル $y$を単純に連結
- 詳細な役割情報を活用できない

**提案手法の革新**
- 役割行列 $F$をアテンション機構で動的に融合
- グラフ全体の大域的情報（$z$）と各ノードの局所的役割情報（$F$）を効果的に結合

$$
\text{潜在変数 } z \text{（グラフ全体の構造）} + \text{役割行列 } F \text{（個別の役割）}
$$

<div class="bubble">
リーダー交代などの，役割ベースの構造変化を捉えることが可能となった
</div>

</small>

---

<!-- _header: 今後の課題 -->
<small>

### データの制約
- 単一の学生団体に限定 → 企業組織での検証が必要
- Slackログに限定 → オフライン会議のような対面でのコミュニケーションへの考慮が不足

### モデルの拡張性
- 7種類の学年情報に限定 → 実際の組織では，より複雑な役割のモデル化が必要
- 会話量を3段階に限定 → コミュニケーションの質や内容まで考慮できていない

### 評価指標
- 生成されたグラフに対する，組織としての「質」や「妥当性」の定量評価が不十分

</small>

---

<!-- _header: まとめ -->

<small>

### 技術的貢献

1. 新たな**条件付きGraphVAE**の提案
   - アテンション機構による役割情報行列の統合により，
   従来のベクトルによる条件付けではなく，行列全体を条件付けに活用
   - 分子構造生成から，コミュニケーショングラフへの応用

2. **解釈可能な潜在空間**の獲得
   - 組織構造の特性を効果的に反映
   - 連続的な構造遷移のシミュレーションの実現

### 経営工学的貢献
1. データ駆動型組織デザインの実現可能性を示した
2. 現状分析にとどまらず，組織変革のシミュレーションに基づく具体的な指針を導出する
新たなアプローチの提示

</small>

---

<!-- _header: 今後の展望 -->
<small>

**短期的な目標** ⏱️
1. 企業組織などの，より多様なデータでの検証を行うことで，
学生団体だけでなく，<span class="marker">実際の企業組織での有効性</span>を確認する
2. 生成されたグラフの妥当性を評価するため，<span class="marker">定量的評価指標を確立する</span>

**長期的な目標** 🎯
1. 管理者が理想の組織を探索できるシステムにする
→ 現在の組織から理想の組織に至るまでの<span class="marker">変革ステップを自動的に提示する</span>システム

</small>

**最終的な目標**
<div class="bubble">
組織マネジメントの実務で活用できる<br>新たな意思決定支援ツールとしての実用化を目指す
</div>

---

<!-- _header: 謝辞 -->

## Acknowledgments

本研究にご協力いただいた学生団体の皆様に感謝申し上げます

### 参考文献
> [1] 賢也野中，遥 山下，豊史三浦，正幸後藤，"グラフ埋め込み手法に基づく従業員のビジネスコミュニケーション分析に関する一考察，" 情報処理学会論文誌，2023．
> [2] M. Simonovsky and N. Komodakis, "GraphVAE: Towards generation of small graphs using variational autoencoders," Proceedings of the 27th International Conference on Artificial Neural Networks (ICANN) Springer, pp.412–422 2018.
> [3] R.S. Burt, Brokerage and Closure: An Introduction to Social Capital, Oxford University Press, Oxford, 2005.
> [4] A. Pentland, "The new science of building great teams," Harvard Business Review, 2012.
> [5] A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A.N. Gomez, L. Kaiser, and I. Polosukhin, "Attention is all you need," Proceedings of the 31st Conference on Neural Information Processing Systems (NIPS), pp.5998–6008, 2017.
> [6] D.P. Kingma and J. Ba, "Adam: A method for stochastic optimization," Proceedings of the 3rd International Conference on Learning Representations (ICLR), 2015.

---

<!-- _class: lead -->

# ご清聴ありがとうございました

### 質問をお待ちしております

**Contact**
若月耕紀
s233331@stn.nagaokaut.ac.jp

長岡技術科学大学
機械学習理論研究室
