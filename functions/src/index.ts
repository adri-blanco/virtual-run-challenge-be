import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";

if (process.env.NODE_ENV === "local") {
  app.listen(3000, () => {
    console.log("Example app listening on port 3000");
  });
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const functions = require("firebase-functions");
  exports.app = functions.https.onRequest(app);
}
