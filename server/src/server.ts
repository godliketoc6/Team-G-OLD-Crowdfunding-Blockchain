import app from "./app";
import env from "../src/util/validateEnv";
import mongoose from "mongoose";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});

// export const sdk = new ThirdwebSDK("sepolia", {
//   secretKey: process.env.THIRDWEB_SECRET_KEY,
// });
