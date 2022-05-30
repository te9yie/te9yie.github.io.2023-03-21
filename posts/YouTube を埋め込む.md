[[YouTube]] を埋め込みたくて react-youtube を使ってみた。

https://github.com/tjallingt/react-youtube

これで良いかなと思っていたが、なんか重くないか？と思った。[[PageSpeed Insights]] で確認したらめちゃくちゃパフォーマンスが悪化していた。

https://pagespeed.web.dev/?hl=ja

やはり YouTube 関連のものが原因で重くなっていた。調べてみると色々な対応方法があったけど、一番かんたんそうな react-lite-youtube-embed をつかうことにした。

https://github.com/ibrahimcesar/react-lite-youtube-embed
