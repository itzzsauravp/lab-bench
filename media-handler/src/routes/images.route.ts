import { Router } from "express";
import ImageController from "src/controllers/images.controller";
import MulterInterceptor from "src/libs/multer.lib";

const imgController = new ImageController();

const fileInterceptor = MulterInterceptor({
  type: "single",
  fieldName: "image",
  path: ["uploads"],
  timestamp: true,
  sizeInMegaByte: 4 * 1024, // 4GB caps
  allowedTypes: ["image/png", "image/jpg", "image/gif", "image/jpeg"],
});

const imageRouter = Router();

imageRouter.get("/", imgController.getIndexPage);
imageRouter.post("/sync", fileInterceptor, imgController.cropImageSync);
imageRouter.post("/worker", fileInterceptor, imgController.cropImageWorker);
imageRouter.post("/queue", fileInterceptor, imgController.cropImageQueue);

export default imageRouter;
