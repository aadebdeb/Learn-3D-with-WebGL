# Culling

### 表/裏

WebGLでは時計回りが表面、反時計回りが裏面とみなすようになっています。

### 有効/無効

WebGLのデフォルトではカリングは無効になっています。

有効化するには、

```js
gl.enable(gl.CULL_FACE);
```

として、無効化するには

```js
gl.disable(gl.CULL_FACE);
```

とします。

### カリングする面

カリングする面は`gl#cullFace`で以下のように行います。

```
gl.cullFace(gl.BACK)
```

指定可能な値は次のようになっています。

* `gl.FRONT`: 表面をカリング
* `gl.BACK`: 裏面をカリング
* `gl.FRONT_AND_BACK`: 両面をカリング

デフォルト値は`gl.BACK`です。

# 参考

* [WebGLRenderingContext\.enable\(\) \- Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enable)
* [WebGLRenderingContext\.cullFace\(\) \- Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/cullFace)