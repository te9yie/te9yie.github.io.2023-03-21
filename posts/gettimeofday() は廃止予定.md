https://linuxjm.osdn.jp/html/LDP_man-pages/man2/gettimeofday.2.html

パフォーマンス測定用に高分解能なタイマーを使おうと思った。
たしか `gettimeofday()` を使うんだったっけかなあと思って調べたら廃止予定になっていた。
代わりに `clock_gettime()` の使用が推奨されているらしい。
