# 四角形

2つの三角形プリミティブで構成される四角形です。

XY平面上に頂点を配置し、法線の+Z軸方向を向くようにしています。

```js
/**
 * @param {number} xSize
 * @param {number} ySize
 * @return {object}
 */
geometry.quad = function(xSize, ySize) {
  const indices = new Int16Array([
    0, 1, 2,
    1, 3, 2
  ]);
  const hx = xSize * 0.5;
  const hy = ySize * 0.5;
  const positions = new Float32Array([
    -hx, -hy, 0.0,
    hx, -hy, 0.0,
    -hx, hy, 0.0,
    hx, hy, 0.0
  ]);
  const normals = new Float32Array([
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0
  ]);
  const uvs = new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0
  ]);

  return {
    indices: indices,
    positions: positions,
    normals: normals,
    uvs: uvs
  };
};
```

球やトーラスなど複雑な形状も四角形を貼り付けるように構成していくので、この四角形が基本となります。

また、ポストエフェクトを利用する際にもスクリーンを覆うポリゴンを作成するために利用します。

<a href="../sample/geometry/polygon.html" target="_blank">デモを表示</a>