/**
 * ===========================
 *            TODO
 * ===========================
 */

/*
 * resizes cards when DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", function(event) {
	resize();
});

/*
 * resizes cards on window resize
 */
window.addEventListener("resize", function(){
	resize();
});

/**
 * resizes the number of cards displayed based on browser width
 */
function resize() {
	let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let panels = Math.floor((width - 16) / 416);
  panels = (panels < 1) ? 1 : panels;
	let output = "auto ".repeat(panels);
	document.getElementById("grid-container").style.cssText = `grid-template-columns: ${output}`;
}

/**
 * Builds Card Elements and adds them to the DOM
 * Each Card element is based on data from a stringified CSV file
 * @param {String} data A stringification of a CSV file
 *    CSV file should have the following headers (order is irrelevant):
 *    projectName, colour, projectDescription, data, projectURL, infoURL,
 *    isGroupWork, isDemo, isCloudBased, isDynamic, isWeb, isCrossPlatform, isHidden
 */
function buildCards(data) {
	// convert CSV data to array of objects
  let dataArr = csvToJSON(data);
	
  // find the DOM element to add cards to
	let grid = document.getElementById("grid-container");
	
  // run through the entire list backwards.
  // this is done so the CSV table can have the newest 
  // projects on the bottom, but they appear with the
  // newest project first in the DOM
	dataArr.reverse().forEach(project => {
		
    // override colour 
		
    if(project.colour === "") {
      let colour = fixSaturation(hexToHSL(intToHex(hashCode(project.projectName))));      
      project.colour = `hsl(${colour.H}, ${colour.S}%, ${colour.L}%)`;
    }
		
    // only build un-hidden cards
		if(project.isHidden == "FALSE") {
			
      let card = document.createElement("div"); {
			card.classList.add("card");
			
        // create top graphic of card
				let cardTop = document.createElement("div"); {
					cardTop.classList.add("card-top");
					
          // add background SVG
					let svg = document.createElementNS("http://www.w3.org/2000/svg","svg"); {
						svg.style.cssText = "position: absolute; border-top-left-radius: 4px; border-top-right-radius: 4px;";
						svg.setAttribute("viewBox", "0 0 400 225");  
						
						let path = document.createElementNS("http://www.w3.org/2000/svg","path"); {
							path.setAttribute("fill", "#f7f7f7"); 
							path.setAttribute("d", "M153.89 0c74.094 180.678 161.088 417.448 228.483 674.517C449.67 506.337 527.063 279.465 592.56 0H153.89z"); 
						
						} svg.appendChild(path);
						
					} cardTop.appendChild(svg);
					
          //add coloured graphic
					let contactContainer = document.createElement("div"); {
						contactContainer.classList.add("contact-container");
						
						let container = document.createElement("div"); {
							container.classList.add("card-container");
							container.style.background = project.colour;
							
							// generate randomized skewed rectangles
							let numOfRects = Math.floor(Math.random() * (4)) + 4;
							
							for(var i = 0; i < numOfRects; i++) {
								
								var rect = document.createElement("div"); {
									rect.classList.add("card-rect");
									
									rect.style.cssFloat = (Math.random() < 0.5) ? "right" : "left";
									rect.style.clear = (Math.random() < 0.5) ? "right" : "left";
									rect.style.opacity = Math.random() * 0.3;
									rect.style.width = Math.floor(Math.random() * (61)) + 60 + "px";
								
								} container.appendChild(rect);
								
							}
							
							
						} contactContainer.appendChild(container);
						
					} cardTop.appendChild(contactContainer);
					
          // add title to card
					let cardTopA = document.createElement("div"); {
						cardTopA.classList.add("card-top-a");
						
						let cardTopB = document.createElement("div"); {
							cardTopB.classList.add("card-top-b");
							cardTopB.innerHTML = project.projectName;
							
						} cardTopA.appendChild(cardTopB);
						
					} cardTop.appendChild(cardTopA);
					
				} card.appendChild(cardTop);
				
        // create info section of card
				let cardInfo = document.createElement("div"); {
					cardInfo.classList.add("card-info");
					
					let div = document.createElement("div"); {
						div.style.cssText = "padding: 16px";
						
						let textDiv = document.createElement("div"); {
							textDiv.style.cssText = "display: flex; justify-content: center; align-items: center; color: #212121;";
							textDiv.innerHTML = project.projectDescription;
						} div.appendChild(textDiv);
						
						let dateDiv = document.createElement("div"); {
							dateDiv.style.cssText = "display: flex; justify-content: flex-start; align-items: center; color: #BDBDBD;";
							dateDiv.innerHTML = project.date;
						} div.appendChild(dateDiv);
						
					} cardInfo.appendChild(div);
					
				
				} card.appendChild(cardInfo);
				
        // create properties section of card
				let cardProperties = document.createElement("div"); {
					cardProperties.classList.add("card-properties");
					
					if(project.isCloudBased == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "cloud";
						cardProperties.appendChild(icon);
					}
					
					if(project.isCrossPlatform == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "devices_other";
						cardProperties.appendChild(icon);
					}
					
					if(project.isDemo == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "widgets";
						cardProperties.appendChild(icon);
					}
					
					if(project.isDynamic == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "update";
						cardProperties.appendChild(icon);
					}
					
					if(project.isGaming == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "videogame_asset";
						cardProperties.appendChild(icon);
					}

					if(project.isGroupWork == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "group_work";
						cardProperties.appendChild(icon);
					}
					
					if(project.isWeb == "TRUE") {
						let icon = document.createElement("i");
						icon.classList.add("material-icons");
						icon.classList.add("property");
						icon.style.cssText = `color: ${project.colour};`;
						icon.innerHTML = "web";
						cardProperties.appendChild(icon);
					}
					
				} card.appendChild(cardProperties);
        
        // create menu section of card
				let cardMenu = document.createElement("div"); {
					cardMenu.classList.add("card-menu");
				
					let viewButton = document.createElement("button"); {
					viewButton.classList.add("card-menu-button");
					viewButton.innerHTML = "Project";
					viewButton.onclick = () => {location.href = project.projectURL;}
					
						let viewButtonIcon = document.createElement("i");
						viewButtonIcon.classList.add("material-icons");
						viewButtonIcon.style.cssText = `color: ${project.colour}; padding:6px;`;
						viewButtonIcon.innerHTML = "code";
						viewButton.appendChild(viewButtonIcon);
						
					} 
          if(project.projectURL !== "" && project.projectURL !== "NULL" && 
              typeof project.projectURL !== "undefined") {
            cardMenu.appendChild(viewButton);
          }
				
					let infoButton = document.createElement("button"); {
					infoButton.classList.add("card-menu-button");
					infoButton.innerHTML = "More Info";
					infoButton.onclick = () => {location.href = project.infoURL;}
					
						let infoButtonIcon = document.createElement("i");
						infoButtonIcon.classList.add("material-icons");
						infoButtonIcon.style.cssText = `color: ${project.colour}; padding:6px;`;
						infoButtonIcon.innerHTML ="info_outline";
						infoButton.appendChild(infoButtonIcon);
						
					} if(project.infoURL !== "" && project.infoURL !== "NULL" &&
                typeof project.infoURL !== "undefined") {
              cardMenu.appendChild(infoButton)
            }
				
				} card.appendChild(cardMenu);
				
			} grid.appendChild(card);
		
		}
	});
}

