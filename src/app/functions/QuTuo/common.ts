import { ParameterException } from '~/core/http-exception';
import { QuTuoBroswerPool } from '~/app/browser/Pools'
export interface AccountPramer {
    schoolId: string
    password: string
}
export class LoginQuTuo {
    page !: Puppeteer.Page
    constructor(public account: AccountPramer) {
    }
    protected async getPage() {
        const browser = (await QuTuoBroswerPool.getBroswer());
        if (browser) this.page = browser.page;
    }
    async login() {
        await this.getPage();
        const { schoolId, password } = this.account;
        await (await this.page.waitForSelector('input[type="text"]')).type(schoolId);
        await (await this.page.waitForSelector('input[type="password"]')).type(password);
        const loginButton = await this.page.waitForSelector('.weui-btn_primary');
        try {
            await Promise.all([
                loginButton.click(),
                this.page.waitForNavigation({ timeout: 5000 })
            ])
        } catch (e) {
            throw new ParameterException('密码错误', 200)
        }
    }
}