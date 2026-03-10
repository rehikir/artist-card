(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();function u({label:e=""}){return`
    <div class="category-caption">
      <img src="./src/images/dashes.svg"/>
      <span class="category-caption-label">${e}::</span>
    </div>
  `}function p({children:e=""}){return`
    <div class="category">
      ${e}
    </div>
  `}function m({children:e=""}){return`
    <div class="category-wrapper">
      ${e}
    </div>
  `}function h({children:e=""}){return`
    <footer class="footer-wrapper">
      ${e}
    </footer>
  `}function v(e){const{href:t,target:r,rel:o,iconSrc:s,iconAlt:n,text:i}=e,c=!t,l=c?"span":"a",g=c?'class="link link--disabled"':`href="${t}" class="link" ${r?`target="${r}"`:""} ${o?`rel="${o}"`:""}`;return`
    <${l} ${g}>
      ${s?`<span class="link-icon"><img src="${s}" alt="${n||"icon"}" /></span>`:""}
      <span class="link-text">${i}</span>
    </${l}>
  `}function f({category:e="My Works",links:t=[],inline:r=!1}){return Array.isArray(t)||(t=[]),`
    ${u({label:e})}
    ${p({children:`
        <div class="links-list ${r?"links-list--inline":""}">
          ${t.map(v).join("")}
        </div>
      `})}
  `}const d={home:{path:"index.html",title:"rehikir — Commissions"},rules:{path:"rules.html",title:"rehikir — Rules & Terms"},prices:{path:"prices.html",title:"rehikir — Prices"}},a={logo:"./src/images/logo.svg",kir:"./src/images/kir.svg",icons:{x:"./src/images/x_logo.svg",boosty:"./src/images/boosty_logo.svg",snootbooru:"https://gravatar.com/avatar/6e44d5d5048762a8ce319add55b44d67?d=retro&amp;s=300"}},$=[{href:"https://x.com/rehikir",text:"x.com/rehikir",iconSrc:a.icons.x,iconAlt:"X logo",target:"_blank",rel:"noopener"},{href:"https://boosty.to/rehikir",text:"boosty.to/rehikir",iconSrc:a.icons.boosty,iconAlt:"Boosty logo",target:"_blank",rel:"noopener"},{href:"#",text:"snootbooru.com/...",iconSrc:a.icons.snootbooru,iconAlt:"Snootbooru logo",target:"_blank",rel:"noopener"}];function b(){return f({category:"My Works",links:$})}const y=[{text:"FAQ",href:null,disabled:!0},{text:"Rules & Terms",href:"rules.html",disabled:!1},{text:"Prices",href:"prices.html",disabled:!1},{text:"Contact me",href:null,disabled:!0}];function k(e="home"){return y.map(t=>({...t,disabled:t.href===null||t.href==="prices.html"&&e==="prices"||t.href==="rules.html"&&e==="rules"}))}function x({currentPage:e="home"}={}){return f({category:"More Info",links:k(e),inline:!0})}function L(e){return`
    <div class="status">
      <span class="status-intro">HEYA.</span>
      <span class="status-text tt-none">${e}</span>
    </div>
  `}function S({maxSlots:e=5,takenSlots:t=0}={}){const r=e-t,o=r>0?`Available slots: ${r}`:"No slots available.";return`
    ${m({children:`
        ${u({label:"Request Art"})}
        ${p({children:h({children:L(o)})})}
      `})}
  `}function C({title:e,logoSrc:t,kirSrc:r}){return`
    <a href="index.html" class="logo-link">
      <div class="branding-wrapper">
        <!-- rehi + kir -->
        <div class="branding-name">
          <span>rehi</span>
          <img src="${r}" alt="kir" class="branding-logo" />
        </div>

        <!-- Page title + fox avatar -->
        <div class="branding-page">
          <span class="branding-page-title">${e}</span>
          <img src="${t}" alt="fox logo" class="branding-logo" />
        </div>
      </div>
    </a>
  `}function A({title:e="",logoSrc:t="",kirSrc:r="",inner:o=!1}={}){return`
    <div class="${`card-header ${o?"card-header--inner-page":"card-header--home"}`}">
      ${C({title:e,logoSrc:t,kirSrc:r})}
      <div class="category-wrapper">
        ${b()}
        ${x()}
      </div>
    </div>
  `}function N({inner:e=!1}={}){return`<div class="${`card-body ${e?"card-body--inner-page":"card-body--home"}`}"></div>`}function w(e,t=!1){return`
    <div class="${`card-footer ${t?"card-footer--inner-page":"card-footer--home"}`}">
      ${S(e)}
    </div>
  `}const M={maxSlots:5,takenSlots:0};function O({page:e="home",isInner:t=!1}={}){const o={home:"Commissions",rules:"Rules & Terms",prices:"Prices"}[e]||"Commissions";return`
    <div class="${`card ${t?"card--inner-page":"card--home"}`}">
      ${A({title:o,logoSrc:a.logo,kirSrc:a.kir,inner:t})}

      ${N({inner:t})}

      ${w(M,t)}
    </div>
  `}document.addEventListener("DOMContentLoaded",()=>{var t;const e=document.getElementById("app");if(e){let r="home";window.location.pathname.includes("rules")&&(r="rules"),window.location.pathname.includes("prices")&&(r="prices");const o=r!=="home";document.body.classList.toggle("body--inner-page",o),document.title=((t=d[r])==null?void 0:t.title)||d.home.title,e.innerHTML=O({page:r,isInner:o})}});
