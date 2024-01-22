+++
title = "Nextjsフロントエンド開発"
outputs = ["Reveal"]
+++

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
