https://github.com/actions/checkout

[[Git]] でファイルごとの更新日付を取得するようにしていたが、[[GitHub Actions]] を使ったらうまく取得できていなくて全て同じ日時になっていた。
調べてみると `actions/checkout@v2` はデフォルトで最新履歴だけを取得するようになっていた。`fetch-depth` を 0 に設定して対応した。
