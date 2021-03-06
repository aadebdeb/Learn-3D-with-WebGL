# 行列

### Identity Matrix (単位行列) 

### Translation (平行移動)

$$
T = \left(
  \begin{array}{cccc}
    1 & 0 & 0 & t_x \\
    0 & 1 & 0 & t_y \\
    0 & 0 & 1 & t_z \\
    0 & 0 & 0 & 1
  \end{array}
\right)
$$

### Rotation (回転)

#### X軸を中心とした回転

$$
R_x = \left(
  \begin{array}{cccc}
    1 & 0 & 0 & 0 \\
    0 & 1 & 0 & 0 \\
    0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 1
  \end{array}
\right)
$$

#### Y軸を中心とした回転


#### Z軸を中心とした回転


### Scale (拡大・縮小)

$$
S = \left(
  \begin{array}{cccc}
    s_x & 0 & 0 & 0 \\
    0 & s_y & 0 & 0 \\
    0 & 0 & s_z & 0 \\
    0 & 0 & 0 & 1
  \end{array}
\right)
$$

### Determinant (行列式)

### Inverse Matrix (逆行列)

随伴行列
余因子行列

行列式の逆数をかけたもの

### 四則演算

#### 加算

$$
A = \left(
  \begin{array}{cccc}
    a_{00} & a_{01} & a_{02} & a_{03} \\
    a_{10} & a_{11} & a_{12} & a_{13} \\
    a_{20} & a_{21} & a_{22} & a_{23} \\
    a_{30} & a_{31} & a_{32} & a_{33}
  \end{array}
\right)
,
B = \left(
  \begin{array}{cccc}
    b_{00} & b_{01} & b_{02} & b_{03} \\
    b_{10} & b_{11} & b_{12} & b_{13} \\
    b_{20} & b_{21} & b_{22} & b_{23} \\
    b_{30} & b_{31} & b_{32} & b_{33}
  \end{array}
\right)
$$

$$
A + B = \left(
  \begin{array}{cccc}
    a_{00} + b_{00} & a_{01} + b_{01} & a_{02} + b_{02} & a_{03} + b_{03} \\
    a_{10} + b_{10} & a_{11} + b_{11} & a_{12} + b_{12} & a_{13} + b_{13} \\
    a_{20} + b_{20} & a_{21} + b_{21} & a_{22} + b_{22} & a_{23} + b_{23} \\
    a_{30} + b_{30} & a_{31} + b_{31} & a_{32} + b_{32} & a_{33} + b_{33}
  \end{array}
\right)
$$

#### 減算

$$
A - B = \left(
  \begin{array}{cccc}
    a_{00} - b_{00} & a_{01} - b_{01} & a_{02} - b_{02} & a_{03} - b_{03} \\
    a_{10} - b_{10} & a_{11} - b_{11} & a_{12} - b_{12} & a_{13} - b_{13} \\
    a_{20} - b_{20} & a_{21} - b_{21} & a_{22} - b_{22} & a_{23} - b_{23} \\
    a_{30} - b_{30} & a_{31} - b_{31} & a_{32} - b_{32} & a_{33} - b_{33}
  \end{array}
\right)
$$

#### 乗算

#### 除算