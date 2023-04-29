import { io } from "socket.io-client";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://reveal.crtil.com/socket-api"
    : "http://localhost:3333";
// new port for client 4111 nginx

export const socket = io(baseURL);
