function textNum(id, max) {
	var input = $(".wrapper #input" + id);
	var label = $(".wrapper #label" + id);
	
	var maxVal = max;
 
	input.keyup (function() {
		var inputLength = input.val().length;
    
		label.html("");
		label.html(inputLength + "/" + max);
    
		if ( inputLength > maxVal ) {
			label.css("background-color", "#F3493D");
			label.css("color", "#F3493D");
		} else {
			label.css("background-color", "#3f51b5");
			label.css("color", "#999");
		}
	});
}