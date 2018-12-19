class Vector3 {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @return {number}
   */
  magnitude() {
    Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * @param {Vector3} v
   * @return {number}
   */
  static magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }


  normalize() {
    const l = this.magnitude();
    this.x /= l;
    this.y /= l;
    this.z /= l;
  }

  /**
   * @param {Vector3} v 
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }

  /**
   * @param {Vector3} v1 
   * @param {Vector3} v2 
   * @return {Vector3}
   */
  static add(v1, v2) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }

  static sub(v1, v2) {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  mult(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
  }

  static mult(v1, v2) {
    return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
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