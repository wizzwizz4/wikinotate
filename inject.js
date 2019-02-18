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

sheet.insertRule(".wn-annotation { \
  vertical-align: super;           \
  font-size: 80%;                  \
  color: red;                      \
  cursor: pointer;                 \
}");

/************\
* Dummy data *
\************/
var permaurl = document.querySelector("#t-permalink > a").href;
var annotations = (function(title) {
  return {
    "Solresol": [
      {
        "location": [
          {"type": "selector", "selector": "#cite_ref-2"},
          {"type": "selector", "selector": "sup.reference:nth-child(13)"},
          {"type": "selector", "selector": ".mw-parser-output > p:nth-child(3) > sup:nth-child(13)"}
        ],
        "id": "WZ4#1",
        "text": "Seriously? It's been AGES! Follow this up.",
        "article_version": 879677380
      },
      {
        "location": [
          {"type": "selector", "selector": "#cite_ref-1"},
          {"type": "selector", "selector": "sup.reference:nth-child(9)"},
          {"type": "selector", "selector": ".mw-parser-output > p:nth-child(3) > sup:nth-child(9)"}
        ],
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
function get_location(specifiers) {
  if (!Array.isArray(specifiers)) {
    specifiers = [specifiers];
  }
  var count = {};
  var locations = [];
  for (var i = 0; i < specifiers.length; i += 1) {
    var location = location_specifier(specifiers[i]);
    var hash = get_location.hash(location);
    count[hash] = (count[hash] || 0) + 1;
    if (locations.indexOf(location) == -1) {
      locations.push(location);
    }
  }
  for (var i = 0; i < locations.length; i += 1) {
    var location = locations[i];
    // Use an average and behave sensibly when it starts to fail.
    // This is a protection against structural edits.
    if (count[get_location.hash(location)] > (specifiers.length / 2)) {
      return location;
    }
  }
  return [undefined, 0];
}
get_location.hash = function get_location_hash(location) {
  return (location[0].__location_hash = location[0].__location_hash || ++get_location.hash.val) + ":" + location[1];
}
get_location.hash.val = 0;

function location_specifier(specifier) {
  switch (specifier.type) {
    case "selector":
      return [document.querySelector(specifier.selector), 0];
    default:
      return undefined;
  }
}

for (var i = 0; i < annotations.length; i += 1) {
  var annotation = annotations[i];
  var element = document.createElement("span");
  element.setAttribute("class", "wn-annotation");
  element.innerText = "[" + annotation.id + "]";
  element.setAttribute("title", annotation.text);
  // Todo: Pay attention to the offset
  var annotatee = get_location(annotation.location)[0];
  annotatee.parentElement.insertBefore(element, annotatee.nextSibling);
}

})();
