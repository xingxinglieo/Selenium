"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppLication = require("koa"); //应用对象
const bodyParser = require("koa-bodyparser");
const bestRequire = require("best-require"); //ts-ignore
bestRequire(`${__dirname}`); //ts-ignore
const config_1 = require("~/config");
const consoleLog_1 = require("~/middlewares/consoleLog");
const exception_1 = require("~/middlewares/exception");
const confirmBrowser_1 = require("~/middlewares/confirmBrowser");
const init_1 = require("~/core/init");
const app = new AppLication();
app.use(exception_1.catchError); //最后执行
app.use(bodyParser());
if (config_1.config.dev)
    app.use(consoleLog_1.consoleLog);
app.use(confirmBrowser_1.confrimBroswer);
init_1.default.initCore(app);
const host = 3000;
app.listen(host);
console.log(`listen on${host}`);
