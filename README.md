# FlickMemo

Web / PWA / Chrome・Edge拡張の共通コード。バージョンはアプリの設定または `version.json` で確認できます。

```powershell
npm ci
npm run dev
```

Node.js 22.12以降を使用。検証は `npm run check`、依存監査は `npm audit`。

- ビルド出力: `dist/`
- 拡張配布用: `dist/flickmemo-extension.zip`（ビルド時に生成）
- 新アイコン: `public/icons/` / [生成元とプロンプト](assets/branding/README.md)
- [ファイル転送・画像コピーの修正と両端の更新手順](docs/TRANSFER-FIX-1.3.80.md)
- [再点検の結果と公開前の残作業](docs/AUDIT-2026-10-24.md)
- [Windows版の具体的な計画・確認待ち](docs/WINDOWS-PLAN.md)

Windows版、常駐処理、クリップボード履歴はまだ実装していません。アイコンはWeb/PWA/拡張の設定とローカル配布物へ反映しています。公開サイト、インストール済みPWA、導入済み拡張はこのファイル変更だけでは更新されません。

認証ヘルパーと拡張は同じリリースとして更新し、Chrome/Edgeの実Googleログインを検証してください。旧キャッシュの移行やDBルールの適用についても、監査レポートの公開前項目を確認してください。

## デプロイ

本番デプロイはリポジトリの所有者が手動で `npm run deploy` を実行します。Codexは修正と検証まで行います。

`npm run deploy` はバージョン更新、テスト、ビルド、ZIP検証、コミット、現在のブランチとタグのpushを行います。GitHub ActionsがWindows版を検証・公開した後、FirebaseのデータベースルールとHostingを配信します。Firebase CLIでのログインが必要です。検証失敗を修正してから再実行すると、変更を含む新しい版で配信します。
