//* remove hashes in URL
// add hash remove function to each a tag

let aTags = document.getElementsByTagName('a')
const r = new RegExp(`${location.origin + location.pathname}#.*$`)
for(let i = 0; i < aTags.length; i++) {
  if(r.test(aTags[i].href)) {
    let href = aTags[i].href.split('/').pop(); 
    aTags[i].onclick = () => {gotoClearHash(href);};
    aTags[i].removeAttribute("href")
  }
}

//remove hashes in URL
function gotoClearHash(hash) {
  location.replace(hash);
  history.replaceState(null,null,location.href.replace(location.hash,"").replace('/#$/',''));
}

if(this.location.pathname === "/") {
  history.scrollRestoration = "manual"
}
