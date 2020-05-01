const themeMap = {
  dark: 'light',
  light: 'dark',
};

const theme = localStorage.getItem('theme');
const HTMLClass = document.body.classList;
theme && HTMLClass.add(theme);
const logo = document.getElementsByClassName("logo-text")[0];
const transitionSpeed = getComputedStyle(document.body).getPropertyValue('--transition-speed').match(/^\d*/g)[0];
const metaControlElement = document.getElementsByTagName('meta-control')[0];
metaControlElement.setAttribute('theme', theme);

// theme button not on link element to compensate for `clearHash()` on all a tags
document.getElementById('themeButton').onclick = () => {toggleTheme(null)};

// toggle theme on system theme change
try {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', initTheme)
} catch (e1) {
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(initTheme)
  } catch (e2) {
    document.getElementById("themeButton").children[0].remove();
  }
}

// set theme if no theme in localStorage
if(localStorage.getItem('theme') === undefined | localStorage.getItem('theme') === null) {
  HTMLClass.add('no-theme');
  initTheme();
}

function toggleTheme(t = null) {
  const current = localStorage.getItem('theme') || 'no-theme';
  const next = t || themeMap[current];
  logo.style.transition = "0ms";
  HTMLClass.replace(current, next);
  localStorage.setItem('theme', next);
  metaControlElement.setAttribute('theme', next);
  // match colour transition speed on elements with different transition speeds
  setTimeout(() => {
    logo.style.transition = "";
  }, transitionSpeed);
}

// set theme based on system preference
function initTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleTheme('dark');
  } else {
    toggleTheme('light');
  }
}

// control meta tags
class MetaControl extends HTMLElement {
  constructor() {
    super();
    this.constructChildren();
  }

  // create meta tags
  constructChildren() {
    let theme;
    if(this.hasAttribute('theme')) {
      theme = this.getAttribute('theme');
    } else {  
      theme = 'light';
    }

    let head = document.head;

    let appleTouch = document.createElement('link');
    appleTouch.classList.add("metaControlChild");
    appleTouch.rel = "apple-touch-icon"; appleTouch.sizes = "180x180"; appleTouch.href = `/favicon-${theme}/apple-touch-icon.png`;
  
    let icon32 = document.createElement('link');
    icon32.classList.add("metaControlChild");
    icon32.rel = "icon"; icon32.type = "image/png"; icon32.sizes = "32x32"; icon32.href = `/favicon-${theme}/favicon-32x32.png`;
  
    let icon16 = document.createElement('link');
    icon16.classList.add("metaControlChild");
    icon16.rel = "icon"; icon16.type = "image/png"; icon16.sizes = "16x16"; icon16.href = `/favicon-${theme}/favicon-16x16.png`;
  
    let manifest = document.createElement('link');
    manifest.classList.add("metaControlChild");
    manifest.rel = "manifest"; manifest.href = `/favicon-${theme}/site.webmanifest`;
    
    let maskIcon = document.createElement('link');
    maskIcon.classList.add("metaControlChild");
    maskIcon.rel = "mask-icon"; maskIcon.href = `/favicon-${theme}/safari-pinned-tab.svg`; maskIcon.setAttribute('color', "#00a3e4");
    
    let shortcutIcon = document.createElement('link');
    shortcutIcon.classList.add("metaControlChild");
    shortcutIcon.rel = "shortcut icon"; shortcutIcon.href = `/favicon-${theme}/favicon.ico`;

    let msAppConfig = document.createElement('meta');
    msAppConfig.classList.add("metaControlChild");
    msAppConfig.name = "msapplication-config"; msAppConfig.content = `/favicon-${theme}/browserconfig.xml`;
    
    let msAppColor = document.createElement('meta');
    msAppColor.classList.add("metaControlChild");
    msAppColor.name = "msapplication-TileColor"; msAppColor.content = (theme === "light") ?  "#ffffff" : "#141418";
    
    let themeColor = document.createElement('meta');
    themeColor.classList.add("metaControlChild");
    themeColor.name = "theme-color"; themeColor.content = (theme === "light") ?  "#ffffff" : "#141418";

    head.appendChild(appleTouch);
    head.appendChild(icon32);
    head.appendChild(icon16);
    head.appendChild(manifest);
    head.appendChild(maskIcon);
    head.appendChild(shortcutIcon);
    head.appendChild(msAppConfig);
    head.appendChild(msAppColor);
    head.appendChild(themeColor);
  }

  // called whenever theme tag of meta-control element is called
  attributeChangedCallback(name, oldValue, newValue) {
    let children = document.getElementsByClassName("metaControlChild");
    for(let child = children.length - 1; child >= 0; --child) {
      children[child].remove();
    }
    // rebuild meta tags based on theme tag 
    this.constructChildren();
  }
  static get observedAttributes() { return ['theme']; }

}

customElements.define('meta-control', MetaControl);