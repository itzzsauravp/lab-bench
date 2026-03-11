export default class Canvas {
    constructor(ctx) {
        this.ctx = ctx
    }

    set fillStyle(val) {
        this.ctx.fillStyle = val;
    }

    plot(x, y) {
        this.ctx.fillRect(x, y, 1, 1);
    }

    plot_text(x, y, val) {
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "8px monospace";
        this.ctx.fillText(val, x, y)
    }
}