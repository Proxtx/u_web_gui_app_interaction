import * as _ from "../lib/guiLoader.js";

const method = document.getElementById("method");

let url = new URL(location.href);
method.setAttribute("appName", url.searchParams.get("appName"));
method.setAttribute("method", url.searchParams.get("method"));

method.component.box.component.box.style.maxWidth = "unset";
