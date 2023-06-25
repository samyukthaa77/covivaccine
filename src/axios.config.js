import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: "http://localhost:8000",
});

axios.interceptors.request.use((request) => {
  const userDataStr = localStorage.getItem("user");
  if (userDataStr && userDataStr.length > 0 && userDataStr!="null") {
    const userData = JSON.parse(userDataStr);
    const reqData = {
      ...request.data,
      userId: userData.id,
    };
    request.data = reqData;
  }
  return request;
});

export default axios;
