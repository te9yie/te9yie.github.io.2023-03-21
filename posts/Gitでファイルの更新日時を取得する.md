`git log -1 --pretty="%ad" -- <file>`

日時のフォーマットを指定することもできる。

`git log -1 --pretty="%ad" --date=format:"%Y-%m-%d %H:%M:%S" -- <file>`

ref [Git - コミット履歴の閲覧](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E5%9F%BA%E6%9C%AC-%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E5%B1%A5%E6%AD%B4%E3%81%AE%E9%96%B2%E8%A6%A7)

---

ファイルの更新日時として[[Git]]でコミットした時間が使えたらいいなと思った。
