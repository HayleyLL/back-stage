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

export const postConfigPromise = (url, key, value) => {
  return axios({
    method: "post",
    url,
    data: {
      key,
      value,
    },
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const putConfigPromise = (url, key, value, id) => {
  return axios({
    method: "put",
    url,
    data: {
      key,
      value,
      id,
    },
    headers: { Authorization: localStorage.getItem("token") },
  });
};