// ===========================
//      Colour Functions
// ===========================

/**
 * A Javascript implementation of Java's String hashCode() method .
 * @param {String} str String to turn into hashCode.
 */
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

/**
 * Takes an integer and converts it to a hex number.
 * @param {int} i The number to conver to hex value.
 */
function intToHex(i){
    let c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

/**
 * Converts a hex String into an Object representing and HSL colour format.
 * @param {String} hex The hex value to convert to an HSL object.
 */
function hexToHSL(hex) {
	// parse hex to RGB between 0 and 1
	let rgbTotal = parseInt(hex, 16);
    let R = ((rgbTotal >> 16) & 255) / 256;
    let G = ((rgbTotal >> 8) & 255) / 256;
    let B = (rgbTotal & 255) / 256;
	
	// based on https://en.wikipedia.org/wiki/HSL_and_HSV
	let M = Math.max(R, G, B);
	let m = Math.min(R, G, B);
	let C = M - m;
	
	let L = (M + m) / 2;
	let H; 
	if(C === 0) {
		H = 0;
	} else {
		switch(M) {
			case R:
        H = ((G - B) / C) % 6; 
        break;
			case G:
        H = (B - R) / C + 2;
        break;
			case B:
        H = (R - G) / C + 4;
        break;
		}
	}
	let S = (L === 0 || L === 1) ? 0 : (C / (1 - Math.abs(2 * L - 1)));
	H *= 60;
	
  // build object
	return {"H":Math.round(H), "S":Math.round(S * 100), "L":Math.round(L * 100)};
}

/**
 * Modifies the saturation of an HSL object to be more visually appealing.
 * @param {HSL Object} hsl The HSL object to modify.
 */
function fixSaturation(hsl) {
	hsl.S /= 100;
  // formula based on experimentation of what colours look nice
	hsl.S = 1 / Math.pow(hsl.S + 0.6, 2);
	hsl.S = Math.round(hsl.S * 100);
	return hsl;
}
