+++
title = "オムそば丼予約システム"
outputs = ["Reveal"]
+++

## オムそば丼予約システム基盤

---

### オムそば丼予約システムとは？

---

{{% section %}}

## 全体設計

<img src="./オムそば丼予約システム.png" />

---

開発環境

1. 予約サイト(フロントエンド)

   - Node.js(v20.11.0 LTS)

2. ダッシュボード(フロントエンド)

   - Node.js

3. 予約システム(バックエンド)

   - Go(v1.21.5)
   - Supabase(データベース)

{{% /section %}}

---

### 似たようなサービスとの違いについて

- ほかにやっている人がいなかった。
- 有料または OSS ではない
- CMS であるということ（WordPress など...）

---

{{% section %}}

## 実装環境について

<img src="./基本設計書.png"/>

---

- コントローラーノード：\
  3 ノード\
  （クラスタの管理と制御面、ロードバランサー MetalLB を担当）
- ワーカーノード：\
  3 ノード\
  （実際のアプリケーションワークロード実行）

{{% /section %}}

---

## Kubernetes とは

- Kubernetes は、コンテナオーケストレーションシステムです。
- コンテナのデプロイメント、スケーリング、管理を自動化します。

---

## k0s とは？

- k0s は、Team Lens がコミュニティと協力して作った Kubernetes の軽量ディストリビューションです。
- k3s に続く軽量な Kubernetes 実装であり機能的に柔軟です。
- 必要ない機能を排除し、軽量性を保ちリソースの制約と必要機能を考慮

---

{{% section %}}

## 選定理由

1. Kubernetes が Docker デーモンを  
非推奨にしている。
2. リソース問題

---

- 当初は k8s の使用を考えていました。
- しかし、実装環境でのリソース不足により問題が発生。

クラッシュ、Pod が OOM Killer によりリスタートを繰り返すなど\
最悪の場合サーバー自体が再起動

---

## 結果

<img src="./k8s.png" alt="比較１" width="100%" height="150"  />

メモリの使用率が軽くなっている

↓

<img src="./k0s.png" alt="比較２" width="100%" height="150" />

{{% /section %}}

---

## Podman について

---

## 選定理由

Go_APIServer を Kubernetes に移植する際に  
kube.yaml を一緒に作ってくれる

---

移植する際の kube.yaml

![Alt text](image-3.png)

---

## 使用例

---

コンテナイメージ作る
![Alt text](image-4.png)

---

kube.yaml

![Alt text](image-3.png)

---

Pod 起動

```bash
kubectl apply -f kube.yaml
```

Pod が起動している
![Alt text](image-5.png)

---

次はバックエンドの梅屋からの説明です。

---

## APIサーバ構築

---

{{% section %}}

### 1. APIサーバについて
- WebサーバとDB間での処理
- 実際に予約処理を行う  
（DBに接続し、情報の取得や書き込み行う）
- 情報をWebサーバに受け渡して表示させる

---

#### APIサーバの動作イメージ

<img src="kousei.png" width="100%">

{{% /section %}}

---

### 2. API処理の主な内容

- 予約処理  
（在庫情報のGET、注文情報のPOST）

- 予約管理  
（予約の終了、キャンセル処理）

- 在庫管理  
（在庫情報の更新・挿入・削除）

- スケジュール管理  
（予約の終了時刻を監視）

---

{{% section %}}

### 3. DBについて
- Postgresを使用
- DBとの接続にはPrismaを使用
- 正規化を意識して設計

---

#### ER図の概略  

<img src="ER_gai.png" height="100%">

---

#### リレーショナル例　概略

<img src="relation_example1.png" height="100%">

---

#### リレーショナル例

<img src="relation_example2.png" height="100%">

{{% /section %}}

---

{{% section %}}

### 4. 予約処理の流れ
1. サーバがリクエストを待ち受ける
2. 商品情報を取得
3. 注文を受け取ったら処理
4. 処理の結果をレスポンスで返す

---

### 4-1. リクエスト待機
- URLでアクセスされたときに処理を開始
- 例）  
在庫情報の取得：/get_stock  
注文を送信：/post_order

<img src="kousei1.png" width="100%">

---

### 4-2. 商品情報の取得
1. ユーザが商品ページにアクセス
2. WebサーバがAPIサーバにリクエストを送信
3. APIサーバがDBにアクセスして情報を取得
4. 順にレスポンスを返す

<img src="kousei2.png" width="100%">

---

### 4-3. 注文処理
1. ユーザが注文情報を送信
2. WebサーバがAPIサーバにリクエストを送信
3. APIサーバがDBとやりとりして注文できるか確認

<img src="kousei3.png" width="100%">

---

### 4-4. 注文結果のレスポンス
1. 注文できる場合は注文情報を登録
2. 順にレスポンスを返す

<img src="kousei4.png" width="100%">

{{% /section %}}

---

{{% section %}}

### 5. 予約処理結果
- 実際の予約処理を行った結果を示す
- リクエストの送信のためPostmanを使用  
（HTTPリクエストの送信とそれに対するレスポンスを受信できるソフトウェア）

---

### 5-1. 商品情報の取得
- /get にアクセスして商品情報を取得
- 例）Stockテーブルの価格ID=1の情報を取得
　　/get_stock?price_id=1

<img src="get_example.png" width="60%">

---

### 5-2. 注文の送信
- /post_orderに注文情報を送信
- 例）車の予約を想定した注文

```json
{
    "customer_id": 1, // Customer（顧客情報）テーブルID
    "start_at": "2024-01-17T09:00:00+09:00", // 予約開始時刻
    "end_at": "2024-01-17T18:00:00+09:00", // 予約終了時刻
    "remark": "text", // 備考
    "detail": [ // 注文詳細情報
        {
        "stock_id": 1, // Stock（在庫情報）テーブルID
        "qty": 1 // 数量
        }
    ]
}
```

---

### 5-3. 注文結果のレスポンス
- /post_orderに送信後、レスポンスが返される
- 成功時  
メッセージ、リクエスト内容  
登録された注文情報
- 失敗時  
メッセージ、リクエスト内容

---

#### 成功時  

<img src="res_success1.png" width="50%"><img src="res_success2.png" width="50%">

---

#### 失敗時

<img src="res_failure.png" width="60%">

{{% /section %}}

---

### 6. 実演

---

### 7. 制作を通じて
- HTTPを使用した処理について知れた
- システム開発について知れた
- 汎用的な設計が難しい
- フロント（Webサーバ）との連携が難しい

---

次はフロントエンドの石川からの説明です。

---

# フロントエンド開発

---

### 予約の流れ

<img src="Stream.png" />


---

## データの送受信

---

{{% section %}}

### バックエンドへデータ送信

<img  src="json-post-all.png" class="popap"/>

---

```
{
        "customer_id": 1,
        "start_at": "2024-01-23T10:00:00+09:00",
        "end_at": "2024-01-25T11:00:00+09:00",
        "remark": "返却は新宿",
        "detail": [
            {
                "stock_id": 3,
                "qty": 1
            }
        ]
    }
```

{{% /section %}}

---

### バックエンドからデータ受信

<img src="json-get-all.png" />

---

## ユーザ登録

---

### ログイン画面

<img src="login-main.png" />

---

### ユーザ登録の流れ

<img src="Register.png" />

---

### ユーザ登録時の認証の流れ

<img src="Omusobadon-Auth.png" />

---

## デモ画面の表示

---

## 質疑応答
