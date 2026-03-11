import express from "express";
import path from "path";
import imageRouter from "./routes/images.route";
import imageQueue from "./queues/image.queue";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

const app = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(imageQueue)],
  serverAdapter: serverAdapter,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/crop/images", imageRouter);

app.use("/output", express.static(path.resolve("uploads-cropped")));
app.use("/admin/queues", serverAdapter.getRouter());

export default app;
