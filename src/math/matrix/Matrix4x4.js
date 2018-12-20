
class Matrix4x4 {
 
  /**
   * @param {array|Float32Array} elements 
   */
  constructor(elements) {
    this.elements = new Float32Array(elements);
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
    const s = sin(radian);
    const c = cos(radian);
    return new Matrix4x4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {number} radian 
   * @return {Matrix4x4}
   */
  static rotationY(radian) {
    const s = sin(radian);
    const c = cos(radian);
    return new Matrix4x4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @param {number} radian 
   * @return {Matrix4x4}
   */
  static rotationZ(radian) {
    const s = sin(radian);
    const c = cos(radian);
    return new Matrix4x4([
      s, c, 0, 0,
      -c, s, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

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
  }

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
    return new Matrix4x4([

    ])
  }
}