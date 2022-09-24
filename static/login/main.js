import { meta } from "../lib/apiLoader.js";

const password = document.getElementById("password");

password.addEventListener("change", async () => {
  let result = await meta.auth(password.component.value);
  if (result) {
    cookie.pwd = password.component.value;
    location.pathname = "../";
  } else {
    password.component.value = "";
  }
});
