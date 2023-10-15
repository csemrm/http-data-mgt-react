import { useState, useCallback } from "react";

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (reqestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    console.log(reqestConfig);

    try {
      const response = await fetch(reqestConfig.url, {
        method: reqestConfig.method ? reqestConfig.method : "GET",
        headers: reqestConfig.headers ? reqestConfig.headers : {},
        body: reqestConfig.body ? JSON.stringify(reqestConfig.body) : null,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      console.log(data);
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHTTP;
