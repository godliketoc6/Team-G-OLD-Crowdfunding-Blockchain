import app from "./app";
import env from "../src/util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
})

