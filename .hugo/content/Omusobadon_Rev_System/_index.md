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

## バックエンド開発
### APIサーバ・DB構築

---

{{% section %}}

### 1. APIサーバについて
- WebサーバとDB間での処理
- 実際に予約処理を行う  
（DBに接続し、情報の取得や書き込み行う）
- 情報をWebサーバに受け渡して表示させる

---

APIサーバの動作イメージ

<img src="str.png" width="100%">

{{% /section %}}

---

### 2. API処理の主な内容

- 予約処理  
（在庫情報の取得・注文）

- 予約管理  
（予約の終了・キャンセル）

- データベース管理  
（情報の更新・挿入・削除）

- スケジュール管理  
（予約の終了時刻を監視）

---

{{% section %}}

### 3. データベースについて
- Postgresを使用
- ORMにはPrisma Go Clientを使用
- 正規化を意識して設計  
（第三正規形）

---

ER図の概略  

<img src="ER_summary.png" height="100%">

---

リレーショナル例　概略

<img src="relation_example1.png" height="100%">

---

リレーショナル例

<img src="relation_example2.png" height="100%">

{{% /section %}}

---

### 4. 予約処理の流れ
1. サーバがリクエストを待ち受ける
2. 商品情報を取得
3. 注文を受け取ったら処理
4. 処理の結果をレスポンスで返す

---

{{% section %}}

### 5. 予約処理の結果
- 実際の予約処理を行った結果を示す
- リクエストの送信のためPostmanを使用  
（リクエストの送信とそのレスポンスを受信できるソフトウェア）

---

### 5-1. リクエスト待機
- URLでアクセスされるまで処理を待機
- URLの例）  
在庫情報の取得：/get_stock  
注文を送信：/post_order

<img src="str1.png" width="100%">

---

### 5-2. 商品情報の取得
- ① ユーザが商品ページにアクセス
- ② WebサーバがAPIサーバにリクエストを送信
- ③ APIサーバがDBにアクセスして情報を取得
- ④⑤ 順にレスポンスを返す

<img src="str2.png" width="100%">

---

GET: /get_stock?price_id=1

<img src="get_stock.png" width="60%">

---

### 5-3. 注文処理の開始
- ① ユーザが注文情報を送信
- ② WebサーバがAPIサーバにリクエストを送信
- ③ APIサーバがDBに注文できるか確認

<img src="str3.png" width="100%">

---

POST: /post_order body

<img src="post_order.png" width="80%">

<!-- ```json
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
``` -->

---

### 5-4. 注文処理
- 注文内容とDBの情報を確認
- DBに情報はあるか？
- 時刻設定は正しいか？
- 在庫数は十分か？　など

---

### 5-5. 処理の終了とレスポンス
- ① 注文できる場合は注文情報を登録
- ②③ 順にレスポンスを返す

<img src="str4.png" width="100%">

---

成功時

<img src="res_success1.png" width="50%"><img src="res_success2.png" width="50%">

---

失敗時

<img src="res_failure.png" width="60%">

{{% /section %}}

---

### 6. 制作を通じて
- HTTPを使用した処理について知れた
- DBの設計について知れた
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
