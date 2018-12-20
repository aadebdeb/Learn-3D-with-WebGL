# Perspective Camera (射影投影カメラ)

#### 行列



$$
Projection Matrix = \left(
  \begin{array}{cccc}
    \frac{2n}{r-l}  & 0 & \frac{r+l}{r-l} & 0 \\
    0 & \frac{2n}{t-b} & 0 & 0 \\
    \frac{r+l}{r-l} & \frac{t+b}{t-b} & \frac{-(f+n)}{f-n} & -1 \\
    0 & 0 & \frac{-2fn}{f-n} & 0
  \end{array}
\right)
$$

これだと使いづらいので、

#### 行列の導出




$$
Projection Matrix = \left(
  \begin{array}{cccc}
    \frac{n}{r}  & 0 & 0 & 0 \\
    0 & \frac{n}{t} & 0 & 0 \\
    0 & 0 & \frac{-(f+n)}{f-n} & -1 \\
    0 & 0 & -1 & 0
  \end{array}
\right)
$$

rとtは画面のアスペクト比を考慮する必要がある。

$$t=ntan(\theta * 0.5)$$、$$r=aspect * t$$

#### プログラム

#### デモ


#### 参考

* [OpenGL Projection Matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html)