const webgl = {};

(function() {

  webgl.createShader = function(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) + source);
    }
    return shader;
  }

  webgl.createProgram = function(gl, vertexSource, fragmentSource) {
    const program = gl.createProgram();
    gl.attachShader(program, webgl.createShader(gl, vertexSource, gl.VERTEX_SHADER));
    gl.attachShader(program, webgl.createShader(gl, fragmentSource, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }

  webgl.createVbo = function(gl, array) {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  }

  webgl.createIbo = function(gl, array) {
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
  }

  webgl.getUniformLocations = function(gl, program, names) {
    const locations = {};
    names.forEach((name) => {
      locations[name] = gl.getUniformLocation(program, name);
    });
    return locations;
  }

}());