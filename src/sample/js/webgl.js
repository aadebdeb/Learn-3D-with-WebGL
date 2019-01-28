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
  };

  webgl.createProgram = function(gl, vertexSource, fragmentSource) {
    const program = gl.createProgram();
    gl.attachShader(program, webgl.createShader(gl, vertexSource, gl.VERTEX_SHADER));
    gl.attachShader(program, webgl.createShader(gl, fragmentSource, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  };

  webgl.createVbo = function(gl, array) {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  };

  webgl.createIbo = function(gl, array) {
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
  };

  webgl.createVao = function(gl, ibo, vboObjs) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    vboObjs.forEach((vboObj, idx) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, vboObj.buffer);
      gl.enableVertexAttribArray(idx);
      gl.vertexAttribPointer(idx, vboObj.size, gl.FLOAT, false, 0, 0);
    });
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vao;
  };

  webgl.createTexture = function(gl, width, height, options) {
    options = options !== undefined ? options : {};
    const internalFormat = options.internalFormat !== undefined ? options.internalFormat : gl.RGBA;
    const format = options.format !== undefined ? options.format : gl.RGBA;
    const type = options.type !== undefined ? options.type : gl.UNSIGNED_BYTE;
    const filter = options.filter !== undefined ? options.filter : gl.LINEAR;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  };

  webgl.createFramebuffer = function(gl, width, height) {
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    const colorTexture = webgl.createTexture(gl, width, height);
    gl.bindTexture(gl.TEXTURE_2D, colorTexture);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);

    const depthTexture = webgl.createTexture(gl, width, height, {
      format: gl.DEPTH_COMPONENT,
      internalFormat: gl.DEPTH_COMPONENT16,
      type: gl.UNSIGNED_SHORT,
      filter: gl.NEAREST
    });
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);

    gl.bindTexture(gl.TEXTURE_2D, null);
  
    return {
      framebuffer: framebuffer,
      colorTexture: colorTexture,
      depthTexture: depthTexture
    };
  };

  webgl.getUniformLocations = function(gl, program, names) {
    const locations = {};
    names.forEach((name) => {
      locations[name] = gl.getUniformLocation(program, name);
    });
    return locations;
  };

}());