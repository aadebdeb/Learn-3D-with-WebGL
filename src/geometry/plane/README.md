# 平面

多数の三角形プリミティブで構成される平面です。

XY平面上に頂点を配置し、法線は+Z軸方向を向くようにしています。

```js
/**
 * @param {number} xSize
 * @param {number} ySize
 * @param {number} xSegment must be bigger than or equal to 1
 * @param {number} ySegment must be bigger than or equal to 1
 * @return {object}
 */
geometry.plane = function(xSize, ySize, xSegment, ySegment) {
  const vertexNum = (xSegment + 1) * (ySegment + 1);
  const triangleNum = xSegment * ySegment * 2;
  const indices = new Int16Array(3.0 * triangleNum);
  const positions = new Float32Array(3 * vertexNum);
  const normals = new Float32Array(3 * vertexNum);
  const uvs = new Float32Array(2 * vertexNum);

  const xStep = xSize / xSegment;
  const yStep = ySize / ySegment;
  const halfX = 0.5 * xSize;
  const halfY = 0.5 * ySize;

  // setup positions & normals & uvs
  let posCount = 0;
  let normalCount = 0;
  let uvCount = 0;
  for (let yi = 0; yi <= ySegment; yi++) {
    const y = yi * yStep - halfY;
    const uvY = yi / ySegment;
    for (let xi = 0; xi <= xSegment; xi++) {
      const x = xi * xStep - halfX;
      const uvX = xi / xSegment;
      posCount = addVertex3(positions, posCount, x, y, 0.0);
      normalCount = addVertex3(normals, normalCount, 0.0, 0.0, 1.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }

  // setup indices
  let indexCount = 0;
  for (let yi = 0; yi < ySegment; yi++) {
    const yj = yi + 1;
    for (let xi = 0; xi < xSegment; xi++) {
      const xj = xi + 1;
      const v00 = xi + yi * (xSegment + 1);
      const v10 = xj + yi * (xSegment + 1);
      const v01 = xi + yj * (xSegment + 1); 
      const v11 = xj + yj * (xSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }

  return {
    indices: indices,
    positions: positions,
    normals: normals,
    uvs: uvs
  };
}
```

<a href=".sample/geometry/plane.html" target="_blank">デモを表示</a>