# 球 (UV Sphere)

球です。

```js
/**
 * @param {number} radius
 * @param {number} thetaSegment must be bigger than or equal to 3
 * @param {number} phiSegment must be bigger than or equal to 3
 * @return {object}
 */
geometry.sphere = function(radius, thetaSegment, phiSegment) {
  const vertexNum = 2 + (thetaSegment - 1) * phiSegment;
  const indexNum = phiSegment * 6 + (thetaSegment - 2) * phiSegment * 6;
  const indices = new Int16Array(indexNum);
  const positions = new Float32Array(3 * vertexNum);
  const normals = new Float32Array(3 * vertexNum);
  const uvs = new Float32Array(2 * vertexNum);

  const thetaStep = Math.PI / thetaSegment;
  const phiStep = 2.0 * Math.PI / phiSegment;

  // setup positions & normals & uvs
  let posCount = 0;
  let uvCount = 0;
  let normalCount = 0;
  posCount = addVertex3(positions, posCount, 0, -radius, 0);
  normalCount = addVertex3(normals, normalCount, 0, -1, 0);
  uvCount = addVertex2(uvs, uvCount, 0, 0);
  for (let hi = 1; hi < thetaSegment; hi++) {
    const theta = Math.PI - hi * thetaStep;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const uvY = hi / thetaSegment;
    for (let pi = 0; pi < phiSegment; pi++) {
      const phi = pi * phiStep;
      const sinP = Math.sin(-phi);
      const cosP = Math.cos(-phi);
      const nx = sinT * cosP;
      const ny = cosT;
      const nz = sinT * sinP; 
      posCount = addVertex3(positions, posCount, radius * nx, radius * ny, radius * nz);
      normalCount = addVertex3(normals, normalCount, nx, ny, nz);
      const uvX = pi / phiSegment;
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  posCount = addVertex3(positions, posCount, 0, radius, 0);
  normalCount = addVertex3(normals, normalCount, 0, 1, 0);
  uvCount = addVertex2(uvs, uvCount, 1, 1);

  // setup indices
  let indexCount = 0;
  for (let pi = 0; pi < phiSegment; pi++) {
    indexCount = addTriangle(indices, indexCount, 0, pi !== phiSegment - 1 ? pi + 2 : 1, pi + 1);
  }
  for (let hi = 0; hi < thetaSegment - 2; hi++) {
    const hj = hi + 1;
    for (let pi = 0; pi < phiSegment; pi++) {
      const pj = pi !== phiSegment - 1 ? pi + 1 : 0;
      indexCount = addQuad(indices, indexCount, 
        pi + hi * phiSegment + 1,
        pj + hi * phiSegment + 1,
        pi + hj * phiSegment + 1,
        pj + hj * phiSegment + 1
      );
    }
  }
  for (let pi = 0; pi < phiSegment; pi++) {
    indexCount = addTriangle(indices, indexCount,
      vertexNum - 1,
      pi + (thetaSegment - 2) * phiSegment + 1,
      (pi !== phiSegment - 1 ? pi + 1 : 0) + (thetaSegment - 2) * phiSegment + 1
    );
  }

  return {
    indices: indices,
    positions: positions,
    normals: normals,
    uvs: uvs
  };
}
```

<a href="./sample/geometry/Sphere.html" target="_blank">デモを表示</a>