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

## スライドの使い方

https://zatsugaku-engineer.com/static/reveal-js/index.html

## スライドのビルドのやり方
hugoがインストールされているのが前提条件で以下を実行
ディレクトリを移動
```
cd .hugo/
```
hugoでビルドを開始
```
hugo
```