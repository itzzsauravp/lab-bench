const { Worker } = require("bullmq");
const Redis = require("ioredis");
const { execSync } = require("child_process");
const path = require("path");

const connection = new Redis({ maxRetriesPerRequest: null });

const worker = new Worker(
  "image-processing",
  async (job) => {
    const { inputPath, fileName, x, y, width, height } = job.data;

    const nameOnly = path.parse(fileName).name;
    const outputPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads-cropped",
      `cropped-${nameOnly}.png`,
    );

    console.log(`Working on: ${nameOnly}...`);

    execSync(
      `vips crop ${inputPath} ${outputPath} ${x} ${y} ${width} ${height}`,
    );

    return { outputPath };
  },
  {
    connection,
    concurrency: 1,
  },
);

worker.on("completed", (job) => console.log(`Finished ${job.id}`));
worker.on("failed", (job, err) =>
  console.error(`Failed ${job.id}: ${err.message}`),
);
