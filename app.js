import { config } from "dotenv";
config();
import Server from "./configs/server.js";

const PORT = process.env.PORT
const server = new Server();

server.listen(PORT, () => {
    console.log(`Servidor levantado en ${PORT}`)
});