"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { getNetInfo } from '~/app/functions/getNetInfo';
//管理GetImgBroswer的类
const Browsers_1 = require("./Browsers");
const Browsers_2 = require("./Browsers");
class BroswerPool {
    constructor(BrowserType, { plength = 2, watcheInterval = Browsers_1.Browser.timeout, closeInterval = 5 * 60 * 1000, closeTimeout = 30000, } = {}) {
        this.BrowserType = BrowserType;
        this.pools = [];
        this.plength = plength;
        this.watchInterval = watcheInterval;
        this.closeInterval = closeInterval;
        this.closeTimeout = closeTimeout;
        this.confim();
        this.watch();
        // this.watch();
    }
    //向外界抛出一个Browser实例
    async getBroswer() {
        const browser = this.hasBroswer()
            ? this.popBroswer()
            : await this.BrowserType.createBrowser();
        this.confim();
        this.autoDestroyBroswer(browser.instance);
        return browser;
    }
    confim() {
        let diff = this.plength - this.pools.length;
        if (diff > 0) {
            while (diff--)
                this.addBroswer().catch(_e => {
                    console.log("添加一个浏览器失败");
                });
        }
    }
    async addBroswer() {
        const browser = await this.BrowserType.createBrowser();
        this.pushBroswer(browser);
    }
    pushBroswer(browser) {
        this.pools.push(browser);
    }
    popBroswer() {
        return this.pools.pop();
    }
    async hasBroswer() {
        return this.pools.length > 0;
    }
    autoDestroyBroswer(browser) {
        return setTimeout(() => {
            browser.close().catch();
            this.confim();
        }, this.closeTimeout);
    }
    watch() {
        setInterval(() => this.confim(), this.watchInterval);
        setInterval(async () => {
            if (this.pools.length >= this.plength) {
                const browser = await this.getBroswer();
                browser.instance.close();
                this.confim();
            }
        }, this.closeInterval);
    }
}
exports.BroswerPool = BroswerPool;
exports.QuTuoBroswerPool = new BroswerPool(Browsers_2.QuTuoBrowser);
exports.PayNetBrowserPool = new BroswerPool(Browsers_2.PayNetBrowser);
