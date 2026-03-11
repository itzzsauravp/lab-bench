import Vertex from "./Vertex.js";

export default class Triangle {
  constructor(vertex_a, vertex_b, vertex_c) {
    this.vertex_a = vertex_a;
    this.vertex_b = vertex_b;
    this.vertex_c = vertex_c;
  }

  get_vertex_from_choice(number) {
    if (number === 0) {
      return this.vertex_a;
    } else if (number === 1) {
      return this.vertex_b;
    } else {
      return this.vertex_c;
    }
  }

  get sides() {
    return 3;
  }

  get coordinates() {
    return { a: this.vertex_a, b: this.vertex_b, c: this.vertex_c };
  }

  get random_point_within() {
    const x = Math.floor(
      (this.vertex_a.x + this.vertex_b.x + this.vertex_c.x) / 2,
    );
    const y = Math.floor(
      (this.vertex_a.y + this.vertex_b.y + this.vertex_c.y) / 2,
    );
    return new Vertex(x, y);
  }
}