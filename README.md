# 中間報告HTML

## メインページとDocsのビルド
モジュールをインストール
```
pnpm install
```
starlightをrelativeURLに対応させる
以下のファイルにアクセス

node_modules\@astrojs\starlight\components\SidebarSublist.astro
```
18行目ぐらい
href=${entry.href}　<--ここ
```
これを以下のように変更
```
href=`${entry.href}index.html`
```
ビルドを開始
```
pnpm build
```

## スライドの編集
slide-content/contentの中に作りたいスライドのフォルダを作成し

フォルダの中に_index.mdを作ります。

_index.mdを編集するとスライドができます

編集のやり方は以下のURLを参照（英語だけど）

https://reveal-hugo.dzello.com/

```
hugo server
```

hugo serverでlocalhost:1313で見ながら編集すると変更がリアルタイムで見れてやりやすいよ

## スライドのビルドのやり方
hugoがインストールされているのが前提条件で以下を実行
ディレクトリを移動
```
cd slide-content/
```
hugoでビルドを開始
```
hugo
```


![オムそば丼キャラ切り抜き](https://github.com/omusobadon/chukan-html/assets/109458504/e259ac1d-4b0f-4a64-9d26-fe1f37ef287c)


