const { execSync } = require("node:child_process");
const path = require("node:path");
const { parentPort, workerData } = require("node:worker_threads");

console.log("This is worker data: ", workerData);

function imageCropper(data) {
  console.log("This is the worker data in imageCropper:", data);
  const { inputPath, fileName, height, width, x, y } = data;
  const outputPath = path.join("uploads-cropped", `cropped-${fileName}.png`);

  try {
    console.log("Blocking Event Loop... Starting Crop.");

    execSync(
      `vips crop ${inputPath} ${outputPath} ${x} ${y} ${width} ${height}`,
    );

    console.log("Crop Finished. Event Loop Resumed.");
    return outputPath;
  } catch (error) {
    console.error("Crop failed:", error.message);
  }
}
parentPort.postMessage(imageCropper(workerData));
