import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';


class Employee {
    page: Page;
    addEmployeeBtn: Locator;
    addFirstNameTxt: Locator;
    addLastNameTxt: Locator;
    emailTxt: Locator;
    phoneNumberTxt: Locator;
    calendarIcon: Locator;
    datePicker: Locator;
    jobTitleTxt: Locator;
    saveNewEmployeeBtn: Locator;
    createAnotherNewEmployeeBtn: Locator;
    employeeAddedSuccessTxt: Locator;
    addAnotherEmployeeBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addEmployeeBtn = page.getByRole('button', { name: 'Add employee' })
        this.addFirstNameTxt = page.locator('#firstName')
        this.addLastNameTxt = page.locator('#lastName')
        this.emailTxt = page.locator('#email')
        this.phoneNumberTxt = page.locator('#phoneNumber')
        this.calendarIcon = page.locator('#startDate')
        this.datePicker = page.getByLabel('Fri Jan 05').getByText('5')
        this.jobTitleTxt = page.locator('#jobTitle')
        this.saveNewEmployeeBtn = page.getByRole('button', { name: 'Save new employee' })
        this.employeeAddedSuccessTxt = page.getByRole('heading', { name: 'Success! New employee added' })
        this.addAnotherEmployeeBtn = page.getByRole('button', { name: 'Add another employee' })

    }

    async AddNewEmployee() {

        await this.addEmployeeBtn.isVisible()
        await this.addEmployeeBtn.click()
        await this.addFirstNameTxt.fill(faker.name.firstName())
        await this.addLastNameTxt.fill(faker.name.lastName())
        await this.emailTxt.fill(faker.internet.email())
        await this.phoneNumberTxt.fill(faker.phone.number())
        await this.calendarIcon.click()
        await this.datePicker.click()
        await this.jobTitleTxt.fill(faker.name.jobTitle())
        await this.saveNewEmployeeBtn.click()
    }
    async FillEmployeeDetails() {
        await this.addFirstNameTxt.fill(faker.name.firstName())
        await this.addLastNameTxt.fill(faker.name.lastName())
        await this.emailTxt.fill(faker.internet.email())
        await this.phoneNumberTxt.fill(faker.phone.number())
        await this.calendarIcon.click()
        await this.datePicker.click()
        await this.jobTitleTxt.fill(faker.name.jobTitle())
        await this.saveNewEmployeeBtn.click()
    }
    async VerifyEmployeeCreated() {
        await this.employeeAddedSuccessTxt.isVisible()
    }
    async AddAnotherEmployee() {

        await this.addAnotherEmployeeBtn.click();
    }
}

export default Employee;