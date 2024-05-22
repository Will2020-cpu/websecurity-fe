import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

const UseFetchPost = <T,>({ setModal }: Props) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchPost(url: string = "", data: any) {
    setResponse(null);
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResponse(res);
      })
      .catch((err) => {
        console.log({ err });
        setError(true);
        setModal(false);
        setTimeout(() => {
          setError(false);
        }, 5000);
      })
      .finally(() => setLoading(false));
  }

  return {
    fetchPost,
    response,
    error,
    loading
  };
};

export default UseFetchPost;
