import app from "./app";
import os from "os";

const PORT = 8000;
const networkInterfaces = os.networkInterfaces();

function getLocalIpAddress() {
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

const myIp = getLocalIpAddress();

app.listen(PORT, () => {
  console.log(`Server listening @ http://localhost:${PORT}`);
  // local IP
  console.log(`Server listening @ http://${myIp}:${PORT}`);
});
