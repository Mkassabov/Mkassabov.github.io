/**
 * ===========================
 *            TODO
 * ===========================
 */

// define flobally for ease of callback
let buildPageHeaderString;
let buildPageHeaderScriptString;
let buildPageCallback

/**
 * dynamically builds the <head> of the page
 * calls function to build menu and header
 * @param {String} title The title of the page
 * @param {function} callback The callback function
 */
function buildPage(title, callback) {
  buildPageCallback = callback;
  
  // take notice of the onload property of main.css
  // main.css holds the css for the header, this ensures
  // the css for the header is loaded before the header
  let headString = `
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" onload="buildDOM();">
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		<meta name="google-site-verification" content="YRNKHO9Cbcd5Vg8_aAVQDSniZCwQgVctA_VdlATFpC0" />
		<meta name="Michael Kassabov"/>
		<title> ${title} - Michael Kassabov </title>
  `;
  
  buildPageHeaderString = `
    <div>
      <div id="sidenav" class="sidenav">
        <div class="header" style="background-color: #FFF; color: #000;">
            <i class="header-nav-button material-icons" onclick="toggleNav()"> close </i>
            <div> Menu </div>
        </div>
        <a href="/"> Home </a>
        <a href="#"> About Me </a>
        <a href="https://plex.home.mkassabov.com"> Plex </a>
        <a href="https://octopi.home.mkassabov.com"> 3D Printer </a>
        <a id="spacer" class="sidenav-spacer"></a>
        <a href="https://twitter.com/mkassabov"> <i class="fab fa-twitter" style="font-size: 24px; padding-top: 4px;"></i> Twitter </a>
        <a href="mailto:michael.kassabov@gmail.com"> <i class="fas fa-envelope" style="font-size: 24px; padding-top: 4px;"></i> Email </a>
        <a href="https://github.com/Mkassabov"> <i class="fab fa-github" style="font-size: 24px; padding-top: 4px;"></i> Github </a>
      </div>
      
      <div id="tint" class="sidenav-tint" onclick="toggleNav()"></div>
      
      <div id="header" class="header">
        <i class="header-nav-button material-icons" onclick="toggleNav()"> menu </i>
        <div> ${title} </div>
        <div class="header-spacer" ></div>
        <div id="headerAuthors" style="padding-right: 16px"> Michael Kassabov </div>
      </div>
    </div>
  `;
  
  buildPageHeaderScriptString = `
    let isOpen = false;
      
    function toggleNav() {
      if(isOpen) {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("tint").style.visibility = "hidden";
      } else {
        document.getElementById("sidenav").style.width = "250px";
        document.getElementById("tint").style.visibility = "visible";				
      }
      isOpen = !isOpen;
    }
  `;
  
  document.head.innerHTML = document.head.innerHTML + headString;
}

/**
 * !! THIS FUNCTION SHOULD ONLY BE CALLED BY THE ONLOAD OF main.css !!
 * dynamically builds the menu and header
 * @param {function} func The callback function
 */
function buildDOM() {
  let domParser = new DOMParser();
  
  let header = domParser.parseFromString(buildPageHeaderString, "text/html");
  document.getElementById("headerDiv").appendChild(header.documentElement.childNodes[1].childNodes[0]);

  let script = document.createElement('script');
  script.innerHTML = buildPageHeaderScriptString;

  document.getElementById("headerDiv").appendChild(script);

  if(buildPageCallback) {buildPageCallback();}
}