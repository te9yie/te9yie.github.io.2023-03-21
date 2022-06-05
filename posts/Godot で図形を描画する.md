[[Godot]] で矩形や球を描画したいと思った。メッシュを作ったりして色々面倒なのかなと思ったら `CanvasItem` に `draw_*` 系のメソッドがあった。

https://docs.godotengine.org/ja/stable/tutorials/2d/custom_drawing_in_2d.html
https://docs.godotengine.org/ja/stable/classes/class_canvasitem.html

とりあえず `Node2D` を継承して描いてみる。

```godot
extends Node2D

func _draw():
    draw_rect(Rect2(0, 0, 20, 20), Color.red)
```

これで左上に赤い四角が描ける。
