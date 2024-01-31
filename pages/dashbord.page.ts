import { Page, Locator } from '@playwright/test';


class Dashboard {
    page: Page;
    employeesSideMenu: Locator;


    constructor(page: Page) {
        this.page = page;
        this.employeesSideMenu = page.getByTitle('Employees')

    }

    async clickOnEmployeesMenu() {
        await this.employeesSideMenu.isVisible()
        await this.employeesSideMenu.click()
    }

}

export default Dashboard;