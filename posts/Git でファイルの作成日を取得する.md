```bash
$ git log --format="%ad" -- <file> | tail -1
```

[[Git]] でファイル作成日を取りたいと思った。
`git log -1 --reverse` で取れるかと思いきや、`--reverse` は出力に対してかかるだけで意味がなかった。
結局全部出して `tail` で最後を取るしかないっぽい。
