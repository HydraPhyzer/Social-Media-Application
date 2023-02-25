import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://localhost:6001/',
  });

  export default Instance