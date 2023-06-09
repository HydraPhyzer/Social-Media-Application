import { io } from "socket.io-client";

const socket = io("http://localhost:6944");

export default socket;
