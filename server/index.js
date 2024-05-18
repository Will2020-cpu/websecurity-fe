import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
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
const stylesheet = "/websecurity-fe/assets/tailwind-Sz05Z6RV.css";
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
const logo = "/websecurity-fe/website-scanner.svg";
const site = [
  {
    "@name": "https://example.com",
    "@host": "example.com",
    "@port": "443",
    "@ssl": "true",
    alerts: [
      {
        pluginid: "10038",
        alertRef: "10038-1",
        alert: "Content Security Policy (CSP) Header Not Set",
        name: "Content Security Policy (CSP) Header Not Set",
        riskcode: "2",
        confidence: "3",
        riskdesc: "Medium (High)",
        desc: "<p>Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.</p>",
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "",
            attack: "",
            evidence: "",
            otherinfo: ""
          },
          {
            uri: "https://example.com/robots.txt",
            method: "GET",
            param: "",
            attack: "",
            evidence: "",
            otherinfo: ""
          },
          {
            uri: "https://example.com/sitemap.xml",
            method: "GET",
            param: "",
            attack: "",
            evidence: "",
            otherinfo: ""
          }
        ],
        count: "3",
        solution: "<p>Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.</p>",
        otherinfo: "",
        reference: "<p>https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy</p><p>https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html</p><p>https://www.w3.org/TR/CSP/</p><p>https://w3c.github.io/webappsec-csp/</p><p>https://web.dev/articles/csp</p><p>https://caniuse.com/#feat=contentsecuritypolicy</p><p>https://content-security-policy.com/</p>",
        cweid: "693",
        wascid: "15",
        sourceid: "6"
      },
      {
        pluginid: "10020",
        alertRef: "10020-1",
        alert: "Missing Anti-clickjacking Header",
        name: "Missing Anti-clickjacking Header",
        riskcode: "2",
        confidence: "2",
        riskdesc: "Medium (Medium)",
        desc: "<p>The response does not include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options to protect against 'ClickJacking' attacks.</p>",
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "x-frame-options",
            attack: "",
            evidence: "",
            otherinfo: ""
          }
        ],
        count: "1",
        solution: `<p>Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.</p><p>If you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's "frame-ancestors" directive.</p>`,
        otherinfo: "",
        reference: "<p>https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options</p>",
        cweid: "1021",
        wascid: "15",
        sourceid: "6"
      },
      {
        pluginid: "10036",
        alertRef: "10036",
        alert: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
        name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
        riskcode: "1",
        confidence: "3",
        riskdesc: "Low (High)",
        desc: '<p>The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.</p>',
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "",
            attack: "",
            evidence: "ECAcc (mid/872E)",
            otherinfo: ""
          },
          {
            uri: "https://example.com/robots.txt",
            method: "GET",
            param: "",
            attack: "",
            evidence: "ECAcc (mid/872F)",
            otherinfo: ""
          },
          {
            uri: "https://example.com/sitemap.xml",
            method: "GET",
            param: "",
            attack: "",
            evidence: "ECAcc (mid/870D)",
            otherinfo: ""
          }
        ],
        count: "3",
        solution: '<p>Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.</p>',
        otherinfo: "",
        reference: "<p>https://httpd.apache.org/docs/current/mod/core.html#servertokens</p><p>https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff648552(v=pandp.10)</p><p>https://www.troyhunt.com/shhh-dont-let-your-response-headers/</p>",
        cweid: "200",
        wascid: "13",
        sourceid: "6"
      },
      {
        pluginid: "10035",
        alertRef: "10035-1",
        alert: "Strict-Transport-Security Header Not Set",
        name: "Strict-Transport-Security Header Not Set",
        riskcode: "1",
        confidence: "3",
        riskdesc: "Low (High)",
        desc: "<p>HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL). HSTS is an IETF standards track protocol and is specified in RFC 6797.</p>",
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "",
            attack: "",
            evidence: "",
            otherinfo: ""
          },
          {
            uri: "https://example.com/robots.txt",
            method: "GET",
            param: "",
            attack: "",
            evidence: "",
            otherinfo: ""
          },
          {
            uri: "https://example.com/sitemap.xml",
            method: "GET",
            param: "",
            attack: "",
            evidence: "",
            otherinfo: ""
          }
        ],
        count: "3",
        solution: "<p>Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.</p>",
        otherinfo: "",
        reference: "<p>https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html</p><p>https://owasp.org/www-community/Security_Headers</p><p>https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security</p><p>https://caniuse.com/stricttransportsecurity</p><p>https://datatracker.ietf.org/doc/html/rfc6797</p>",
        cweid: "319",
        wascid: "15",
        sourceid: "1"
      },
      {
        pluginid: "10021",
        alertRef: "10021",
        alert: "X-Content-Type-Options Header Missing",
        name: "X-Content-Type-Options Header Missing",
        riskcode: "1",
        confidence: "2",
        riskdesc: "Low (Medium)",
        desc: "<p>The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.</p>",
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "x-content-type-options",
            attack: "",
            evidence: "",
            otherinfo: 'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.'
          }
        ],
        count: "1",
        solution: "<p>Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.</p><p>If possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.</p>",
        otherinfo: '<p>This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.</p><p>At "High" threshold this scan rule will not alert on client or server error responses.</p>',
        reference: "<p>https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85)</p><p>https://owasp.org/www-community/Security_Headers</p>",
        cweid: "693",
        wascid: "15",
        sourceid: "6"
      },
      {
        pluginid: "10015",
        alertRef: "10015",
        alert: "Re-examine Cache-control Directives",
        name: "Re-examine Cache-control Directives",
        riskcode: "0",
        confidence: "1",
        riskdesc: "Informational (Low)",
        desc: "<p>The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.</p>",
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "cache-control",
            attack: "",
            evidence: "max-age=604800",
            otherinfo: ""
          }
        ],
        count: "1",
        solution: '<p>For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".</p>',
        otherinfo: "",
        reference: "<p>https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching</p><p>https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control</p><p>https://grayduck.mn/2021/09/13/cache-control-recommendations/</p>",
        cweid: "525",
        wascid: "13",
        sourceid: "6"
      },
      {
        pluginid: "10050",
        alertRef: "10050-1",
        alert: "Retrieved from Cache",
        name: "Retrieved from Cache",
        riskcode: "0",
        confidence: "2",
        riskdesc: "Informational (Medium)",
        desc: '<p>The content was retrieved from a shared cache. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance. </p>',
        instances: [
          {
            uri: "https://example.com/",
            method: "GET",
            param: "",
            attack: "",
            evidence: "HIT",
            otherinfo: ""
          },
          {
            uri: "https://example.com/robots.txt",
            method: "GET",
            param: "",
            attack: "",
            evidence: "Age: 15332",
            otherinfo: "The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use."
          },
          {
            uri: "https://example.com/sitemap.xml",
            method: "GET",
            param: "",
            attack: "",
            evidence: "Age: 7428",
            otherinfo: "The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use."
          }
        ],
        count: "3",
        solution: "<p>Validate that the response does not contain sensitive, personal or user-specific information.  If it does, consider the use of the following HTTP response headers, to limit, or prevent the content being stored and retrieved from the cache by another user:</p><p>Cache-Control: no-cache, no-store, must-revalidate, private</p><p>Pragma: no-cache</p><p>Expires: 0</p><p>This configuration directs both HTTP 1.0 and HTTP 1.1 compliant caching servers to not store the response, and to not retrieve the response (without validation) from the cache, in response to a similar request.</p>",
        otherinfo: "",
        reference: "<p>https://tools.ietf.org/html/rfc7234</p><p>https://tools.ietf.org/html/rfc7231</p><p>https://www.rfc-editor.org/rfc/rfc9110.html</p>",
        cweid: "-1",
        wascid: "-1",
        sourceid: "1"
      }
    ]
  }
];
const dataJSON = {
  "@programName": "ZAP",
  "@version": "2.15.0",
  "@generated": "Thu, 16 May 2024 18:19:48",
  site
};
const UseFetchPost = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  async function fetchPost(url = "", data) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json()).then((res) => {
      console.log(res);
      setResponse(res);
    }).catch((err) => {
      console.log(err);
      setError(err);
      setResponse(dataJSON);
    });
  }
  return {
    fetchPost,
    response,
    error
  };
};
function useHookScanner({ url }) {
  const [modal, setModal] = useState(false);
  const { fetchPost, response } = UseFetchPost();
  function handleSubmit(e) {
    e.preventDefault();
    setModal(true);
    console.log(url);
    fetchPost("http://ec2-3-133-85-14.us-east-2.compute.amazonaws.com:8090/", {
      web: url
    });
  }
  return { handleSubmit, setModal, modal, response };
}
function ModalModule({
  setModal,
  modal,
  children,
  sizeHeightPorcentage,
  sizeWidthPorcentage
}) {
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open: modal,
      onClose: () => setModal((prev) => !prev),
      "aria-labelledby": "modal-modal-title",
      "aria-describedby": "modal-modal-description",
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
    /* @__PURE__ */ jsx("h1", { className: "text-white text-2xl font-medium", children: "Alerts" }),
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
  const { handleSubmit, modal, setModal, response } = useHookScanner({ url });
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
            value: "Escanear"
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
        children: /* @__PURE__ */ jsx(Result, { response })
      }
    )
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/websecurity-fe/assets/entry.client-DyGy8crD.js", "imports": ["/websecurity-fe/assets/index-BL1rH8C1.js", "/websecurity-fe/assets/components-8S1QC4Ew.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/websecurity-fe/assets/root-ddvifx2a.js", "imports": ["/websecurity-fe/assets/index-BL1rH8C1.js", "/websecurity-fe/assets/components-8S1QC4Ew.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/websecurity-fe/assets/_index-B1E_S-AY.js", "imports": ["/websecurity-fe/assets/index-BL1rH8C1.js"], "css": [] } }, "url": "/websecurity-fe/assets/manifest-1356a8b9.js", "version": "1356a8b9" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/websecurity-fe/";
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
