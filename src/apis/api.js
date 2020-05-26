import axios from "axios";

export const getResponse = (url, pageNum, pageSize) => {
  return axios({
    method: "get",
    url,
    params: {
      pageNum,
      pageSize,
    },
  }).then(response => {
    return response.data;
  });
};

export const getPromise = (url, pageNum, pageSize) => {
  return axios({
    method: "get",
    url,
    params: {
      pageNum,
      pageSize,
    },
  });
};

// todo: 放到configApi.js里面去
export const postConfigPromise = (url, key, value) => {
  return axios({
    method: "post",
    url,
    data: {
      key,
      value,
    },
  });
};

// todo: 放到configApi.js里面去
export const putConfigPromise = (url, key, value, id) => {
  return axios({
    method: "put",
    url,
    data: {
      key,
      value,
      id,
    },
  });
};
