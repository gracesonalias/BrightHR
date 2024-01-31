/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, expect, } from '@playwright/test';
import HomePage from '../pages/home.page';
import Dashboard from '../pages/dashbord.page';
import Employee from '../pages/employee.page';

test.describe('Home', () => {
    let homePage: HomePage;
    let dashboard: Dashboard;
    let employee: Employee;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate()
        await homePage.Login()
    })
    test('Login to the dashboard and clicking employees page', async ({ page }) => {
        dashboard = new Dashboard(page);
        await dashboard.ClickOnAccountsMenu()
    })
    test('Verify user able to add employee details in the page and saving it', async ({ page }) => {
        employee = new Employee(page);
        dashboard = new Dashboard(page);
        await dashboard.ClickOnAccountsMenu()
        await employee.AddNewEmployee()
        expect(employee.VerifyEmployeeCreated)
        await employee.AddAnotherEmployee()
        await employee.FillEmployeeDetails()
        await page.waitForTimeout(3000000);

    })

})