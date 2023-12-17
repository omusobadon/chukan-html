+++
title = "フロントエンドについて（Next.js）"
outputs = ["Reveal"]
+++

# フロントエンド開発
---
### 領域

<img src="./スクショ１.png">

---

## 1.ユーザからのアクセスを処理
---

### 処理の流れ

<img src="./流れ.png">

---

- データベースに格納されるデータの型

 <img src="./DB.png" width="75%">

- ユーザからのアクセス(入力)で受け取る型
```
 export interface OrderPost {
    customer: number;
    product: number; 
    start: string; end: string; 
    num: number;
}
```
---

 - API先を指定してjson形式にコンパイル

 <img src="gazou.png" width="75%">

---

### ご清聴ありがとうございました。
