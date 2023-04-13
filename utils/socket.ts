import { socketApi } from "./baseURL";
import { io } from "socket.io-client";
export const socket = io(socketApi);
