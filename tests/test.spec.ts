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
        await dashboard.clickOnEmployeesMenu()
    })
    test('Verify user able to add two employees and search for the both employees', async ({ page }) => {
        employee = new Employee(page);
        dashboard = new Dashboard(page);
        await dashboard.clickOnEmployeesMenu()
        await employee.addNewEmployee()
        expect(employee.VerifyEmployeeCreated)
        await employee.addAnotherEmployee()
        await employee.fillEmployeeDetails()
        await employee.searchEmployee()

    })

})