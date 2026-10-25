# Web・拡張・Windowsの配信

普段の公開コマンドは `npm run deploy`。

## 公開の順序

1. Web、拡張、Windows、Cargo/npmロックファイルのバージョンをそろえる。
2. 回帰テスト、Webビルド、ZIP検証、デスクトップ画面のビルドを行う。
3. `release: Web and Windows v…` コミットを作成し、現在のブランチと同じコミットのバージョンタグをGitHubへ一括pushする。
4. GitHubのWindowsランナーで、データベース権限、Rustテスト、インストーラー作成、20回のWebView破棄・再生成とメモ保存、クリップボード通知を検証する。
5. 成功したバージョンだけGitHubの公開Releaseにインストーラー、単体実行ファイル、SHA-256/サイズ/コミット付きマニフェストを公開する。
6. ローカルの配信処理が同じコミット・バージョンを確認し、WindowsファイルのサイズとSHA-256を検証する。検証済みファイルをローカルの`releases/windows/バージョン/`に保存する。Webを再ビルドし、Web/PWA/拡張ZIP/Windows配布情報を同じFirebase Hostingリリースとして公開する。インストーラーはその版のGitHub Releaseへ直接リンクする。

公開先: https://flickmemo-qwe.web.app/download#http-windows

Webの設定→アプリ情報にも、「拡張機能」の上に「Windows版」の案内を表示する。利用者にGitHubアカウントやRust/C++開発環境は不要。

## 失敗した場合

エラーを確認して `npm run deploy` を再実行する。`.deploy-state.json` に途中経過を保存しているため、コードに変更がなければ同じ版の途中から再開する。ソースを修正した場合は次のバージョンを作り、Windowsも作り直す。公開待ちの間にソースが変わった場合も配信を中止し、WindowsとWebのコードが食い違うことを防ぐ。

同時実行は `.deploy.lock` で拒否する。終了済みプロセスの古いロックは次の実行時に除去する。GitHubの検証失敗時はHostingを公開しない。GitHub Release公開後にHostingだけが失敗しても、同じ版からHosting配信を再試行できる。

意図的に再開状態を捨て、新しい版を作る場合だけ `npm run deploy:new` を使う。タグの付け替えや公開済みバイナリの上書きはしない。

## 配信元PCの準備

Node.js 22.12以降、Git、`npm ci`、Firebase CLIとFirebaseログイン、GitHubへのpush権限が必要。ネイティブのビルドはGitHubで行うため、この配信用PCにRust/C++ビルド環境は不要。GitHub Actionsを有効にし、Release作成に必要な`contents: write`権限を許可する。

配布物はWindows 10/11 x64向けの試用版。Windowsのコード署名（Authenticode）は未対応なのでSmartScreenの警告が出る場合がある。更新用の署名は別に導入しており、新しい版では画面を開くたびに更新を確認し、「更新して再起動」から適用できる。自動更新未対応の旧版からは、最初の一度だけ新しいインストーラーを実行する。WebView2が未導入ならインストーラーが導入を試みるため通信が必要。組織のインストール制限まで回避するものではない。

`FlickMemo-Portable.exe`もWebView2を使い、アプリデータはWindowsユーザーのアプリデータ領域に保存する。USB内ですべて完結するポータブルプロファイルではない。

GitHub Releaseは公開ダウンロードに使用し、期限付きActions Artifactsは検証ログと補助的な配布物の保存に使用する。インストーラーはGitへコミットしない。

Firebase Sparkプランは`.exe`のHosting配信を禁止しているため、Hostingには`windows/release.json`だけを置く。インストーラーを拡張子変更などでHostingへ置かず、GitHubの正規の公開Releaseから配布する。課金プラン変更は不要。公式説明: https://firebase.google.com/support/faq#hosting-exe-restrictions

## 自動更新用の署名

インストーラーはGitHubでビルド・検証し、配信PCでサイズとハッシュを確認してからTauri CLIで署名する。秘密鍵は配信PCのユーザー専用フォルダ `~/.flickmemo/updater-v1.key` に保存し、GitHub・Hostingへ送らない。公開鍵だけをアプリへ組み込む。署名とバージョンを含む`windows/update.json`をHostingへ配信し、インストーラー本体はGitHub Releaseから取得する。

秘密鍵と対応する`.pub`を安全にバックアップすること。配信PCを変える場合は同じ鍵を安全に復元する。`npm run deploy`は鍵がない、または公開鍵と一致しない場合に公開を止める。既存利用者へ届く更新を継続できなくなるため、鍵の再生成・上書きはしない。`scripts/setup-updater-key.mjs`はアプリが公開鍵未設定の場合だけ使う初回セットアップである。

更新ファイルの署名はバージョンにも結び付ける。新しいバージョン名を古い正規インストーラーに付けた更新も拒否する。更新がない場合・通信断時はアプリをそのまま使用できる。ダウンロード・検証後にメモを保存し、保存失敗時はインストーラーを起動しない。画面を閉じると未適用の更新データを解放する。
