// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import daysData from "./days.json" with { type: "json" };

window.onload = function() {
    document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
}