# 東北ずん子の spine アニメーションを表示するプロジェクト

## 推奨環境

|      | バージョン |
| ---- | ---------- |
| node | v14.16.0   |
| yarn | 1.22.10    |
| npm  | 7.11.2     |

## コマンド

|                | コマンド                                                            |
| -------------- | ------------------------------------------------------------------- |
| yarn webpack:b | webpack で ts ファイルをコンパイル・バンドルします。                |
| yarn webpack:w | webpack で ts ファイルを watch しつつ、コンパイル・バンドルします。 |
| yarn serve     | out をルートディレクトリとして、ローカルサーバーが立ち上がります。  |

## 東北ずん子の spine アニメーションの確認手順

以下の順で、コマンドを実行すると最終的にローカルサーバーが立ち上がります。  
立ち上がったローカルサーバーをブラウザで表示すると、東北ずん子のアニメーションのページが表示されます

1. yarn install
2. yarn webpack:b
3. yarn serve

## ディレクトリ構造

```
./
├── README.md
├── out
│   ├── index.html
│   ├── main.js
│   ├── zunko.atlas … spine からエクスポートした atlas
│   ├── zunko.json … spine からエクスポートした json。東北ずん子のアニメーションの様々な情報が記載されています。
│   └── zunko.png … spine からエクスポートした png。
├── node_modules
├── package.json
├── src
│   └── main.ts … アニメーションの処理が記述されています。コンパイルすると、out/main.js として出力されます。
├── tsconfig.json
├── webpack.config.js
├── yarn-error.log
└── yarn.lock
```
