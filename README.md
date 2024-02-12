# Next.js App Router で Firebase を活用したディレクトリ構造のサンプル

App Router の機能を学びながらいい感じのディレクトリ構造の探したい  
また、Firebase を用いた開発をしたいのでその方法なども調査する（が、一応DBやAuth周りは他のサービスに入れ替えやすいような形にしておきたい）  

ディレクトリ構造としては features で機能ごとにまとめて、汎用的なものをそれぞれ app と同列に配置するイメージ  
`data`, `domain`, `view` で分割しているのでそれぞれの責務に処理を分ける  
Firebase は Cookie でセッションを保持する

Zod でスキーマとバリデーションを一緒に管理

## 参考
- https://nextjs.org/docs/app/building-your-application/routing/colocation
- https://github.com/alan2207/bulletproof-react/tree/master

## 対応予定
- テストを書く
- App Router の機能としてある特定のファイル名のものを作る
  - https://nextjs.org/docs/getting-started/project-structure
- fetchのキャッシュ戦略を考える
- エディターの実装
  - https://tiptap.dev/
- ドラッグアンドドロップの実装
  - https://zenn.dev/makotoishida/articles/868e195fc42f5e
- グラフの表示
  - https://zenn.dev/leftletter/articles/cdf3d30b74718c
- fetchのラッパー関数
  - cookie を常に渡し続けるような形にしたい


## 調べたいこと
- `use client` と `use server` について
  - それぞれどういう動きなのか
  - 入れ子にしたときなどどうなるのか
  - 基本的にはなるべくサーバー側でやって、必要なところだけクライアントにするイメージで合ってる？
- フロント側でのステート管理の良さそうな方法
  - Auth などはセッションでサーバーに状態を持つ感じにしているので従来の感じになっている
  - いままでは Auth とかをフロント側で持ってたのでどうするのが良さそう？
  - zustrand や Jotai などでグローバルにはあまり持たなくて済むのか？  
  - フォーム周りなど、入力からサーバーに送信するまでの間の短い期間とかで状態をもって扱う感じ？
