import { LoginPage, ClientAdminDashboard, credentialsJson, AccountSettingsPage, clientadmindashboardjson,test } from '../../..';
test.describe("Client Admin Dashboard", () => {

    test("updating Traveler Profile from Client Admin Dashboard", async ({ page }) => {
        const loginAction = new LoginPage(page);
        const accountSettingsActions = new AccountSettingsPage(page);
        const clientAdminDashboardActions = new ClientAdminDashboard(page);
        const expData = { Successful: 1, Failure: 0, Totals: 1 };
        await test.step("Login into mytrips application as Travler user and fetch homecountry", async () => {
            await loginAction.openMyTripApplication();
            await loginAction.loginIntoMyTripApplication(credentialsJson.traveler.qaprasad.travaler1Username, credentialsJson.traveler.qaprasad.password);
            await accountSettingsActions.navigateToAccountSettings();
            await accountSettingsActions.verifyTravelProfileDetails("France");
            await loginAction.logOutFromApplication("traveler");
        });

        await test.step("Login into mytrips application as client admin dashboard user", async () => {
            await loginAction.openMyTripApplication();
            await loginAction.loginIntoMyTripApplication(credentialsJson.clientAdmin.qaprasad.adminuser1, credentialsJson.clientAdmin.qaprasad.password);
            await clientAdminDashboardActions.navigateClientAdminDashboardPage();
        });

        await test.step("download the user profile excel file", async () => {
            await clientAdminDashboardActions.downloadUserProfile("updateProfile.xlsx");
        });

        await test.step("update user profile excel data and upload", async () => {
            await clientAdminDashboardActions.UpdateExcelFile(clientadmindashboardjson.data.updateProfile, "updateProfile.xlsx");
            await clientAdminDashboardActions.uploadAFile("updateProfile.xlsx", "updateProfile_result.xlsx");
        });

        await test.step("Verify excel file successfully upload with status all success", async () => {
            await clientAdminDashboardActions.readAndCompareExcelAsKeyValPair("updateProfile_result.xlsx", expData);
            await loginAction.logOutFromApplication("client admin dashboard");
        });
        await test.step("Login into mytrips application as Travler user and fetch homecountry", async () => {
            await loginAction.openMyTripApplication();
            await loginAction.loginIntoMyTripApplication(credentialsJson.traveler.qaprasad.travaler1Username, credentialsJson.traveler.qaprasad.password);
            await accountSettingsActions.navigateToAccountSettings();
            await accountSettingsActions.verifyTravelProfileDetails("India");
            await loginAction.logOutFromApplication("traveler");
            clientadmindashboardjson.data.updateProfile[0]["Home Country Location Code"] = "/Country/FR";
        });

        await test.step("update user profile excel data and upload", async () => {
            await loginAction.loginIntoMyTripApplication(credentialsJson.clientAdmin.qaprasad.adminuser1, credentialsJson.clientAdmin.qaprasad.password);
            await clientAdminDashboardActions.navigateClientAdminDashboardPage();
            await clientAdminDashboardActions.UpdateExcelFile(clientadmindashboardjson.data.updateProfile, "updateProfile.xlsx");
            await clientAdminDashboardActions.uploadAFile("updateProfile.xlsx", "updateProfile_result.xlsx");
            await clientAdminDashboardActions.readAndCompareExcelAsKeyValPair("updateProfile_result.xlsx", expData);
        });

        await test.step("delete all downloaded files", async () => {
            await clientAdminDashboardActions.deleteFilesUnderDir();
        });
    });

});