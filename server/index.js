import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { Modal, Box, Snackbar, Alert } from "@mui/material";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/tailwind-Sz05Z6RV.css";
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const links = () => [
  { rel: "stylesheet", href: stylesheet }
];
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/website-scanner.svg";
const UseFetchPost = ({ setModal }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function fetchPost(url = "", data) {
    setResponse(null);
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true"
      }
    }).then((res) => res.json()).then((res) => {
      console.log(res);
      setResponse(res);
    }).catch((err) => {
      console.log({ err });
      setError(true);
      setModal(false);
      setTimeout(() => {
        setError(false);
      }, 5e3);
    }).finally(() => setLoading(false));
  }
  return {
    fetchPost,
    response,
    error,
    loading
  };
};
function useHookScanner({ url }) {
  const [modal, setModal] = useState(false);
  const { fetchPost, response, error, loading } = UseFetchPost({ setModal });
  async function handleSubmit(e) {
    e.preventDefault();
    setModal(true);
    console.log(url);
    fetchPost("http://ec2-3-133-85-14.us-east-2.compute.amazonaws.com:8090/", {
      web: url
    });
  }
  return { handleSubmit, setModal, modal, response, error, loading };
}
function ModalModule({
  setModal,
  modal,
  children,
  sizeHeightPorcentage,
  sizeWidthPorcentage,
  disabledCloseModal
}) {
  const handleClose = () => {
    if (!disabledCloseModal) {
      setModal(false);
    }
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open: modal,
      onClose: () => setModal((prev) => !prev),
      "aria-labelledby": "modal-modal-title",
      "aria-describedby": "modal-modal-description",
      disableAutoFocus: disabledCloseModal,
      disableEscapeKeyDown: disabledCloseModal,
      BackdropProps: { onClick: handleClose },
      sx: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      children: /* @__PURE__ */ jsx(
        Box,
        {
          sx: {
            backgroundColor: "#233244",
            borderRadius: "10px",
            padding: "20px",
            maxHeight: `${sizeHeightPorcentage}%`,
            width: `${sizeWidthPorcentage}%`,
            border: "none",
            overflowY: "auto"
          },
          children
        }
      )
    }
  );
}
function Result({ response }) {
  console.log(response);
  function addColor(str) {
    switch (str) {
      case "Medium (High)":
        return { color: "orange", state: "warning" };
      case "Medium (Medium)":
        return { color: "#71701f", state: "caution" };
      case "Low (High)":
        return { color: "blue", state: "info" };
      case "Low (Medium)":
        return { color: "green", state: "normal" };
      case "Informational (Low)":
        return { color: "grey", state: "note" };
      case "Informational (Medium)":
        return { color: "#283868", state: "minor" };
      default:
        return { color: "red", state: str };
    }
  }
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-white text-2xl font-medium", children: "Alertas" }),
    response ? /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full gap-3", children: /* @__PURE__ */ jsx("div", { children: response.site.map((item) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex flex-col w-full gap-3 mt-2",
        children: item.alerts.map((alert) => {
          const { color, state } = addColor(alert.riskdesc);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-[15px] rounded shadow w-full flex flex-col gap-3 border border-[#1c2c3e]",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-bold truncate", children: alert.name }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `text-xs p-1 font-bold rounded-lg`,
                      style: { backgroundColor: color },
                      children: alert.riskdesc
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-100", children: alert.desc.replace(/<\/?p>/g, "") })
              ]
            },
            alert.cweid
          );
        })
      },
      item["@name"]
    )) }) }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 mt-2", children: Array.from({ length: 4 }).map((item, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "border border-[#1c2c3e] shadow rounded-md w-full p-[15px]",
        children: /* @__PURE__ */ jsx("div", { className: "animate-pulse flex space-x-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-6 py-1", children: [
          /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-700 rounded" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-700 rounded col-span-2" }),
              /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-700 rounded col-span-1" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-700 rounded" })
          ] })
        ] }) })
      },
      i
    )) })
  ] });
}
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  const [url, setUrl] = useState("");
  const { handleSubmit, modal, setModal, response, error, loading } = useHookScanner({
    url
  });
  return /* @__PURE__ */ jsxs("div", { className: "h-screen w-full p-60", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between content-center w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-8/12", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo,
            alt: "logo",
            className: "w-24 h-24 shadow-black shadow-2xl rounded-lg border-noned drop-shadow-lg"
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Website Vulnerability Scanner" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-8 shadow-2xl drop-shadow-lg w-4/12", children: /* @__PURE__ */ jsxs("form", { className: " mx-auto", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "url",
            className: "block mb-2 text-sm text-gray-900 font-semibold",
            children: "Your url"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            id: "url",
            required: true,
            "aria-describedby": "helper-text-explanation",
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "htps://url.com",
            onChange: (e) => setUrl(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "submit",
            className: "color mt-2 text-sky-900 p-2 rounded-lg text-sm w-full",
            value: "Scan"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      ModalModule,
      {
        modal,
        setModal,
        sizeHeightPorcentage: 80,
        sizeWidthPorcentage: 80,
        disabledCloseModal: modal ? loading : false,
        children: /* @__PURE__ */ jsx(Result, { response })
      }
    ),
    /* @__PURE__ */ jsx(
      Snackbar,
      {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        open: error,
        onClose: () => {
        },
        children: /* @__PURE__ */ jsx(Alert, { variant: "filled", severity: "error", children: "Error" })
      }
    )
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-bQwDtWjH.js", "imports": ["/assets/index-BL1rH8C1.js", "/assets/components-DG95zyRV.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B2CFtcPJ.js", "imports": ["/assets/index-BL1rH8C1.js", "/assets/components-DG95zyRV.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DtKO3mfr.js", "imports": ["/assets/index-BL1rH8C1.js"], "css": [] } }, "url": "/assets/manifest-7ae997e6.js", "version": "7ae997e6" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
