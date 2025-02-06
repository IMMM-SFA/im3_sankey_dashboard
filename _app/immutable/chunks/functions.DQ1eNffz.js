const te=/^[a-z0-9]+(-[a-z0-9]+)*$/,A=(e,n,o,i="")=>{const t=e.split(":");if(e.slice(0,1)==="@"){if(t.length<2||t.length>3)return null;i=t.shift().slice(1)}if(t.length>3||!t.length)return null;if(t.length>1){const c=t.pop(),l=t.pop(),f={provider:t.length>0?t[0]:i,prefix:l,name:c};return n&&!O(f)?null:f}const r=t[0],s=r.split("-");if(s.length>1){const c={provider:i,prefix:s.shift(),name:s.join("-")};return n&&!O(c)?null:c}if(o&&i===""){const c={provider:i,prefix:"",name:r};return n&&!O(c,o)?null:c}return null},O=(e,n)=>e?!!((n&&e.prefix===""||e.prefix)&&e.name):!1,ne=Object.freeze({left:0,top:0,width:16,height:16}),L=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),M=Object.freeze({...ne,...L}),z=Object.freeze({...M,body:"",hidden:!1});function de(e,n){const o={};!e.hFlip!=!n.hFlip&&(o.hFlip=!0),!e.vFlip!=!n.vFlip&&(o.vFlip=!0);const i=((e.rotate||0)+(n.rotate||0))%4;return i&&(o.rotate=i),o}function G(e,n){const o=de(e,n);for(const i in z)i in L?i in e&&!(i in o)&&(o[i]=L[i]):i in n?o[i]=n[i]:i in e&&(o[i]=e[i]);return o}function pe(e,n){const o=e.icons,i=e.aliases||Object.create(null),t=Object.create(null);function r(s){if(o[s])return t[s]=[];if(!(s in t)){t[s]=null;const c=i[s]&&i[s].parent,l=c&&r(c);l&&(t[s]=[c].concat(l))}return t[s]}return Object.keys(o).concat(Object.keys(i)).forEach(r),t}function he(e,n,o){const i=e.icons,t=e.aliases||Object.create(null);let r={};function s(c){r=G(i[c]||t[c],r)}return s(n),o.forEach(s),G(e,r)}function oe(e,n){const o=[];if(typeof e!="object"||typeof e.icons!="object")return o;e.not_found instanceof Array&&e.not_found.forEach(t=>{n(t,null),o.push(t)});const i=pe(e);for(const t in i){const r=i[t];r&&(n(t,he(e,t,r)),o.push(t))}return o}const ge={provider:"",aliases:{},not_found:{},...ne};function D(e,n){for(const o in n)if(o in e&&typeof e[o]!=typeof n[o])return!1;return!0}function ie(e){if(typeof e!="object"||e===null)return null;const n=e;if(typeof n.prefix!="string"||!e.icons||typeof e.icons!="object"||!D(e,ge))return null;const o=n.icons;for(const t in o){const r=o[t];if(!t||typeof r.body!="string"||!D(r,z))return null}const i=n.aliases||Object.create(null);for(const t in i){const r=i[t],s=r.parent;if(!t||typeof s!="string"||!o[s]&&!i[s]||!D(r,z))return null}return n}const _=Object.create(null);function me(e,n){return{provider:e,prefix:n,icons:Object.create(null),missing:new Set}}function S(e,n){const o=_[e]||(_[e]=Object.create(null));return o[n]||(o[n]=me(e,n))}function re(e,n){return ie(n)?oe(n,(o,i)=>{i?e.icons[o]=i:e.missing.add(o)}):[]}function ye(e,n,o){try{if(typeof o.body=="string")return e.icons[n]={...o},!0}catch{}return!1}let j=!1;function se(e){return typeof e=="boolean"&&(j=e),j}function xe(e){const n=typeof e=="string"?A(e,!0,j):e;if(n){const o=S(n.provider,n.prefix),i=n.name;return o.icons[i]||(o.missing.has(i)?null:void 0)}}function be(e,n){const o=A(e,!0,j);if(!o)return!1;const i=S(o.provider,o.prefix);return n?ye(i,o.name,n):(i.missing.add(o.name),!0)}function we(e,n){if(typeof e!="object")return!1;if(typeof n!="string"&&(n=e.provider||""),j&&!n&&!e.prefix){let t=!1;return ie(e)&&(e.prefix="",oe(e,(r,s)=>{be(r,s)&&(t=!0)})),t}const o=e.prefix;if(!O({provider:n,prefix:o,name:"a"}))return!1;const i=S(n,o);return!!re(i,e)}const ce=Object.freeze({width:null,height:null}),le=Object.freeze({...ce,...L}),Ie=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ve=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function B(e,n,o){if(n===1)return e;if(o=o||100,typeof e=="number")return Math.ceil(e*n*o)/o;if(typeof e!="string")return e;const i=e.split(Ie);if(i===null||!i.length)return e;const t=[];let r=i.shift(),s=ve.test(r);for(;;){if(s){const c=parseFloat(r);isNaN(c)?t.push(r):t.push(Math.ceil(c*n*o)/o)}else t.push(r);if(r=i.shift(),r===void 0)return t.join("");s=!s}}function ke(e,n="defs"){let o="";const i=e.indexOf("<"+n);for(;i>=0;){const t=e.indexOf(">",i),r=e.indexOf("</"+n);if(t===-1||r===-1)break;const s=e.indexOf(">",r);if(s===-1)break;o+=e.slice(t+1,r).trim(),e=e.slice(0,i).trim()+e.slice(s+1)}return{defs:o,content:e}}function Se(e,n){return e?"<defs>"+e+"</defs>"+n:n}function Te(e,n,o){const i=ke(e);return Se(i.defs,n+i.content+o)}const Pe=e=>e==="unset"||e==="undefined"||e==="none";function Ce(e,n){const o={...M,...e},i={...le,...n},t={left:o.left,top:o.top,width:o.width,height:o.height};let r=o.body;[o,i].forEach(v=>{const m=[],g=v.hFlip,a=v.vFlip;let I=v.rotate;g?a?I+=2:(m.push("translate("+(t.width+t.left).toString()+" "+(0-t.top).toString()+")"),m.push("scale(-1 1)"),t.top=t.left=0):a&&(m.push("translate("+(0-t.left).toString()+" "+(t.height+t.top).toString()+")"),m.push("scale(1 -1)"),t.top=t.left=0);let b;switch(I<0&&(I-=Math.floor(I/4)*4),I=I%4,I){case 1:b=t.height/2+t.top,m.unshift("rotate(90 "+b.toString()+" "+b.toString()+")");break;case 2:m.unshift("rotate(180 "+(t.width/2+t.left).toString()+" "+(t.height/2+t.top).toString()+")");break;case 3:b=t.width/2+t.left,m.unshift("rotate(-90 "+b.toString()+" "+b.toString()+")");break}I%2===1&&(t.left!==t.top&&(b=t.left,t.left=t.top,t.top=b),t.width!==t.height&&(b=t.width,t.width=t.height,t.height=b)),m.length&&(r=Te(r,'<g transform="'+m.join(" ")+'">',"</g>"))});const s=i.width,c=i.height,l=t.width,f=t.height;let u,d;s===null?(d=c===null?"1em":c==="auto"?f:c,u=B(d,l/f)):(u=s==="auto"?l:s,d=c===null?B(u,f/l):c==="auto"?f:c);const h={},y=(v,m)=>{Pe(m)||(h[v]=m.toString())};y("width",u),y("height",d);const x=[t.left,t.top,l,f];return h.viewBox=x.join(" "),{attributes:h,viewBox:x,body:r}}const je=/\sid="(\S+)"/g,Ee="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Oe=0;function Fe(e,n=Ee){const o=[];let i;for(;i=je.exec(e);)o.push(i[1]);if(!o.length)return e;const t="suffix"+(Math.random()*16777216|Date.now()).toString(16);return o.forEach(r=>{const s=typeof n=="function"?n(r):n+(Oe++).toString(),c=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+s+t+"$3")}),e=e.replace(new RegExp(t,"g"),""),e}const Q=Object.create(null);function Le(e,n){Q[e]=n}function q(e){return Q[e]||Q[""]}function $(e){let n;if(typeof e.resources=="string")n=[e.resources];else if(n=e.resources,!(n instanceof Array)||!n.length)return null;return{resources:n,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const H=Object.create(null),P=["https://api.simplesvg.com","https://api.unisvg.com"],F=[];for(;P.length>0;)P.length===1||Math.random()>.5?F.push(P.shift()):F.push(P.pop());H[""]=$({resources:["https://api.iconify.design"].concat(F)});function Ae(e,n){const o=$(n);return o===null?!1:(H[e]=o,!0)}function V(e){return H[e]}const Me=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let K=Me();function Ne(e,n){const o=V(e);if(!o)return 0;let i;if(!o.maxURL)i=0;else{let t=0;o.resources.forEach(s=>{t=Math.max(t,s.length)});const r=n+".json?icons=";i=o.maxURL-t-o.path.length-r.length}return i}function De(e){return e===404}const Re=(e,n,o)=>{const i=[],t=Ne(e,n),r="icons";let s={type:r,provider:e,prefix:n,icons:[]},c=0;return o.forEach((l,f)=>{c+=l.length+1,c>=t&&f>0&&(i.push(s),s={type:r,provider:e,prefix:n,icons:[]},c=l.length),s.icons.push(l)}),i.push(s),i};function ze(e){if(typeof e=="string"){const n=V(e);if(n)return n.path}return"/"}const Qe=(e,n,o)=>{if(!K){o("abort",424);return}let i=ze(n.provider);switch(n.type){case"icons":{const r=n.prefix,c=n.icons.join(","),l=new URLSearchParams({icons:c});i+=r+".json?"+l.toString();break}case"custom":{const r=n.uri;i+=r.slice(0,1)==="/"?r.slice(1):r;break}default:o("abort",400);return}let t=503;K(e+i).then(r=>{const s=r.status;if(s!==200){setTimeout(()=>{o(De(s)?"abort":"next",s)});return}return t=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?o("abort",r):o("next",t)});return}setTimeout(()=>{o("success",r)})}).catch(()=>{o("next",t)})},qe={prepare:Re,send:Qe};function Ue(e){const n={loaded:[],missing:[],pending:[]},o=Object.create(null);e.sort((t,r)=>t.provider!==r.provider?t.provider.localeCompare(r.provider):t.prefix!==r.prefix?t.prefix.localeCompare(r.prefix):t.name.localeCompare(r.name));let i={provider:"",prefix:"",name:""};return e.forEach(t=>{if(i.name===t.name&&i.prefix===t.prefix&&i.provider===t.provider)return;i=t;const r=t.provider,s=t.prefix,c=t.name,l=o[r]||(o[r]=Object.create(null)),f=l[s]||(l[s]=S(r,s));let u;c in f.icons?u=n.loaded:s===""||f.missing.has(c)?u=n.missing:u=n.pending;const d={provider:r,prefix:s,name:c};u.push(d)}),n}function fe(e,n){e.forEach(o=>{const i=o.loaderCallbacks;i&&(o.loaderCallbacks=i.filter(t=>t.id!==n))})}function $e(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const n=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!n.length)return;let o=!1;const i=e.provider,t=e.prefix;n.forEach(r=>{const s=r.icons,c=s.pending.length;s.pending=s.pending.filter(l=>{if(l.prefix!==t)return!0;const f=l.name;if(e.icons[f])s.loaded.push({provider:i,prefix:t,name:f});else if(e.missing.has(f))s.missing.push({provider:i,prefix:t,name:f});else return o=!0,!0;return!1}),s.pending.length!==c&&(o||fe([e],r.id),r.callback(s.loaded.slice(0),s.missing.slice(0),s.pending.slice(0),r.abort))})}))}let He=0;function Ve(e,n,o){const i=He++,t=fe.bind(null,o,i);if(!n.pending.length)return t;const r={id:i,icons:n,callback:e,abort:t};return o.forEach(s=>{(s.loaderCallbacks||(s.loaderCallbacks=[])).push(r)}),t}function Ge(e,n=!0,o=!1){const i=[];return e.forEach(t=>{const r=typeof t=="string"?A(t,n,o):t;r&&i.push(r)}),i}var _e={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Be(e,n,o,i){const t=e.resources.length,r=e.random?Math.floor(Math.random()*t):e.index;let s;if(e.random){let p=e.resources.slice(0);for(s=[];p.length>1;){const w=Math.floor(Math.random()*p.length);s.push(p[w]),p=p.slice(0,w).concat(p.slice(w+1))}s=s.concat(p)}else s=e.resources.slice(r).concat(e.resources.slice(0,r));const c=Date.now();let l="pending",f=0,u,d=null,h=[],y=[];typeof i=="function"&&y.push(i);function x(){d&&(clearTimeout(d),d=null)}function v(){l==="pending"&&(l="aborted"),x(),h.forEach(p=>{p.status==="pending"&&(p.status="aborted")}),h=[]}function m(p,w){w&&(y=[]),typeof p=="function"&&y.push(p)}function g(){return{startTime:c,payload:n,status:l,queriesSent:f,queriesPending:h.length,subscribe:m,abort:v}}function a(){l="failed",y.forEach(p=>{p(void 0,u)})}function I(){h.forEach(p=>{p.status==="pending"&&(p.status="aborted")}),h=[]}function b(p,w,T){const E=w!=="success";switch(h=h.filter(k=>k!==p),l){case"pending":break;case"failed":if(E||!e.dataAfterTimeout)return;break;default:return}if(w==="abort"){u=T,a();return}if(E){u=T,h.length||(s.length?N():a());return}if(x(),I(),!e.random){const k=e.resources.indexOf(p.resource);k!==-1&&k!==e.index&&(e.index=k)}l="completed",y.forEach(k=>{k(T)})}function N(){if(l!=="pending")return;x();const p=s.shift();if(p===void 0){if(h.length){d=setTimeout(()=>{x(),l==="pending"&&(I(),a())},e.timeout);return}a();return}const w={status:"pending",resource:p,callback:(T,E)=>{b(w,T,E)}};h.push(w),f++,d=setTimeout(N,e.rotate),o(p,n,w.callback)}return setTimeout(N),g}function ue(e){const n={..._e,...e};let o=[];function i(){o=o.filter(c=>c().status==="pending")}function t(c,l,f){const u=Be(n,c,l,(d,h)=>{i(),f&&f(d,h)});return o.push(u),u}function r(c){return o.find(l=>c(l))||null}return{query:t,find:r,setIndex:c=>{n.index=c},getIndex:()=>n.index,cleanup:i}}function W(){}const R=Object.create(null);function Ke(e){if(!R[e]){const n=V(e);if(!n)return;const o=ue(n),i={config:n,redundancy:o};R[e]=i}return R[e]}function We(e,n,o){let i,t;if(typeof e=="string"){const r=q(e);if(!r)return o(void 0,424),W;t=r.send;const s=Ke(e);s&&(i=s.redundancy)}else{const r=$(e);if(r){i=ue(r);const s=e.resources?e.resources[0]:"",c=q(s);c&&(t=c.send)}}return!i||!t?(o(void 0,424),W):i.query(n,t,o)().abort}function J(){}function Je(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,$e(e)}))}function Xe(e){const n=[],o=[];return e.forEach(i=>{(i.match(te)?n:o).push(i)}),{valid:n,invalid:o}}function C(e,n,o){function i(){const t=e.pendingIcons;n.forEach(r=>{t&&t.delete(r),e.icons[r]||e.missing.add(r)})}if(o&&typeof o=="object")try{if(!re(e,o).length){i();return}}catch(t){console.error(t)}i(),Je(e)}function X(e,n){e instanceof Promise?e.then(o=>{n(o)}).catch(()=>{n(null)}):n(e)}function Ye(e,n){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(n).sort():e.iconsToLoad=n,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:o,prefix:i}=e,t=e.iconsToLoad;if(delete e.iconsToLoad,!t||!t.length)return;const r=e.loadIcon;if(e.loadIcons&&(t.length>1||!r)){X(e.loadIcons(t,i,o),u=>{C(e,t,u)});return}if(r){t.forEach(u=>{const d=r(u,i,o);X(d,h=>{const y=h?{prefix:i,icons:{[u]:h}}:null;C(e,[u],y)})});return}const{valid:s,invalid:c}=Xe(t);if(c.length&&C(e,c,null),!s.length)return;const l=i.match(te)?q(o):null;if(!l){C(e,s,null);return}l.prepare(o,i,s).forEach(u=>{We(o,u,d=>{C(e,u.icons,d)})})}))}const Ze=(e,n)=>{const o=Ge(e,!0,se()),i=Ue(o);if(!i.pending.length){let l=!0;return n&&setTimeout(()=>{l&&n(i.loaded,i.missing,i.pending,J)}),()=>{l=!1}}const t=Object.create(null),r=[];let s,c;return i.pending.forEach(l=>{const{provider:f,prefix:u}=l;if(u===c&&f===s)return;s=f,c=u,r.push(S(f,u));const d=t[f]||(t[f]=Object.create(null));d[u]||(d[u]=[])}),i.pending.forEach(l=>{const{provider:f,prefix:u,name:d}=l,h=S(f,u),y=h.pendingIcons||(h.pendingIcons=new Set);y.has(d)||(y.add(d),t[f][u].push(d))}),r.forEach(l=>{const f=t[l.provider][l.prefix];f.length&&Ye(l,f)}),n?Ve(n,i,r):J};function et(e,n){const o={...e};for(const i in n){const t=n[i],r=typeof t;i in ce?(t===null||t&&(r==="string"||r==="number"))&&(o[i]=t):r===typeof o[i]&&(o[i]=i==="rotate"?t%4:t)}return o}const tt=/[\s,]+/;function nt(e,n){n.split(tt).forEach(o=>{switch(o.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function ot(e,n=0){const o=e.replace(/^-?[0-9.]*/,"");function i(t){for(;t<0;)t+=4;return t%4}if(o===""){const t=parseInt(e);return isNaN(t)?0:i(t)}else if(o!==e){let t=0;switch(o){case"%":t=25;break;case"deg":t=90}if(t){let r=parseFloat(e.slice(0,e.length-o.length));return isNaN(r)?0:(r=r/t,r%1===0?i(r):0)}}return n}function it(e,n){let o=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in n)o+=" "+i+'="'+n[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+o+">"+e+"</svg>"}function rt(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function st(e){return"data:image/svg+xml,"+rt(e)}function ct(e){return'url("'+st(e)+'")'}const Y={...le,inline:!1},lt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},ft={display:"inline-block"},U={"background-color":"currentColor"},ae={"background-color":"transparent"},Z={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},ee={"-webkit-mask":U,mask:U,background:ae};for(const e in ee){const n=ee[e];for(const o in Z)n[e+"-"+o]=Z[o]}function ut(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function at(e,n){const o=et(Y,n),i=n.mode||"svg",t=i==="svg"?{...lt}:{};e.body.indexOf("xlink:")===-1&&delete t["xmlns:xlink"];let r=typeof n.style=="string"?n.style:"";for(let g in n){const a=n[g];if(a!==void 0)switch(g){case"icon":case"style":case"onLoad":case"mode":case"ssr":break;case"inline":case"hFlip":case"vFlip":o[g]=a===!0||a==="true"||a===1;break;case"flip":typeof a=="string"&&nt(o,a);break;case"color":r=r+(r.length>0&&r.trim().slice(-1)!==";"?";":"")+"color: "+a+"; ";break;case"rotate":typeof a=="string"?o[g]=ot(a):typeof a=="number"&&(o[g]=a);break;case"ariaHidden":case"aria-hidden":a!==!0&&a!=="true"&&delete t["aria-hidden"];break;default:if(g.slice(0,3)==="on:")break;Y[g]===void 0&&(t[g]=a)}}const s=Ce(e,o),c=s.attributes;if(o.inline&&(r="vertical-align: -0.125em; "+r),i==="svg"){Object.assign(t,c),r!==""&&(t.style=r);let g=0,a=n.id;return typeof a=="string"&&(a=a.replace(/-/g,"_")),{svg:!0,attributes:t,body:Fe(s.body,a?()=>a+"ID"+g++:"iconifySvelte")}}const{body:l,width:f,height:u}=e,d=i==="mask"||(i==="bg"?!1:l.indexOf("currentColor")!==-1),h=it(l,{...c,width:f+"",height:u+""}),x={"--svg":ct(h)},v=g=>{const a=c[g];a&&(x[g]=ut(a))};v("width"),v("height"),Object.assign(x,ft,d?U:ae);let m="";for(const g in x)m+=g+": "+x[g]+";";return t.style=m+r,{svg:!1,attributes:t}}se(!0);Le("",qe);if(typeof document<"u"&&typeof window<"u"){const e=window;if(e.IconifyPreload!==void 0){const n=e.IconifyPreload,o="Invalid IconifyPreload syntax.";typeof n=="object"&&n!==null&&(n instanceof Array?n:[n]).forEach(i=>{try{(typeof i!="object"||i===null||i instanceof Array||typeof i.icons!="object"||typeof i.prefix!="string"||!we(i))&&console.error(o)}catch{console.error(o)}})}if(e.IconifyProviders!==void 0){const n=e.IconifyProviders;if(typeof n=="object"&&n!==null)for(let o in n){const i="IconifyProviders["+o+"] is invalid.";try{const t=n[o];if(typeof t!="object"||!t||t.resources===void 0)continue;Ae(o,t)||console.error(i)}catch{console.error(i)}}}}function dt(e,n,o,i,t){function r(){n.loading&&(n.loading.abort(),n.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return n.name="",r(),{data:{...M,...e}};let s;if(typeof e!="string"||(s=A(e,!1,!0))===null)return r(),null;const c=xe(s);if(!c)return o&&(!n.loading||n.loading.name!==e)&&(r(),n.name="",n.loading={name:e,abort:Ze([s],i)}),null;r(),n.name!==e&&(n.name=e,t&&!n.destroyed&&t(e));const l=["iconify"];return s.prefix!==""&&l.push("iconify--"+s.prefix),s.provider!==""&&l.push("iconify--"+s.provider),{data:c,classes:l}}function pt(e,n){return e?at({...M,...e},n):null}export{dt as c,pt as g};
