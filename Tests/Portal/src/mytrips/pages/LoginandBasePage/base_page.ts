import { UIHelper } from '../../'

export class BasePage extends UIHelper {

    async navigateToUrl() {
        await this.page.goto(process.env.mytripsurl);
    }

}