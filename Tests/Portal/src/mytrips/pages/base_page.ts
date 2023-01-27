import { UIHelper } from '../../helpers/ui-helpers';

export class BasePage extends UIHelper {

    async navigateToUrl() {
        await this.page.goto(process.env.mytripsurl);
    }

}