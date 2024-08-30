import  {cleanEnv, port, str} from "envalid";

export default cleanEnv(process.env,{
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    STRIPE_SECRET_KEY: str(), // Add this line
})