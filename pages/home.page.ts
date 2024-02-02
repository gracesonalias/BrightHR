import { Page, Locator } from '@playwright/test';


class HomePage {
    page: Page;
    emailTxtBox: Locator;
    passwordTxtBox: Locator;
    getLoginBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailTxtBox = page.locator('#email')
        this.passwordTxtBox = page.locator('#password')
        this.getLoginBtn = page.getByRole('button', { name: 'Login' })

    }
    // This function will navigate the user to the home page
    async navigate() {
        await this.page.goto('/');
    }
    // This function will login the user to add employee
    async Login() {
        await this.emailTxtBox.fill('graceson121@gmail.com')
        await this.passwordTxtBox.fill('Testuser@123#')
        await this.getLoginBtn.click()

    }
}

export default HomePage;