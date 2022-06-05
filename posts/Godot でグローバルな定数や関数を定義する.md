#[[Godot]]

`const` や `static` を使えばできた。

```godot
# global.gd
const block_size: int = 10

static func draw_block(x: int, y:int) -> void:
    ...
```

使う側では `preload` を使って読み込む。

```godot
# game.gd
const Global = preload("res://global.gd")

func _process(delta: float) -> void:
    Global.draw_block(2 * Global.block_size, 3 * Global.block_size)
```
