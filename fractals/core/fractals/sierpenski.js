import Canvas from "../class/Canvas.js";
import Vertex from "../class/Vertex.js"
import VertexArray from "../class/VertexArray.js"
import Triangle from "../class/Triangle.js"
import { get_mid_point, rand } from "../../helpers/index.js"

const canvas = document.getElementById("fractalCanvas");
const ctx = canvas.getContext("2d");
const canvasObject = new Canvas(ctx);

const a = new Vertex(640, 40);
const b = new Vertex(60, 680);
const c = new Vertex(1220, 680);

const poly = new Triangle(a, b, c);

const vxa = new VertexArray();
let current_point = poly.random_point_within;

export function render_serpenski_triangle() {
    for (let i = 0; i < 1_00_000; i++) {
        let vertex_choice;

        vertex_choice = Math.floor(Math.random() * poly.sides);

        const polygons_vertex = poly.get_vertex_from_choice(vertex_choice);
        const midpoint = get_mid_point(current_point, polygons_vertex);

        vxa.push_vertex(midpoint);
        current_point = midpoint;
    }


    vxa.dyn_vertex_arr.forEach((point, index) => {
        // move this out of here for solid color changes, if in here it will just pick random colors for each pixel
        canvasObject.fillStyle = `rgba(${rand(255)}, ${rand(255)}, ${rand(255)}, ${Math.random()})`;

        // this the the equivalent of doing .plot(point.x, point.y) but can replace "." with anything
        canvasObject.plot_text(point.x, point.y, ".")
    });

    // this is for infinite loop
    // requestAnimationFrame(render_serpenski_triangle);
}
