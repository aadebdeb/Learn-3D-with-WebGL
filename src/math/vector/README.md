# Vector

$$
\vec{a} = \left(
    \begin{array}{c}
      a_1 \\
      a_2 \\
      \vdots \\
      a_n
    \end{array}
  \right)
$$

WebGLで使用するGLSLはベクトルを列行列として扱うので、以下では列ベクトルで記述していきます。

3Dで最もよく使う3次元ベクトルを考えていきます。

$$
\vec{v} = \left(
    \begin{array}{c}
      x \\
      y \\
      z
    \end{array}
  \right)
$$

3次元ベクトルは3D空間上の位置や方向だけではなく、色を表すために使われます。

`Vector3`クラスを定義していきます。

```js
class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
```

## ベクトルの大きさ

```js
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
```

## 正規化

大きさが1のベクトルのことを**単位ベクトル**と呼び、あるベクトルを単位ベクトルにすることを**正規化**と呼びます。

```

```

## 四則演算

#### 加算

$$
\vec{v_1} + \vec{v_2}
=
\left(
\begin{array}{c}
  x_1 \\
  y_1 \\
  z_1
\end{array}
\right)
+
\left(
\begin{array}{c}
  x_2 \\
  y_2 \\
  z_2
\end{array}
\right)
=
\left(
\begin{array}{c}
x_1 + x_2 \\
y_1 + y_2 \\
z_1 + z_2
\end{array}
\right)
$$

```js
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
```

##### 減算

`sub`は`subtract`の略です。

##### 乗算

##### 除算


## 内積 (ドット積)

ベクトルの内積は2つのベクトルから求められるスカラー値です。
$$\vec{v_1} \cdot \vec{v_2}$$と数式で表すことからドット積とも呼ばれます。

$$
\vec{v_1} = \left(
    \begin{array}{c}
      x_1 \\
      y_1 \\
      z_1
    \end{array}
  \right)
,
\vec{v_2} = \left(
    \begin{array}{c}
      x_2 \\
      y_2 \\
      z_2
    \end{array}
  \right)
$$

$$
\vec{v_1} \cdot \vec{v_2} = |\vec{v_1}||\vec{v_2}|cos\theta = x_1 x_2 + y_1 y_2 + z_1 z_2
$$

$$\theta$$は2つのベクトルがなす角です。

```js
  /**
   * @param {Vector3} v1
   * @param {Vector3} v2
   * @return {number}
   */
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }
```

2つのベクトルが単位ベクトルのときに$$\vec{v_1} \cdot \vec{v_2} = cos\theta$$となるため、2つのベクトルがどれくらい同じ方向を向いているかを求めることができます。

## 外積 (クロス積)

外積は2つのベクトルから求められるベクトルです。
$$\vec{v_1} \times \vec{v_2}$$と数式で表すことからクロス積とも呼ばれます。
他の演算と異なり、3次元ベクトルのみでしか定義されていません。

$$
\vec{v_1} = \left(
    \begin{array}{c}
      x_1 \\
      y_1 \\
      z_1
    \end{array}
  \right)
,
\vec{v_2} = \left(
    \begin{array}{c}
      x_2 \\
      y_2 \\
      z_2
    \end{array}
  \right)
$$

$$
\vec{v_1} \times \vec{v_2} = \left(
    \begin{array}{c}
      y_1 z_2 - z_1 y_2 \\
      z_1 x_2 - x_1 z_2 \\
      x_1 y_2 - y_1 x_2
    \end{array}
  \right)
$$

```js
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
```

3Dでは直交基底を求めるためなどにクロス積を使用します。

## ソースコード全体