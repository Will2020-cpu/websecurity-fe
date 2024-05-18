import { useState } from "react";
import dataJSON from "../containers/mock/data.json";

const UseFetchPost = <T, E>() => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  async function fetchPost(url: string = "", data: any) {
    setResponse(null);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials":"true"
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResponse(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setResponse(dataJSON as T);
      });
  }

  return {
    fetchPost,
    response,
    error,
  };
};

export default UseFetchPost;
