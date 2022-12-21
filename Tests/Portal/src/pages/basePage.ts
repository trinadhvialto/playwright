var OR = require('../../resources/OR.json');
import { UIHelper } from "../helpers/ui-helpers";

export class BasePage extends UIHelper {
    async navigateToMyTripsPage() {
        await this.page.goto(process.env.mytripsUrl);
    }
}