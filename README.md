# static-web-template

jsxをテンプレートエンジンとしたミニマムな静的サイトジェネレーターです。  
プロジェクトに応じて自由にカスタマイズして使用されることを想定しています。

## 使い方

### パッケージをインストール

`pnpm install`

### 開発環境を立ち上げる

`pnpm run dev`

### distフォルダにビルドファイルを生成する

`pnpm run build`

## フォルダ構成

基本的にはpages, staticフォルダの以外に特別なディレクトリ配置のルールはありません。  
プロジェクトの用途に合わせて自由なディレクトリ構造で作成できます。

- /src
  - /pages
    - distファイルに生成したい構造に合わせてtsx, scss, tsファイルを配置できます
  - /static
    - static配下のファイルはdistファイルにそのまま書き出されます
    - 画像ファイルやjsonファイルなどが格納されることを想定しています

### pagesフォルダについて

pagesフォルダ内にビルド対象のファイル(tsx, scss, ts)を用意すると、  
ディレクトリ構造を保った形でhtml, css, jsファイルに変換されdistファイルにビルドされます。

#### expampe

- /pages
  - index.tsx
  - script.ts
  - style.scss
  - /about
    - index.tsx
    - script.ts
    - style.scss

- /dist
  - index.html
  - script.js
  - style.css
  - /about
    - index.html
    - script.js
    - style.css
