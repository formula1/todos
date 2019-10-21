import { WebWorkerTodoAPI } from "todo-apis";
import { initRun } from "web-app";

initRun(new WebWorkerTodoAPI(), "#init");
