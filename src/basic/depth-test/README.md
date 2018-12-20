# Depth Test (深度テスト)

#### 有効/無効

WebGLのデフォルトでは深度テストは無効になっています。

有効化するには、

```js
gl.enable(gl.DEPTH_TEST);
```

として、無効化するには

```js
gl.disable(gl.DEPTH_TEST);
```

とします。

無効の状態では、深度(z値)によらずオーバーラップするようにレンダリングされます。

#### 深度テストの比較関数

入力値と深度バッファの値どのように比較するかを`gl.depthFunc`で設定します。

```js
gl.depthFunc(gl.LESS);
```

指定可能な値は次のようになっています。

* `gl.NEVER`: 常にパスしない
* `gl.LESS`: 入力値が深度バッファの値未満のときパス
* `gl.EQUAL`: 入力値と深度バッファの値が等しいときパス
* `gl.LEQUAL`: 入力値が深度バッファの値以下のときパス
* `gl.GREATER`: 入力値が深度バッファの値より大きいときパス
* `gl.NOTEQUAL`: 入力値が深度バッファの値と等しくないときパス
* `gl.GEQUAL`: 入力値が深度バッファの値以上のときパス
* `gl.ALWAYS`: 常にパス

デフォルト値は`gl.LESS`です。

#### デモ

デモでは左の三角形を最初に、右の三角形をその後にレンダリングしています。
そのため、深度テストを有効にしていない場合は、左の三角形の上に右の三角形が重なっています。
深度テストを有効にしている場合は、テストに利用する関数によって表示が変わります。

<canvas width="560px" height="420px"><canvas>

#### 参考

* [WebGLRenderingContext\.enable\(\) \- Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enable)
* [WebGLRenderingContext\.depthFunc\(\) \- Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthFunc)