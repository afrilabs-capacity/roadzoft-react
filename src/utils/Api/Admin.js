import React from "react";
import axios from "axios";

let prefix = "http://localhost:3000/api";

export default {
  GET_MESSAGES: async (headers) => {
    return await axios.get(prefix + "/messages", headers);
  },
};
