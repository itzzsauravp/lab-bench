export default class VertexArray {
  #dynamic_vertex_array = [];

  constructor() { }

  get dyn_vertex_arr() {
    return [...this.#dynamic_vertex_array];
  }

  get desmos_plot() {
    return this.#dynamic_vertex_array
      .map((item) => `(${item.x}, ${item.y})`)
      .join("\n");
  }

  push_vertex(vertex) {
    this.#dynamic_vertex_array.push(vertex);
  }
}