var base = d3.select("#sweater");
var width, height;
var numOfLoopWidth, numOfLoopHeight;
var isMouseDown = false;
var mousePositionStore = {
	x: 0, 
	y: 0
};

var letterHeight = 10;
var letterSpacing = 2;
var letterInterline = 4;

var currentLoop = [-1, -1];
var currentColor = 0;

var loopWidth = 10;
var loopHeight = 8;

var letters = {
	"а": [
		[0, 0, 0, 0, 0, 0], 
		[0, 0, 1, 1, 1, 1], 
		[0, 0, 1, 1, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	],
	"б": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 0]
	], 
	"в": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 0]
	], 
	"г": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0]
	], 
	"д": [
		[0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 1, 0], 
		[0, 1, 1, 0, 1, 1, 0], 
		[0, 1, 1, 0, 1, 1, 0], 
		[0, 1, 0, 0, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 0, 1, 1]
	], 
	"е": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1]
	], 
	"ё": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1]
	], 
	"ж": [
		[0, 0, 0, 0, 0, 0, 0, 0], 
		[1, 0, 0, 1, 1, 0, 0, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[0, 1, 0, 1, 1, 0, 1, 0], 
		[0, 1, 1, 1, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 1, 0, 0], 
		[0, 1, 1, 1, 1, 1, 1, 0], 
		[0, 1, 0, 1, 1, 0, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 0, 0, 1, 1, 0, 0, 1]
	], 
	"з": [
		[0, 0, 0, 0, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[0, 0, 0, 0, 1, 1], 
		[0, 0, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 1], 
		[1, 0, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 0]
	], 
	"и": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 1, 1, 1], 
		[1, 1, 0, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"й": [
		[0, 0, 1, 1, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 1, 1, 1], 
		[1, 1, 0, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"к": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 1, 1, 1], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 0, 0], 
		[1, 1, 1, 1, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 0, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"л": [
		[0, 0, 0, 0, 0, 0], 
		[0, 0, 1, 1, 1, 1], 
		[0, 0, 1, 1, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"м": [
		[0, 0, 0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 1, 0, 0, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1]
	], 
	"н": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"о": [
		[0, 0, 0, 0, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 0]
	], 
	"п": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"р": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0]
	], 
	"с": [
		[0, 0, 0, 0, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 0]
	], 
	"т": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0]
	], 
	"у": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[0, 1, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 0], 
		[0, 1, 1, 1, 0, 0], 
		[0, 1, 1, 1, 0, 0], 
		[0, 1, 1, 0, 0, 0]
	], 
	"ф": [
		[0, 0, 0, 0, 0, 0], 
		[0, 0, 1, 1, 1, 1, 0, 0], 
		[0, 1, 1, 1, 1, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 1, 1, 1, 1, 0], 
		[0, 0, 1, 1, 1, 1, 0, 0], 
		[0, 0, 0, 1, 1, 0, 0, 0], 
		[0, 0, 0, 1, 1, 0, 0, 0]
	], 
	"х": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[0, 1, 1, 1, 1, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	"ц": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1]
	], 
	"ч": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 1], 
		[0, 0, 0, 0, 1, 1], 
		[0, 0, 0, 0, 1, 1], 
		[0, 0, 0, 0, 1, 1]
	], 
	"ш": [
		[0, 0, 0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1, 1]
	], 
	"щ": [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 0, 1, 1, 0, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1, 1, 1]
	], 
	"ь": [
		[0, 0, 0, 0, 0, 0], 
		[0, 1, 1, 0, 0, 0], 
		[0, 1, 1, 0, 0, 0], 
		[0, 1, 1, 0, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[0, 1, 1, 1, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 0]
	], 
	"ъ": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 0, 0, 0], 
		[1, 1, 1, 0, 0, 0], 
		[0, 1, 1, 0, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[0, 1, 1, 1, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[0, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 0]
	], 
	"ы": [
		[0, 0, 0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 0, 0, 0, 0, 1, 1], 
		[1, 1, 1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 1, 1], 
		[1, 1, 1, 1, 1, 0, 1, 1], 
		[1, 1, 1, 1, 0, 0, 1, 1]
	], 
	"э": [
		[0, 0, 0, 0, 0, 0], 
		[1, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[0, 0, 0, 0, 1, 1], 
		[0, 0, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 0, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 0]
	], 
	"ю": [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[1, 1, 0, 0, 1, 1, 1, 1, 0], 
		[1, 1, 0, 1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1, 1, 1, 0]
	], 
	"я": [
		[0, 0, 0, 0, 0, 0], 
		[0, 1, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 1, 1, 1, 1], 
		[0, 1, 1, 1, 1, 1], 
		[0, 1, 1, 0, 1, 1], 
		[1, 1, 1, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[1, 1, 0, 0, 1, 1]
	], 
	" ": [
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0]
	], 
	".": [
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[1, 1, 1], 
		[1, 1, 1], 
		[1, 1, 1]
	], 
	",": [
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
		[1, 1, 1], 
		[1, 1, 1], 
		[0, 1, 1], 
		[0, 1, 1]
	], 
	"!": [
		[0, 0], 
		[1, 1], 
		[1, 1], 
		[1, 1], 
		[1, 1], 
		[1, 1], 
		[1, 1], 
		[0, 0], 
		[1, 1], 
		[1, 1]
	], 
	"?": [
		[0, 0, 0, 0, 0, 0], 
		[0, 1, 1, 1, 1, 0], 
		[1, 1, 1, 1, 1, 1], 
		[1, 1, 0, 0, 1, 1], 
		[0, 0, 0, 1, 1, 1], 
		[0, 0, 1, 1, 1, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 0, 0, 0, 0], 
		[0, 0, 1, 1, 0, 0], 
		[0, 0, 1, 1, 0, 0]
	]
}

var drawing = Array();
var started = false;

var canvas = base.append("canvas")
var context = canvas.node().getContext("2d");

function getBaseSizes() {
	var baseSizes = base.node().getBoundingClientRect();
	return [baseSizes.width, baseSizes.height];
}

var loop = new Image();
loop.src = "images/loop.png";

var loop_white = new Image();
loop_white.src = "images/loop_white.png";
loop.onload = function() {
	loop_white.onload = function() {
		resize();
	}
}

setTimeout(function() {
	if (!started) {
		resize();
	}
}, 1000)

recalcSizes();

numOfLoopWidth = Math.ceil(width/loopWidth);
numOfLoopHeight = Math.ceil(height/loopHeight);

for (var i = 0; i < numOfLoopHeight; i++) {
	drawing[i] = Array();
	for (var j = 0; j < numOfLoopWidth; j++) {
		drawing[i][j] = 0;
	}
}

window.addEventListener("resize", resize);

function recalcSizes() {
	var canvasSizes = getBaseSizes();
	
	width = canvasSizes[0];
	height = canvasSizes[1];
}

function resize() {
	started = true;
	recalcSizes();

	numOfLoopWidth = Math.ceil(width/loopWidth);
	numOfLoopHeight = Math.ceil(height/loopHeight);
	
	if (input) {
		drawing = drawingFromText(input.value);
	}

	for (var i = 0; i < numOfLoopHeight; i++) {
		if (!drawing[i]) {
			drawing[i] = Array();
		}
		for (var j = 0; j < numOfLoopWidth; j++) {
			if (!drawing[i][j]) {
				drawing[i][j] = 0;
			}
		}
	}

	canvas.attr("width", width);
	canvas.attr("height", height);

	redraw();
}
function redraw() {
	for (var i = 0; i < drawing.length; i++) {
		for (var j = 0; j < drawing[i].length; j++) {
			var image = loop;
			if (drawing[i][j] == 1) {
				image = loop_white;
			}
			context.drawImage(image, 0, 0, loopWidth, loopHeight, j*loopWidth, i*loopHeight, loopWidth, loopHeight);
		}
	}
}

base.node().addEventListener('click', onDocumentMouseClick, false);
base.node().addEventListener('mousedown', onDocumentMouseDown, false);
base.node().addEventListener('mouseup', onDocumentMouseUp, false);
base.node().addEventListener('mousemove', onDocumentMouseMove, false);
base.node().addEventListener('touchstart', onDocumentMouseDown, false);
base.node().addEventListener('touchend', onDocumentMouseUp, false);
base.node().addEventListener('touchmove', onDocumentMouseMove, false);

function onDocumentMouseDown(event) {
	isMouseDown = true;
	var x = event.clientX || event.touches[0].clientX;
	var y = event.clientY || event.touches[0].clientY;
	mousePositionStore = {
		x: x,
		y: y
	};
	var loopNumberX = Math.floor(x/loopWidth);
	var loopNumberY = Math.floor(y/loopHeight);

	var currentValue = drawing[loopNumberY][loopNumberX];

	if (currentValue == 0) {
		currentColor = 1;
	} else {
		currentColor = 0;
	}
}

function onDocumentMouseUp(event) {
	isMouseDown = false;
}

function onDocumentMouseMove(event) {
	event.preventDefault();
	var x = event.clientX || event.touches[0].clientX;
	var y = event.clientY || event.touches[0].clientY;
	if (isMouseDown) {
		var loopNumberX = Math.floor(x/loopWidth);
		var loopNumberY = Math.floor(y/loopHeight);
		
		if (currentLoop[0] != loopNumberX || currentLoop[1] != loopNumberY) {
			drawing[loopNumberY][loopNumberX] = currentColor;
		}

		currentLoop = [loopNumberX, loopNumberY];
		
		redraw();
	}
}

function onDocumentMouseClick(event) {
	var x = event.clientX || event.touches[0].clientX;
	var y = event.clientY || event.touches[0].clientY;
	
	if (mousePositionStore.x == x && mousePositionStore.y == y) {
		var loopNumberX = Math.floor(x/loopWidth);
		var loopNumberY = Math.floor(y/loopHeight);

		var currentValue = drawing[loopNumberY][loopNumberX];
		
		if (currentValue == 0) {
			currentColor = 1;
		} else {
			currentColor = 0;
		}

		drawing[loopNumberY][loopNumberX] = currentColor;
		redraw();
	}
}

var input = document.getElementById("input");
if (input) {
	input.addEventListener('keyup', inputChange, false);

	function inputChange(e) {
		var value = e.target.value.toLowerCase();
		drawing = drawingFromText(value);
		
		redraw();
	}
}

function drawingFromText(text) {
	var inputWidth = 0;
	var textArray = [];
	var lineNumber = 0;
	var newDrawing = Array();
	var maxWidth = 0;

	if (text != "") {
		for (var i = 0; i < text.length; i++) {
			var alreadyNew = false;
			var letter = text.charAt(i);
			var letterInArray = letters[letter];

			if (letter == '\n') {
				textArray[lineNumber].width = inputWidth;
				inputWidth = 0;
				textArray.push({letters: [], width: 0});
				lineNumber++;
			}

			if (letters[letter]) {
				if (i == 0) {
					textArray.push({letters: [], width: 0});
				}
				
				if (i > 0) {
					if (text.charAt((i-1)) == "\n") {
						alreadyNew = true;
					}
				}

				if (inputWidth + addToWidth > numOfLoopWidth - 10 && !alreadyNew) {
					textArray[lineNumber].width = inputWidth;
					inputWidth = 0;
					textArray.push({letters: [], width: 0});
					lineNumber++;
				}
				
				var addToWidth = letterInArray[0].length;
				if (textArray[lineNumber].width > 0) {
					addToWidth = addToWidth + letterSpacing;
				}

				inputWidth = inputWidth + addToWidth;

				maxWidth = Math.max(maxWidth, inputWidth)

				textArray[lineNumber].letters.push(letter);
				textArray[lineNumber].width = inputWidth;
			}
		}
		var maxHeight = textArray.length*letterHeight + (textArray.length-1)*letterInterline;

		var lArray = loopArray(textArray);

		var hOffset = Math.floor((numOfLoopWidth - maxWidth)/2);
		var vOffset = Math.floor((numOfLoopHeight - maxHeight)/2);
		
		for (var i = 0; i < numOfLoopHeight; i++) {
			newDrawing[i] = Array();
			for (var j = 0; j < numOfLoopWidth; j++) {
				var x = j - hOffset;
				var y = i - vOffset;
				
				if ((i < vOffset || i > vOffset + maxHeight) || (j < hOffset || j > hOffset + maxWidth)) {
					newDrawing[i][j] = 0;
				} else {
					if (lArray[y]) {
						newDrawing[i][j] = lArray[y][x];
					} else {
						newDrawing[i][j] = 0;
					}
				}
			}
		}
	}
	return newDrawing;
}

function loopArray(textArray) {
	var result = Array();
	var globalOffsetY = 0;
	var letterArray = Array();
	for (var i = 0; i < textArray.length; i++) {
		letterArray.push(textArray[i].letters);
	}
	
	for (var i = 0; i < letterArray.length; i++) {
		var globalOffsetX = 0;

		for (var j = 0; j < letterArray[i].length; j++) {
			var loopLetter = letters[letterArray[i][j]];
			var offsetY = 0;

			for (var k = 0; k < loopLetter.length; k++) {
				if (result[(offsetY + globalOffsetY)] === undefined) {
					result[(offsetY + globalOffsetY)] = Array();
				}
				var offsetX = 0;

				for (var l = 0; l < loopLetter[k].length; l++) {
					//console.log(globalOffsetX + offsetX, offsetY + globalOffsetY, loopLetter[k][l])
					result[(offsetY + globalOffsetY)][(globalOffsetX + offsetX)] = loopLetter[k][l];
					
					offsetX++;
				}
				offsetY++;
				if (k == loopLetter.length - 1 && j < letterArray[i].length - 1) {
					globalOffsetX += loopLetter[0].length;
					offsetY = 0;
					for (var y = 0; y < loopLetter.length; y++) {
						offsetX = 0;
						for (var x = 0; x < letterSpacing; x++) {
							result[(offsetY + globalOffsetY)][(globalOffsetX + offsetX)] = 0
							offsetX++;
						}
						offsetY++;
					}
					globalOffsetX += letterSpacing;
				}
			}
			if (j == letterArray[i].length - 1 && i < letterArray.length - 1) {
				globalOffsetY += loopLetter.length;
				offsetY = 0;
				for (var y = 0; y < letterInterline; y++) {
					offsetX = 0;
					result[(offsetY + globalOffsetY)] = Array();
					for (var x = 0; x < result[0].length; x++) {
						//console.log(x, offsetY + globalOffsetY)
						result[(offsetY + globalOffsetY)][x] = 0;
						offsetX++;
					}
					offsetY++;
				}
				globalOffsetY += letterInterline;
			}
		}
	}
	return result;
}