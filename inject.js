// The code to inject.
(function(){

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
  cursor: pointer;              \
}");
sheet.insertRule(".annotation::before { content: '['; }");
sheet.insertRule(".annotation::after { content: ']'; }");

/************\
* Dummy data *
\************/
var permaurl = document.querySelector("#t-permalink > a").href;
var annotations = (function(title) {
  return {
    "Solresol": [
      {
        "selectors": ["#cite_ref-2", "sup.reference:nth-child(13)", ".mw-parser-output > p:nth-child(3) > sup:nth-child(13)"],
        "id": "WZ4#1",
        "text": "Seriously? It's been AGES! Follow this up.",
        "article_version": 879677380
      },
      {
        "selectors": ["#cite_ref-1", "sup.reference:nth-child(9)", ".mw-parser-output > p:nth-child(3) > sup:nth-child(9)"],
        "id": "WZ4#2",
        "text": "Why?",
        "article_version": 879677380
      }
    ]
  }[title];
})(permaurl.substring(permaurl.indexOf("?")).split("&")[0].substring(7));

/*****************\
* Add annotations *
\*****************/
for (var i = 0; i < annotations.length; i += 1) {
  var annotation = annotations[i];
  var element = document.createElement("span");
  element.setAttribute("class", "annotation");
  element.innerText = annotation.id;
  element.setAttribute("title", annotation.text);
  // Todo: Use an average and behave sensibly when it starts to fail.
  // This is a protection against structural edits.
  var annotatee = document.querySelector(annotation.selectors[0]);
  annotatee.parentElement.insertBefore(element, annotatee.nextSibling);
}

})();
