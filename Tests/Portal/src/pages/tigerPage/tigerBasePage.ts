import { Page } from "@playwright/test";
import { UIHelper } from "../../helpers/ui-helpers";

export class TigerBasePage extends UIHelper {
    async navigateToTigerHomePage() {
        await this.page.goto(process.env.tigerStageUrl);
    }
}