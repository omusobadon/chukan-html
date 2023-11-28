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
.hugo/contentの中に作りたいスライドのフォルダを作成し

フォルダの中に_index.mdを作ります。

_index.mdを編集するとスライドができます

編集のやり方は以下のURLを参照

https://zatsugaku-engineer.com/static/reveal-js/index.html

vscode-revealってやつ入れると結構やりやすい

![image](https://github.com/omusobadon/chukan-html/assets/109458504/8e775193-7202-43e9-abc8-27769c44c66a)

![image](https://github.com/omusobadon/chukan-html/assets/109458504/9ccaaea4-9c0b-4d49-8675-4a90051d7cad)

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
