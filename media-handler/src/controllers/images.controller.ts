import path from "node:path";
import { execSync } from "node:child_process";
import type { Request, Response } from "express";
import { Worker } from "node:worker_threads";
import imageQueue from "src/queues/image.queue";

export default class ImageController {
  public getIndexPage = (req: Request, res: Response) => {
    res.render("images/index", {
      title: "Images | Index",
    });
  };

  public cropImageSync = (req: Request, res: Response) => {
    const inputPath = req.file.path;
    const outputPath = path.join(
      "uploads-cropped",
      `cropped-${req.file.filename}`,
    );

    const { height, width, x, y } = req.body;

    try {
      console.log("Blocking Event Loop... Starting Crop.");

      execSync(
        `vips crop ${inputPath} ${outputPath} ${x} ${y} ${width} ${height}`,
      );

      console.log("Crop Finished. Event Loop Resumed.");
      res.render("images/feedback", {
        fileUrl: `/output/cropped-${req.file.filename}`,
        fileName: `cropped-${req.file.filename}`,
      });
    } catch (error) {
      console.error("Crop failed:", error.message);
      res.status(500).send("System Error during Blocking Crop.");
    }
  };

  public cropImageWorker = (req: Request, res: Response) => {
    const { height, width, x, y } = req.body;
    const data = {
      fileName: path.parse(req.file.filename).name,
      inputPath: req.file.path,
      width: parseInt(width),
      height: parseInt(height),
      x: parseInt(x),
      y: parseInt(y),
    };
    const worker = new Worker(
      path.join(__dirname, "..", "workers", "image-crop.worker.js"),
      {
        workerData: data,
      },
    );
    worker.on("message", (result) => {
      console.log("The result is:", result);
      res.send(`The result is: ${result}`);
    });
  };

  public cropImageQueue = (req: Request, res: Response) => {
    // might have to do a try catch here
    const { height, width, x, y } = req.body;
    console.log(
      "The file path is:",
      path.join(__dirname, "..", "..", req.file.path),
    );
    imageQueue.add("crop-image", {
      inputPath: path.join(__dirname, "..", "..", req.file.path),
      fileName: path.parse(req.file.filename).name,
      height,
      width,
      x,
      y,
    });
    res.send({
      successs: true,
      message: "Your crop image job has been added to the queue",
    });
  };
}

/*
 * Normal Req, Res
 * processing is blocking. So if a lot of users request and try to process images at the sametime then there occurs a block as the execSync is a blocing function it wont let go of the main thread until and unless one of the queue completes
 *
 * Worker
 * This solves the problem for the waiting user. Because in this case every req creates a new thread, Spins up a new thread so that each of the user gets their own thread so there wont be any blocking. But the problem here is the same if there are many users send request to this route then the CPU will be overwhelmed and the server will crash
 *
 * Queue (Bull Mq)
 *  The queue solve this problem by just letting the server process 2 or few requests at a time. The rest of the requests are in a queue in Redis and the server takes 2 or few requests from the queue in memory and then executes those jobs
 */
