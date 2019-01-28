# 直方体

6つの平面で構成される直方体です。

```js
/**
 * @param {number} xSize
 * @param {number} ySize
 * @param {number} zSize
 * @param {number} xSegment must be bigger than or equal to 1
 * @param {number} ySegment must be bigger than or equal to 1
 * @param {number} zSegment must be bigger than or equal to 1
 */
geometry.box = function(xSize, ySize, zSize, xSegment, ySegment, zSegment) {
  const vertexNum = 2 * ((xSegment + 1) * (ySegment + 1) + (ySegment + 1) * (zSegment + 1) + (zSegment + 1) * (xSegment + 1));
  const triangleNum = 2 * 2 * (xSegment * ySegment + ySegment * zSegment + zSegment * xSegment);
  const indices = new Int16Array(3.0 * triangleNum);
  const positions = new Float32Array(3 * vertexNum);
  const normals = new Float32Array(3 * vertexNum);
  const uvs = new Float32Array(2 * vertexNum);

  const xStep = xSize / xSegment;
  const yStep = ySize / ySegment;
  const zStep = zSize / zSegment;
  const halfX = 0.5 * xSize;
  const halfY = 0.5 * ySize;
  const halfZ = 0.5 * zSize;

  let posCount = 0;
  let normalCount = 0;
  let uvCount = 0;
  let vertexCount = 0;
  let indexCount = 0;

  // XY +Z plane
  for (let yi = 0; yi <= ySegment; yi++) {
    const y = yi * yStep - halfY;
    const uvY = yi / ySegment;
    for (let xi = 0; xi <= xSegment; xi++) {
      const x = xi * xStep - halfX;
      const uvX = xi / xSegment;
      posCount = addVertex3(positions, posCount, x, y, halfZ);
      normalCount = addVertex3(normals, normalCount, 0.0, 0.0, 1.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  for (let yi = 0; yi < ySegment; yi++) {
    const yj = yi + 1;
    for (let xi = 0; xi < xSegment; xi++) {
      const xj = xi + 1;
      const v00 = vertexCount + xi + yi * (xSegment + 1);
      const v10 = vertexCount + xj + yi * (xSegment + 1);
      const v01 = vertexCount + xi + yj * (xSegment + 1); 
      const v11 = vertexCount + xj + yj * (xSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }
  vertexCount += (xSegment + 1) * (ySegment + 1);

  // ZY +X plane
  for (let yi = 0; yi <= ySegment; yi++) {
    const y = yi * yStep - halfY;
    const uvY = yi / ySegment;
    for (let zi = zSegment; zi >= 0; zi--) {
      const z = zi * zStep - halfZ;
      const uvX = zi / zSegment;
      posCount = addVertex3(positions, posCount, halfX, y, z);
      normalCount = addVertex3(normals, normalCount, 1.0, 0.0, 0.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  for (let yi = 0; yi < ySegment; yi++) {
    const yj = yi + 1;
    for (let zi = 0; zi < zSegment; zi++) {
      const zj = zi + 1;
      const v00 = vertexCount + zi + yi * (zSegment + 1);
      const v10 = vertexCount + zj + yi * (zSegment + 1);
      const v01 = vertexCount + zi + yj * (zSegment + 1); 
      const v11 = vertexCount + zj + yj * (zSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }
  vertexCount += (zSegment + 1) * (ySegment + 1);

  // XY -Z plane
  for (let yi = 0; yi <= ySegment; yi++) {
    const y = yi * yStep - halfY;
    const uvY = yi / ySegment;
    for (let xi = xSegment; xi >= 0; xi--) {
      const x = xi * xStep - halfX;
      const uvX = xi / xSegment;
      posCount = addVertex3(positions, posCount, x, y, -halfZ);
      normalCount = addVertex3(normals, normalCount, 0.0, 0.0, -1.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  for (let yi = 0; yi < ySegment; yi++) {
    const yj = yi + 1;
    for (let xi = 0; xi < xSegment; xi++) {
      const xj = xi + 1;
      const v00 = vertexCount + xi + yi * (xSegment + 1);
      const v10 = vertexCount + xj + yi * (xSegment + 1);
      const v01 = vertexCount + xi + yj * (xSegment + 1); 
      const v11 = vertexCount + xj + yj * (xSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }
  vertexCount += (xSegment + 1) * (ySegment + 1);

  // ZY -X plane
  for (let yi = 0; yi <= ySegment; yi++) {
    const y = yi * yStep - halfY;
    const uvY = yi / ySegment;
    for (let zi = 0; zi <= zSegment; zi++) {
      const z = zi * zStep - halfZ;
      const uvX = zi / zSegment;
      posCount = addVertex3(positions, posCount, -halfX, y, z);
      normalCount = addVertex3(normals, normalCount, -1.0, 0.0, 0.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  for (let yi = 0; yi < ySegment; yi++) {
    const yj = yi + 1;
    for (let zi = 0; zi < zSegment; zi++) {
      const zj = zi + 1;
      const v00 = vertexCount + zi + yi * (zSegment + 1);
      const v10 = vertexCount + zj + yi * (zSegment + 1);
      const v01 = vertexCount + zi + yj * (zSegment + 1); 
      const v11 = vertexCount + zj + yj * (zSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }
  vertexCount += (zSegment + 1) * (ySegment + 1);

  // XZ +Y plane
  for (let zi = zSegment; zi >= 0; zi--) {
    const z = zi * zStep - halfZ;
    const uvY = zi / zSegment;
    for (let xi = 0; xi <= xSegment; xi++) {
      const x = xi * xStep - halfX;
      const uvX = xi / xSegment;
      posCount = addVertex3(positions, posCount, x, halfY, z);
      normalCount = addVertex3(normals, normalCount, 0.0, 1.0, 0.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  for (let zi = 0; zi < zSegment; zi++) {
    const zj = zi + 1;
    for (let xi = 0; xi < xSegment; xi++) {
      const xj = xi + 1;
      const v00 = vertexCount + xi + zi * (xSegment + 1);
      const v10 = vertexCount + xj + zi * (xSegment + 1);
      const v01 = vertexCount + xi + zj * (xSegment + 1); 
      const v11 = vertexCount + xj + zj * (xSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }
  vertexCount += (xSegment + 1) * (zSegment + 1);

  // XZ -Y plane
  for (let zi = 0; zi <= zSegment; zi++) {
    const z = zi * zStep - halfZ;
    const uvY = zi / zSegment;
    for (let xi = 0; xi <= xSegment; xi++) {
      const x = xi * xStep - halfX;
      const uvX = xi / xSegment;
      posCount = addVertex3(positions, posCount, x, -halfY, z);
      normalCount = addVertex3(normals, normalCount, 0.0, -1.0, 0.0);
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }
  for (let zi = 0; zi < zSegment; zi++) {
    const zj = zi + 1;
    for (let xi = 0; xi < xSegment; xi++) {
      const xj = xi + 1;
      const v00 = vertexCount + xi + zi * (xSegment + 1);
      const v10 = vertexCount + xj + zi * (xSegment + 1);
      const v01 = vertexCount + xi + zj * (xSegment + 1); 
      const v11 = vertexCount + xj + zj * (xSegment + 1);
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }
  vertexCount += (xSegment + 1) * (zSegment + 1);

  return {
    indices: indices,
    positions: positions,
    normals: normals,
    uvs: uvs
  };
};

geometry.torus = function(majorRadius, minorRadius, majorSegment, minorSegment) {
  const vertexNum = majorSegment * minorSegment;
  const indices = new Int16Array(6 * vertexNum);
  const positions = new Float32Array(3 * vertexNum);
  const normals = new Float32Array(3 * vertexNum);
  const uvs = new Float32Array(2 * vertexNum);

  const majorStep = Math.PI * 2.0 / majorSegment;
  const minorStep = Math.PI * 2.0 / minorSegment;

  let posCount = 0;
  let normalCount = 0;
  let uvCount = 0;

  // setup positions & normals & uvs
  for (let ai =0; ai < majorSegment; ai++) {
    const majorAng = ai * majorStep;
    const center = {
      x: majorRadius * Math.cos(-majorAng), 
      y: 0,
      z: majorRadius * Math.sin(-majorAng)
    };
    const uvY = ai / majorSegment;
    for (let ii = 0; ii < minorSegment; ii++) {
      const minorAng = ii * minorStep;
      const minorX = majorRadius + minorRadius * Math.cos(minorAng);
      const position = {
        x: minorX * Math.cos(-majorAng),
        y: minorRadius * Math.sin(minorAng),
        z: minorX * Math.sin(-majorAng)
      };
      posCount = addVertex3(positions, posCount, position.x, position.y, position.z);
      const toPC = {
        x: position.x - center.x,
        y: position.y - center.y,
        z: position.z - center.z
      };
      const lengthPC = Math.sqrt(toPC.x * toPC.x + toPC.y * toPC.y + toPC.z * toPC.z);
      normalCount = addVertex3(normals, normalCount, toPC.x / lengthPC, toPC.y / lengthPC, toPC.z / lengthPC);
      const uvX = ii / minorSegment;
      uvCount = addVertex2(uvs, uvCount, uvX, uvY);
    }
  }

  // setup indices
  let indexCount = 0;
  for (let ai = 0; ai < majorSegment; ai++) {
    const aj = ai !== majorSegment - 1  ? ai + 1 : 0;
    for (let ii = 0; ii < minorSegment; ii++) {
      const ij = ii !== minorSegment - 1 ? ii + 1 : 0;
      const v00 = ii + ai * minorSegment;
      const v10 = ii + aj * minorSegment;
      const v01 = ij + ai * minorSegment;
      const v11 = ij + aj * minorSegment;
      indexCount = addQuad(indices, indexCount, v00, v10, v01, v11);
    }
  }

  return {
    indices: indices,
    positions: positions,
    normals: normals,
    uvs: uvs
  };
};
```

<a href="../sample/geometry/box.html" target="_blank">デモを表示</a>