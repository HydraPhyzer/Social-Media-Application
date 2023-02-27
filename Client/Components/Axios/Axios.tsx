import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://localhost:7001/',
  });

  export default Instance