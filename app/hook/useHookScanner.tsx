import { useState } from "react";
import UseFetchPost from "./UseFetchPost";
import { Response } from "~/domain/Response";

type Props = {
  url: string;
};
export default function useHookScanner({ url }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const { fetchPost, response, error, loading } = UseFetchPost<Response>({setModal});

  //add e for event the form
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setModal(true);
    console.log(url);
    fetchPost("http://ec2-3-133-85-14.us-east-2.compute.amazonaws.com:8090/", {
      web: url,
    });
  }
  return { handleSubmit, setModal, modal, response, error, loading };
}
