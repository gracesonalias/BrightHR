import { Page, Locator } from '@playwright/test';


class Dashboard {
    page: Page;
    employeesSideMenu: Locator;

    // This function will check the title of the page
    constructor(page: Page) {
        this.page = page;
        this.employeesSideMenu = page.getByTitle('Employees')

    }

    // This function will check the presence of employees side menu in the dashboard and click it

    async clickOnEmployeesMenu() {
        await this.employeesSideMenu.isVisible()
        await this.employeesSideMenu.click()
    }

}

export default Dashboard;