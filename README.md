# Next.js App Router で Firebase を活用したディレクトリ構造のサンプル

- Next.js App router
- Firebase
- Zod

基本的には features で機能ごとにまとめて、汎用的なものをそれぞれ app と同列に配置するイメージ  
Firebase は Cookie でセッションを保持する

## 参考
- https://nextjs.org/docs/app/building-your-application/routing/colocation
- https://github.com/alan2207/bulletproof-react/tree/master

## 対応予定
- hasky などで Lint などを強制させる
- Lint で import の順番やクォーテーションなどを制御
- デザインを整える
- サインインした時にリダイレクトまで時間がかかるのでそれを調整
- テストを書く
- Zod と withConverter によるスキーマ管理とバリデーション
  - https://tech.gamewith.co.jp/entry/2023/12/05/115148
  - https://blog.tawa.me/entry/firestore-type
  - https://qiita.com/FAL-coffee/items/3496036b7acbb3493bc1
