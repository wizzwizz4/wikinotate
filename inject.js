// The code to inject.

/************\
* Stylesheet *
\************/
// This, like all good JavaScript programs, is pretty much just other people's code crammed together.
// Code from https://davidwalsh.name/add-rules-stylesheets is marked SOURCE:DW

var sheet = (function() {
  // SOURCE: DW
	// Create the <style> tag
	var style = document.createElement("style");

	// WebKit hack :(
	style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();

sheet.insertRule(".annotation { \
  vertical-align: super;        \
  font-size: 80%;               \
  color: red;                   \
}");
sheet.insertRule(".annotation::before { content: '['; }");
sheet.insertRule(".annotation::after { content: ']'; }");
