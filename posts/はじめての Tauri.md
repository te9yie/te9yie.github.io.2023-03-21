[[Tauri]] はバックエンドが [[Rust]] の [[Electron]] みたいなものみたい。

https://tauri.app/

Electron はフロントエンドが [[Chrome]]、バックエンドが [[Node.js]]。Tauri はフロントエンドが OS ネイティブの Web レンダラで、バックエンドが Rust ということらしい。

|                    | Tauri                        | Electron |
| -----------------: | ---------------------------- | -------- |
| **フロントエンド** | OS ネイティブの Web レンダラ | Chrome   |
|   **バックエンド** | Rust                         | Node.js  |

公式サイトのガイドを参考にとりあえず動くものを作ってみる。

```dos
> npx create-tauri-app
? What is your app name? hello
? What should the window title be? Hello
? What UI recipe would you like to add? Vanilla.js (html, css, and js without the bundlers)
> cd hello
> npm install
> npm run tauri dev
```

![hello](/hello-tauri.png)
