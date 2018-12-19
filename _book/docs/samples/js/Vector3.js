class Vector3 {

  /**
   * @constructor
   * @param {number} x 
   * @param {number} y 
   * @param {number} z 
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @return {number}
   */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * @param {Vector3} v
   * @return {number}
   */
  static magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  /**
   * @return {Vector3} this
   */
  normalize() {
    const m = this.magnitude();
    this.x /= m;
    this.y /= m;
    this.z /= m;
    return this;
  }

  /**
   * @param {Vector3} v
   * @return {Vector3} 
   */
  static normalize(v) {
    const m = v.magnitude();
    return new Vector3(v.x / m, v.y / m, v.z / m);
  }

  /**
   * @param {Vector3} v
   * @return {Vector3} this
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  /**
   * @param {Vector3} v1 
   * @param {Vector3} v2 
   * @return {Vector3}
   */
  static add(v1, v2) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  /**
   * @param {Vector3} v
   * @return {Vector3} this 
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  /**
   * @param {Vector3} v1 
   * @param {Vector3} v2 
   * @return {Vector3}
   */
  static sub(v1, v2) {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  /**
   * @param {number} n
   * @return {Vector3} this
   */
  mult(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  /**
   * @param {Vector3} v 
   * @param {number} n 
   * @return {Vector3}
   */
  static mult(v, n) {
    return new Vector3(v.x * n, v.y * n, v.z * n);
  }

  /**
   * @param {Vector3} v1
   * @param {Vector3} v2
   * @return {number}
   */
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  /**
   * @param {Vector3} v1 
   * @param {Vector3} v2
   * @return {Vector3}
   */
  static cross(v1, v2) {
    return new Vector3(
      v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x
    );
  }

}