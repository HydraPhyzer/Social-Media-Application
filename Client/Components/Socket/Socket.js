import { io } from "socket.io-client";

const socket = io("http://localhost:7963");

export default socket;
