var disabled = true;
var trainingStarted = false;

var perceptron = null;
var index = 0;
var color_data = null;
var filtered_data = null;
var original_data = null;
var canvas = null;
var context = null;
var size = 125 * 125;
var trial = 0;
var px = null;

canvas = canvas || document.getElementById('canvas');
context = context || canvas.getContext('2d');

var getData = function(imageObj) {

    canvas = canvas || document.getElementById('canvas');
    context = context || canvas.getContext('2d');

    context.drawImage(imageObj, 0, 0);

    var imageData = context.getImageData(0, 0, 125, 125);
    return imageData.data;
}

var train = function() {

    disabled = false;

    trial = 0;

    perceptron = new synaptic.Architect.Perceptron(27, 8, 3);
    color_data = getData(document.getElementById('input'));
    filtered_data = getData(document.getElementById('output'));
    original_data = getData(document.getElementById('original'));

	color_data.crossOrigin = "Anonymous";
	filtered_data_data.crossOrigin = "Anonymous";
	original_data_data.crossOrigin = "Anonymous";
	
    if (!trainingStarted) {
        trainingStarted = true;
        iteration();
    }
}

var pxDefine = function(input_data) {
    var px = pixel(input_data, 0, 0);
    px = px.concat(pixel(input_data, -1, -1));
    px = px.concat(pixel(input_data, -0, -1));
    px = px.concat(pixel(input_data, 1, -1));
    px = px.concat(pixel(input_data, -1, 0));
    px = px.concat(pixel(input_data, 1, 0));
    px = px.concat(pixel(input_data, -1, 1));
    px = px.concat(pixel(input_data, 0, 1));
    px = px.concat(pixel(input_data, 1, 1));
    return px;
}

var iteration = function() {
    trial++;

    for (index = 0; index < size; index += 2) {
        var px = pxDefine(color_data);
        perceptron.activate(px);
        perceptron.propagate(.12, pixel(filtered_data, 0, 0));
    }
    preview();
}

var pixel = function(data, ox, oy) {
    var y = index / 125 | 0;
    var x = index % 125;

    if (ox && (x + ox) > 0 && (x + ox) < 125)
        x += ox;
    if (oy && (y + oy) > 0 && (y + oy) < 125)
        y += oy;

    var red = data[((125 * y) + x) * 4];
    var green = data[((125 * y) + x) * 4 + 1];
    var blue = data[((125 * y) + x) * 4 + 2];

    return [red / 255, green / 255, blue / 255];
}

var preview = function() {
    console.log(trial);

    var imageData = context.getImageData(0, 0, 125, 125);
    for (index = 0; index < size; index++) {
        var px = pxDefine(original_data);

        var rgb = perceptron.activate(px);
        imageData.data[index * 4] = (rgb[0]) * 255;
        imageData.data[index * 4 + 1] = (rgb[1]) * 255;
        imageData.data[index * 4 + 2] = (rgb[2]) * 255;
    }
    context.putImageData(imageData, 0, 0);

    setTimeout(timeout, 100);
}

var timeout = function() {
    if (!disabled) {
        iteration();
    }
}

var reset = function() {
    trainingStarted = false;
    disabled = true;
    trial = 0;
    perceptron.reset();
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var pause = function() {
    disabled = !disabled;
    iteration();
}