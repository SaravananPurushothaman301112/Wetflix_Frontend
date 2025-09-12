import config from "../../Config/config.json";
import axios from "axios";

// Function to refresh token every 30 seconds
const refreshAccessToken = async () => {
  console.log(` Attempting to refresh token at ${new Date().toLocaleTimeString()}`);

  try {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (!authData?.refreshToken) {
      console.warn(" No refresh token found, redirecting to login...");
      clearInterval(refreshInterval);
      localStorage.removeItem("auth");
      window.location.href = "/";
      return;
    }

    const response = await axios.post("https://api.dev.wetflix.net/api/refresh", {
      refreshToken: authData.refreshToken,
    });

    if (response.status === 200 && response.data?.data?.authToken) {
      authData.accessToken = response.data.data.authToken;
      authData.refreshToken = response.data.data.refreshToken;

      localStorage.setItem("auth", JSON.stringify(authData));
      console.log(` Token refreshed successfully at ${new Date().toLocaleTimeString()}`);
    } else {
      console.error(` Token refresh failed (Unexpected Response)`, response.data);
      clearInterval(refreshInterval);
      localStorage.removeItem("auth");
      window.location.href = "/";
    }
  } catch (error) {
    console.error(` Token refresh failed | Error:`, error.response?.data || error.message);
    clearInterval(refreshInterval);
    localStorage.removeItem("auth");
    window.location.href = "/";
  }
};


const refreshInterval = setInterval(refreshAccessToken, 2 * 60 * 60 * 1000 + 50 * 60 * 1000); // refresh for every 2 hours 50 minutes
// Common Fetch Function
const commonFetch = async (url, Method, bodyData, headerData, paramsData) => {
  const URL = config.SM_DEV_BASE_URL + url;

  let paramsHeader = {};
  if (headerData === true) {
    const authUser = JSON.parse(localStorage.getItem("auth"));
    paramsHeader = {
      "x-auth-token": `${authUser?.accessToken}`,
    };
  }

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
    data: bodyData || null,
    params: paramsData || null,
  };

  try {
    const response = await axios(headerComponent);
    console.log(" API Response:", response);
    return response.data;
  } catch (err) {
    console.error(" API Call Error:", err.response?.data || err.message);

    // Check if the token expired (401 Unauthorized)
    if (err.response?.status === 401) {
      console.warn(" Token expired, retrying with refreshed token...");

      await refreshAccessToken();

      // Retry the request after refreshing token
      const authUser = JSON.parse(localStorage.getItem("auth"));
      if (authUser?.accessToken) {
        headerComponent.headers["x-auth-token"] = authUser.accessToken;
        try {
          const retryResponse = await axios(headerComponent);
          return retryResponse.data;
        } catch (retryError) {
          console.error(" Retry Failed:", retryError.response?.data || retryError.message);
        }
      }
    }

    return err.response?.data || { error: "Unexpected error occurred" };
  }
};

export const Service = {
  commonFetch,
};
