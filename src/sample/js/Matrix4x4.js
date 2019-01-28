
class Matrix4x4 {
 
  /**
   * @param {array|Float32Array} elements 
   */
  constructor(elements) {
    this.elements = new Float32Array(elements);
  }

  /**
   * @return {number}
   */
  determinant() {
    const e = this.elements;
    return e[0] * e[5] * e[10] * e[15]
         + e[4] * e[9] * e[14] * e[3]
         + e[8] * e[13] * e[2] * e[7]
         + e[12] * e[1] * e[6] * e[11]
         - e[12] * e[9] * e[6] * e[3]
         - e[8] * e[5] * e[2] * e[15]
         - e[4] * e[1] * e[14] * e[11]
         - e[0] * e[13] * e[10] * e[7];
  }

  /**
   * @param {Matrix4x4} m
   * @return {Matrix4x4}
   */
  static inverse(m) {
    const d = 1.0 / m.determinant();
    if (Math.abs(d) < 0.00001) {
      throw new Error('matrix is not invertiable');
    }
    const oe = m.elements; // original elements
    const ie = new Float32Array(16); // inversed elements

    ie[0] = (oe[5] * oe[10] * oe[15] + oe[9] * oe[14] * oe[7] + oe[13] * oe[6] * oe[11]
          - oe[13] * oe[10] * oe[7] - oe[9] * oe[6] * oe[15] - oe[5] * oe[14] * oe[11]) * d; 
    ie[4] = -(oe[4] * oe[10] * oe[15] + oe[8] * oe[14] * oe[7] + oe[12] * oe[6] * oe[11]
            - oe[12] * oe[10] * oe[7] - oe[8] * oe[6] * oe[15] - oe[4] * oe[14] * oe[11]) * d; 
    ie[8] = (oe[4] * oe[9] * oe[15] + oe[8] * oe[13] * oe[7] + oe[12] * oe[5] * oe[11]
          - oe[12] * oe[9] * oe[7] - oe[8] * oe[5] * oe[15] - oe[4] * oe[13] * oe[11]) * d;
    ie[12] = -(oe[4] * oe[9] * oe[14] + oe[8] * oe[13] * oe[6] + oe[12] * oe[5] * oe[10]
              - oe[12] * oe[9] * oe[6] - oe[8] * oe[5] * oe[14] - oe[4] * oe[13] * oe[10]) * d; 
    ie[1] = -(oe[1] * oe[10] * oe[15] + oe[9] * oe[14] * oe[3] + oe[13] * oe[2] * oe[11]
          - oe[13] * oe[10] * oe[3] - oe[9] * oe[2] * oe[15] - oe[1] * oe[14] * oe[11]) * d; 
    ie[5] = (oe[0] * oe[10] * oe[15] + oe[8] * oe[14] * oe[3] + oe[12] * oe[2] * oe[11]
          - oe[12] * oe[10] * oe[3] - oe[8] * oe[2] * oe[15] - oe[0] * oe[14] * oe[11]) * d; 
    ie[9] = -(oe[0] * oe[9] * oe[15] + oe[8] * oe[13] * oe[3] + oe[12] * oe[1] * oe[11]
          - oe[12] * oe[9] * oe[3] - oe[8] * oe[1] * oe[15] - oe[0] * oe[13] * oe[11]) * d;
    ie[13] = (oe[0] * oe[9] * oe[14] + oe[8] * oe[13] * oe[2] + oe[12] * oe[1] * oe[10]
           - oe[12] * oe[9] * oe[2] - oe[8] * oe[1] * oe[14] - oe[0] * oe[13] * oe[10]) * d;
    ie[2] = (oe[1] * oe[6] * oe[15] + oe[5] * oe[14] * oe[3] + oe[13] * oe[2] * oe[7]
          - oe[13] * oe[6] * oe[3] - oe[5] * oe[2] * oe[15] - oe[1] * oe[14] * oe[7]) * d; 
    ie[6] = -(oe[0] * oe[6] * oe[15] + oe[4] * oe[14] * oe[3] + oe[12] * oe[2] * oe[7]
            - oe[12] * oe[6] * oe[3] - oe[4] * oe[2] * oe[15] - oe[0] * oe[14] * oe[7]) * d;
    ie[10] = (oe[0] * oe[5] * oe[15] + oe[4] * oe[13] * oe[3] + oe[12] * oe[1] * oe[7]
          - oe[12] * oe[5] * oe[3] - oe[4] * oe[1] * oe[15] - oe[0] * oe[13] * oe[7]) * d; 
    ie[14] = -(oe[0] * oe[5] * oe[14] + oe[4] * oe[13] * oe[2] + oe[12] * oe[1] * oe[6]
            - oe[12] * oe[5] * oe[2] - oe[4] * oe[1] * oe[14] - oe[0] * oe[13] * oe[6]) * d;
    ie[3] = -(oe[1] * oe[6] * oe[11] + oe[5] * oe[10] * oe[3] + oe[9] * oe[2] * oe[7]
            - oe[9] * oe[6] * oe[3] - oe[5] * oe[2] * oe[11] - oe[1] * oe[10] * oe[7]) * d; 
    ie[7] = (oe[0] * oe[6] * oe[11] + oe[4] * oe[10] * oe[3] + oe[8] * oe[2] * oe[7]
        - oe[8] * oe[6] * oe[3] - oe[4] * oe[2] * oe[11] - oe[0] * oe[10] * oe[7]) * d;
    ie[11] = -(oe[0] * oe[5] * oe[11] + oe[4] * oe[9] * oe[3] + oe[8] * oe[1] * oe[7]
        - oe[8] * oe[5] * oe[3] - oe[4] * oe[1] * oe[11] - oe[0] * oe[9] * oe[7]) * d;
    ie[15] = (oe[0] * oe[5] * oe[10] + oe[4] * oe[9] * oe[2] + oe[8] * oe[1] * oe[6]
        - oe[8] * oe[5] * oe[2] - oe[4] * oe[1] * oe[10] - oe[0] * oe[9] * oe[6]) * d;

     return new Matrix4x4(ie);
  }

