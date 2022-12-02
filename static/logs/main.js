import { api } from "../lib/apiLoader.js";

const createLog = (logData) => {
  let box = document.createElement("m-card");
  let title = document.createElement("m-text");
  let bold = document.createElement("b");
  box.setAttribute("wave", "true");
  bold.innerText = logData.appName;
  title.appendChild(bold);
  box.appendChild(title);
  let method = document.createElement("m-text");
  method.innerText = logData.method;
  box.appendChild(method);
  let date = document.createElement("m-text");
  date.innerText = new Date(logData.time).toLocaleString();
  box.appendChild(date);

  return box;
};

const content = document.getElementById("wrap");

const createLogs = async () => {
  let logs = await api.getLogs(cookie.pwd);
  logs.reverse();
  for (let log of logs) {
    content.appendChild(createLog(log));
  }
};

createLogs();
