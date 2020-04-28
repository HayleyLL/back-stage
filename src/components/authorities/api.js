import axios from "axios";

export const getPromise = (url, pageNum, pageSize) => {
  return axios({
    method: "get",
    url,
    params: {
      pageNum,
      pageSize,
    },
    headers: { Authorization: localStorage.getItem("token") },
  });
};