  /**
   * @return {Matrix4x4}
   */
  static identity() {
    return new Matrix4x4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} z
   * @return {Matrix4x4}
   */
  static translation(x, y, z) {
    return new Matrix4x4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    ]);
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} z 
   * @return {Matrix4x4}
   */
  static scale(x, y, z) {
    return new Matrix4x4([
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {number} radian
   * @return {Matrix4x4}
   */
  static rotationX(radian) {
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return new Matrix4x4([
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {number} radian 
   * @return {Matrix4x4}
   */
  static rotationY(radian) {
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return new Matrix4x4([
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {number} radian 
   * @return {Matrix4x4}
   */
  static rotationZ(radian) {
    const s = Math.sin(radian);
    const c = Math.cos(radian);
    return new Matrix4x4([
      c, s, 0, 0,
      -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {Matrix4x4} m
   * @return {Matrix4x4} this
   */
  add(m) {
    this.elements[0] += m.elements[0];
    this.elements[1] += m.elements[1];
    this.elements[2] += m.elements[2];
    this.elements[3] += m.elements[3];
    this.elements[4] += m.elements[4];
    this.elements[5] += m.elements[5];
    this.elements[6] += m.elements[6];
    this.elements[7] += m.elements[7];
    this.elements[8] += m.elements[8];
    this.elements[9] += m.elements[9];
    this.elements[10] += m.elements[10];
    this.elements[11] += m.elements[11];
    this.elements[12] += m.elements[12];
    this.elements[13] += m.elements[13];
    this.elements[14] += m.elements[14];
    this.elements[15] += m.elements[15];
    return this;
  }


  /**
   * @param {Matrix4x4} m1 
   * @param {Matrix4x4} m2
   * @return {Matrix4x4}
   */
  static add(m1, m2) {
    const e1 = m1.elements;
    const e2 = m2.elements;
    return new Matrix4x4([
      e1[0] + e2[0], e1[1] + e2[1], e1[2] + e2[2], e1[3] + e2[3],
      e1[4] + e2[4], e1[5] + e2[5], e2[6] + e2[6], e1[7] + e2[7],
      e1[8] + e2[8], e1[9] + e2[9], e1[10] + e2[10], e1[11] + e2[11],
      e1[12] + e2[12], e1[13] + e2[13], e1[14] + e2[14], e1[15] + e2[15]
    ]);
  }

  /**
   * @param {Matrix4x4} m 
   * @return {Matrix4x4}
   */
  mult(m) {
    this.elements = Matrix4x4.mult(this, m).elements;
    return this;
  }

  /**
   * @param {Matrix4x4} m1 
   * @param {Matrix4x4} m2
   * @return {Matrix4x4} 
   */
  static mult(m1, m2) {
    const e1 = m1.elements;
    const e2 = m2.elements;
    return new Matrix4x4([
      e1[0] * e2[0] + e1[1] * e2[4] + e1[2] * e2[8] + e1[3] * e2[12],
      e1[0] * e2[1] + e1[1] * e2[5] + e1[2] * e2[9] + e1[3] * e2[13],
      e1[0] * e2[2] + e1[1] * e2[6] + e1[2] * e2[10] + e1[3] * e2[14],
      e1[0] * e2[3] + e1[1] * e2[7] + e1[2] * e2[11] + e1[3] * e2[15],

      e1[4] * e2[0] + e1[5] * e2[4] + e1[6] * e2[8] + e1[7] * e2[12],
      e1[4] * e2[1] + e1[5] * e2[5] + e1[6] * e2[9] + e1[7] * e2[13],
      e1[4] * e2[2] + e1[5] * e2[6] + e1[6] * e2[10] + e1[7] * e2[14],
      e1[4] * e2[3] + e1[5] * e2[7] + e1[6] * e2[11] + e1[7] * e2[15],

      e1[8] * e2[0] + e1[9] * e2[4] + e1[10] * e2[8] + e1[11] * e2[12],
      e1[8] * e2[1] + e1[9] * e2[5] + e1[10] * e2[9] + e1[11] * e2[13],
      e1[8] * e2[2] + e1[9] * e2[6] + e1[10] * e2[10] + e1[11] * e2[14],
      e1[8] * e2[3] + e1[9] * e2[7] + e1[10] * e2[11] + e1[11] * e2[15],

      e1[12] * e2[0] + e1[13] * e2[4] + e1[14] * e2[8] + e1[15] * e2[12],
      e1[12] * e2[1] + e1[13] * e2[5] + e1[14] * e2[9] + e1[15] * e2[13],
      e1[12] * e2[2] + e1[13] * e2[6] + e1[14] * e2[10] + e1[15] * e2[14],
      e1[12] * e2[3] + e1[13] * e2[7] + e1[14] * e2[11] + e1[15] * e2[15],
    ]);
  }

  /**
   * @param {number} n 
   * @return {Matrix4x4} this
   */
  multByScalar(n) {
    this.elements = Matrix4x4.multByScalar(this, n).elements;
    return this;
  }

  /**
   * @param {Matrix4x4} m 
   * @param {number} n
   * @return {Matrix4x4} 
   */
  static multByScalar(m, n) {
    const e = m.elements;
    return new Matrix4x4([
      n * e[0], n * e[1], n * e[2], n * e[3],
      n * e[4], n * e[5], n * e[6], n * e[7],
      n * e[8], n * e[9], n * e[10], n * e[14],
      n * e[12], n * e[13], n * e[14], n * e[15]
    ]);
  }

  /**
   * @param {number} aspect width / height
   * @param {number} vfov in degree
   * @param {number} near 
   * @param {number} far
   * @return {Matrix4x4}  
   */
  static perspective(aspect, vfov, near, far) {
    const theta = vfov * Math.PI / 180.0;
    const t = near * Math.tan(theta * 0.5);
    const r = aspect * t;
    const fpn = far + near;
    const fmn = far - near;

    return new Matrix4x4([
      near / r, 0.0, 0.0, 0.0,
      0.0, near / t, 0.0, 0.0,
      0.0, 0.0, -fpn / fmn, -1.0,
      0.0, 0.0, -2.0 * far * near / fmn, 0.0
    ]);
  }

  /**
   * @param {number} left 
   * @param {number} right 
   * @param {number} top 
   * @param {number} bottom 
   * @param {number} near 
   * @param {number} far
   * @param {Matrix4x4} 
   */
  static primitivePerspective(left, right, top, bottom, near, far) {
    const rpl = right + left;
    const rml = right - left;
    const tpb = top + bottom;
    const tmb = top - bottom;
    const fpn = far + near;
    const fmn = far - near;
    return new Matrix4x4([
      2.0 * near / rml, 0.0, 0.0, 0.0,
      0.0, 2.0 * near / tmb, 0.0, 0.0,
      rpl / rml, tpb / tmb, -fpn / fmn, -1.0,
      0.0, 0.0, -2.0 * near * far / fmn, 0.0
    ]);
  }

  /**
   * @param {Vector3} front 
   * @param {Vector3} up
   * @param {Matrix4x4}
   */
  static lookTo(front, up) {
    const z = Vector3.normalize(front).mult(-1);
    const x = Vector3.cross(up, z).normalize();
    const y = Vector3.cross(z, x).normalize();

    return new Matrix4x4([
      x.x, x.y, x.z, 0.0,
      y.x, y.y, y.z, 0.0,
      z.x, z.y, z.z, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]);
  }

  /**
   * @param {Vector3} position 
   * @param {Vector3} target
   * @param {Vector3} up
   */
  static lookAt(position, target, up) {
    return Matrix4x4.lookTo(Vector3.sub(target, position), up)
      .mult(Matrix4x4.translation(position.x, position.y, position.z));
  }
}