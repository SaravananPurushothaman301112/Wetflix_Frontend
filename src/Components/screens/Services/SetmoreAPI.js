import config from "../../Config/config.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const commonFetch = async (url, Method, bodyData, headerData, paramsData) => {

  const URL = config.SET_MORE + url;
  const navigate=useNavigate()

  let paramsHeader = {};
 
//   if (headerData === true) {
   
   
//     paramsHeader = {
//       "x-auth-token": `${authUser.accessToken}`,
//     };
//   } 


  let headerComponent = {
    method: Method, 
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Host: window.location.host,
      Accept: "*/*",
      Connection: "keep-alive",
      ...paramsHeader,
    },
    data: bodyData ? ("body", bodyData) : null,
    params: paramsData ? ("query", paramsData) : null,
  };

  let result;

  await axios(headerComponent)

    .then((res) => (result = (res.data)))
    .catch(
      (err) =>
        (result = (err.response.data))
      );


  return result;
};

export const Service = {
  commonFetch,
};
