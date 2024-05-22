import type { MetaFunction } from "@remix-run/node";
import logo from "/website-scanner.svg";
import useHookScanner from "~/hook/useHookScanner";
import ModalModule from "~/Module/Modal";
import Result from "~/containers/home/components/Result";
import { Response } from "~/domain/Response";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [url, setUrl] = useState<string>("");
  const { handleSubmit, modal, setModal, response, error, loading } = useHookScanner({
    url,
  });
  return (
    <div className="h-screen w-full p-60">
      <div className="flex justify-between content-center w-full">
        <div className="w-8/12">
          <img
            src={logo}
            alt="logo"
            className="w-24 h-24 shadow-black shadow-2xl rounded-lg border-noned drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold">Website Vulnerability Scanner</h1>
        </div>
        <div className="bg-white rounded-lg p-8 shadow-2xl drop-shadow-lg w-4/12">
          <form className=" mx-auto" onSubmit={handleSubmit}>
            <label
              htmlFor="url"
              className="block mb-2 text-sm text-gray-900 font-semibold"
            >
              Your url
            </label>
            <input
              type="url"
              id="url"
              required
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="htps://url.com"
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type="submit"
              className="color mt-2 text-sky-900 p-2 rounded-lg text-sm w-full"
              value="Scan"
            />
          </form>
        </div>
      </div>
      <ModalModule
        modal={modal}
        setModal={setModal}
        sizeHeightPorcentage={80}
        sizeWidthPorcentage={80}
        disabledCloseModal={modal ? loading : false}
      >
        <Result response={response as Response} />
      </ModalModule>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        onClose={() => {}}
      >
        <Alert variant="filled" severity="error">
         Error
        </Alert>
      </Snackbar>
    </div>
  );
}
