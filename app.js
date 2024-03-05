import { config } from "dotenv";
config();
import Sever from './configs/server.js';

const server = new Server();

server.listen();