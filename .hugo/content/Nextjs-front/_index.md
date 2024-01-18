+++
title = "Nextjsフロントエンド開発"
outputs = ["Reveal"]
+++

## オムそば丼予約システム
## フロントエンド開発
---
#### 予約の流れ
<img src="Stream.png" />

---
{{% section %}}
#### バックエンドへデータ送信
<img src="from-post.png" />

---
```cd
{
        "customer_id": 1,
        "start_at": "2024-01-23T10:00:00+09:00",
        "end_at": "2024-01-25T11:00:00+09:00",
        "remark": "新宿から新宿",
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

#### バックエンドからデータ受信

<img src="json-get.png" />

---

#### ユーザ登録

<img src="login-main.png" />

---

#### ユーザ登録の流れ

<img src="Register.png" />

---
#### ユーザ登録時の認証の流れ

<img src="Omusobadon-Auth.png" />

---
## サンプル画面の表示

 <!--実際に構築したのものを実践-->