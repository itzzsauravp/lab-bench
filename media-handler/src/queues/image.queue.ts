import { Queue } from "bullmq";
import connection from "src/configs/redis.config";

const imageQueue = new Queue("image-processing", { connection });

export default imageQueue;
