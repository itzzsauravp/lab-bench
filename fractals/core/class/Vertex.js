export default class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get info() {
    console.log(`Vertex {x: ${this.x}, y: ${this.y}}`);
  }
}