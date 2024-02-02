import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { TIMEOUT } from 'dns';
import assert from 'assert';




class Employee {

    private firstFirstName: string;
    private secondFirstName: string;


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
    closeBtn: Locator;
    searchTxtBx: Locator;


    constructor(page: Page) {
        this.page = page;

        this.addEmployeeBtn = page.getByRole('button', { name: 'Add employee' })
        this.addFirstNameTxt = page.locator('#firstName')
        this.addLastNameTxt = page.locator('#lastName')
        this.emailTxt = page.locator('#email')
        this.phoneNumberTxt = page.locator('#phoneNumber')
        this.calendarIcon = page.locator('#startDate')
        this.datePicker = page.getByText('15')
        this.jobTitleTxt = page.locator('#jobTitle')
        this.saveNewEmployeeBtn = page.getByRole('button', { name: 'Save new employee' })
        this.employeeAddedSuccessTxt = page.getByRole('heading', { name: 'Success! New employee added' })
        this.addAnotherEmployeeBtn = page.getByRole('button', { name: 'Add another employee' })
        this.closeBtn = page.getByLabel('Close modal')
        this.searchTxtBx = page.getByPlaceholder('Name or job title...')



    }
    async firstEmployeeName() {

        // This function will create the first name for the first employee 

        this.firstFirstName = await faker.name.firstName()
        //console.log("this.firstName" + this.firstFirstName)
        return this.firstFirstName;
    }
    // This function will create the first name for the second employee 
    async secondEmployeeName() {

        this.secondFirstName = await faker.name.firstName()
        // console.log("this.firstName" + this.secondFirstName)
        return this.secondFirstName;
    }
    // This function enter the new employee details for the first time
    async addNewEmployee() {

        await this.addEmployeeBtn.isVisible()
        await this.addEmployeeBtn.click()
        await this.firstEmployeeName()
        await this.addFirstNameTxt.fill(this.firstFirstName)
        // console.log("this.firstName" + this.firstFirstName)
        await this.addLastNameTxt.fill(faker.name.lastName())
        await this.emailTxt.fill(faker.internet.email())
        await this.phoneNumberTxt.fill(faker.phone.number())
        await this.calendarIcon.click()
        await this.datePicker.click()
        await this.jobTitleTxt.fill(faker.name.jobTitle())
        await this.saveNewEmployeeBtn.click()
    }
    // This function enter the employee details for the second time
    async fillEmployeeDetails() {
        await this.secondEmployeeName()
        // console.log("this.firstName" + this.secondFirstName)
        await this.addFirstNameTxt.fill(faker.name.firstName())
        await this.addLastNameTxt.fill(faker.name.lastName())
        await this.emailTxt.fill(faker.internet.email())
        await this.phoneNumberTxt.fill(faker.phone.number())
        await this.calendarIcon.click()
        await this.datePicker.click()
        await this.jobTitleTxt.fill(faker.name.jobTitle())
        await this.saveNewEmployeeBtn.click()
        await this.employeeAddedSuccessTxt.isVisible()
        await this.page.waitForTimeout(3000);
        await this.closeBtn.click()
        await this.searchTxtBx.click()
    }
    async VerifyEmployeeCreated() {
        await this.employeeAddedSuccessTxt.isVisible()
    }
    async addAnotherEmployee() {

        await this.addAnotherEmployeeBtn.click();
    }
    async searchEmployee() {

        // Search for the first employee
        //console.log("this.firstName: " + this.firstFirstName);
        await this.searchTxtBx.fill(this.firstFirstName);
        await this.page.waitForSelector('.text-base.font-bold');
        const firstNames = await this.page.$$eval('//h1[@class="text-base font-bold"]', (elements) => {
            return elements.map(element => element.textContent?.trim() || '');
        });
        // Check if any of the firstNames contains this.firstFirstName
        const matchFound = firstNames.some(firstName => firstName.includes(this.firstFirstName.trim()));
        assert.ok(matchFound, 'No matching first names found.');
        // Clear the search box
        await this.clearSearchBox();
        // Search for the second employee
        //console.log("this.firstName: " + this.secondFirstName);
        await this.searchTxtBx.fill(this.secondFirstName);
        const secondFirstNames = await this.page.$$eval('//h1[@class="text-base font-bold"]', (elements) => {
            return elements.map(element => element.textContent?.trim() || '');
        });

        // Check if any of the secondFirstNames contains this.secondFirstName
        const matchFoundforSecond = secondFirstNames.some(secondName => secondName.includes(this.secondFirstName.trim()));
        assert.ok(matchFoundforSecond, 'No matching second names found.');

    }

    // Helper function to clear the search box
    async clearSearchBox() {
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');
        await this.page.keyboard.press('Backspace');
    }
}

export default Employee;