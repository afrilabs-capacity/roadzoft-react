import React from "react";
import axios from "axios";

let prefix = "http://roadzoft.test/api";

export default {
  LOGIN: (payload, headers) => {
    return axios.post(prefix + "/login", payload, headers);
  },
};
