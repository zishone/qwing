import app from "./App";
import { config } from "./config/config";

const port = config.app.port;

app.listen(port, () => {
  console.log("INFO: Accepting connections at http://localhost:" + port);
});
