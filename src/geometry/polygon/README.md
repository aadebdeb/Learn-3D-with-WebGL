# 多角形

正多角形です。

```js
/**
  * @param {number} n number of corners, must be bigger than or equal to 3
  * @param {number} radius
  * @param {number} radiusSegment must be bigger than or equal to 1
  */
geometry.polygon = function(n, radius, radiusSegment) {
  const vertexNum = 1 + n * radiusSegment;
  const triangleNum = n * (1 + 2 * (radiusSegment - 1));
  const indices = new Int16Array(3 * triangleNum);
  const positions = new Float32Array(3 * vertexNum);
  const normals = new Float32Array(3 * vertexNum);
  const uvs = new Float32Array(2 * vertexNum);

  const angleStep = 2.0 * Math.PI / n;
  const radiusStep = radius / radiusSegment;

  let posCount = 0;
  let normalCount = 0;
  let uvCount = 0;

  // setup positions & normals & uvs
  posCount = addVertex3(positions, posCount, 0.0, 0.0, 0.0);
  normalCount = addVertex3(normals, normalCount, 0.0, 0.0, 1.0);
  uvCount = addVertex2(uvs, uvCount, 0.5, 0.5);
  for (let ai = 0; ai < n; ai++) {
    const angle =  ai * angleStep + Math.PI * 0.5;
    for (let ri = 1; ri <= radiusSegment; ri++) {
      const r = ri * radiusStep;
      const posX = r * Math.cos(angle);
      const posY = r * Math.sin(angle);
      posCount = addVertex3(positions, posCount, posX, posY, 0.0);
      normalCount = addVertex3(normals, normalCount, 0.0, 0.0, 1.0);
      uvCount = addVertex2(uvs, uvCount, Math.cos(angle) * 0.25 + 0.25, Math.sin(angle) * 0.25 + 0.25);
    }
  }

  // setup indices
  let indexCount = 0;
  for (let ai = 0; ai < n; ai++) {
    const aj = ai !== n - 1 ? ai + 1 : 0;
    indexCount = addTriangle(indices, indexCount,
      0,
      1 + ai * radiusSegment,
      1 + aj * radiusSegment
    );
    for (let ri = 0; ri < radiusSegment - 1; ri++) {
      // make quad
      const rj = ri + 1;
      const v00 = 1 + ri + aj * radiusSegment;
      const v10 = 1 + ri + ai * radiusSegment;
      const v01 = 1 + rj + aj * radiusSegment;
      const v11 = 1 + rj + ai * radiusSegment;
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

<a href="./sample/geometry/polygon.html" target="_blank">デモを表示</a>