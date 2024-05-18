import{r as i,j as e}from"./index-BL1rH8C1.js";import{u as m,v as p,w as x,x as S,y as f,O as w,M as j,L as g,S as k}from"./components-8S1QC4Ew.js";/**
 * @remix-run/react v2.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:t,...l}){let{isSpaMode:c}=m(),o=p(),u=x();S({getKey:t,storageKey:a});let d=i.useMemo(()=>{if(!t)return null;let s=t(o,u);return s!==o.key?s:null},[]);if(c)return null;let y=((s,h)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[h||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",f({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${y})(${JSON.stringify(a)}, ${JSON.stringify(d)})`}}))}const L="/websecurity-fe/assets/tailwind-Sz05Z6RV.css";function v({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(j,{}),e.jsx(g,{})]}),e.jsxs("body",{children:[t,e.jsx(M,{}),e.jsx(k,{})]})]})}const b=()=>[{rel:"stylesheet",href:L}];function E(){return e.jsx(w,{})}export{v as Layout,E as default,b as links};
