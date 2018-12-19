const geometry = {};

(function() {

  geometry.quad = function() {
    const indices = new Int16Array([
      0, 1, 2,
      1, 3, 2
    ]);
    const positions = new Float32Array([
      -0.5, -0.5, 0.0,
      0.5, -0.5, 0.0,
      -0.5,  0.5, 0.0,
      0.5,  0.5, 0.0
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
  }

  function addVertex2(vertices, vi, x, y) {
    vertices[vi++] = x;
    vertices[vi++] = y;
    return vi;
  }

  function addVertex3(vertices, vi, x, y, z) {
    vertices[vi++] = x;
    vertices[vi++] = y;
    vertices[vi++] = z;
    return vi;
  }

  function addTriangle(indices, i, v0, v1, v2) {
    indices[i++] = v0;
    indices[i++] = v1;
    indices[i++] = v2;
    return i;
  }

  function addQuad(indices, i, v00, v10, v01, v11) {
    indices[i] = v00;
    indices[i + 1] = indices[i + 5] = v10;
    indices[i + 2] = indices[i + 4] = v01;
    indices[i + 3] = v11;
    return i + 6;
  }

  /**
   * @param {number} radius
   * @param {number} thetaSegment
   * @param {number} phiSegment
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
        const p = new Vector3(
          radius * sinT * cosP,
          radius * cosT,
          radius * sinT * sinP
        );
        posCount = addVertex3(positions, posCount, p.x, p.y, p.z);
        const np = Vector3.normalize(p);
        normalCount = addVertex3(normals, normalCount, np.x, np.y, np.z);
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
      const center = new Vector3(majorRadius * Math.cos(-majorAng), 0, majorRadius * Math.sin(-majorAng));
      const uvY = ai / majorSegment;
      for (let ii = 0; ii < minorSegment; ii++) {
        const minorAng = ii * minorStep;
        const minorX = majorRadius + minorRadius * Math.cos(minorAng);
        const position = new Vector3(
          minorX * Math.cos(-majorAng),
          minorRadius * Math.sin(minorAng),
          minorX * Math.sin(-majorAng)
        );
        posCount = addVertex3(positions, posCount, position.x, position.y, position.z);
        const normal = Vector3.sub(position, center).normalize();
        normalCount = addVertex3(normals, normalCount, normal.x, normal.y, normal.z);
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
  }

}());