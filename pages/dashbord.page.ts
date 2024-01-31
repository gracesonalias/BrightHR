import { Page, Locator } from '@playwright/test';


class Dashboard {
    page: Page;
    accountsSideMenu: Locator;


    constructor(page: Page) {
        this.page = page;
        this.accountsSideMenu = page.getByTitle('Employees')

    }

    async ClickOnAccountsMenu() {
        await this.accountsSideMenu.isVisible()
        await this.accountsSideMenu.click()
    }

}

export default Dashboard;