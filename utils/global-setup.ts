import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {

  const browser = await chromium.launch();
  const page = await browser.newPage()

  await page.goto('https://sandbox-login.brighthr.com/login')
  await page.context().storageState({ path: 'notLoggedInState.json' });
  // login
  await page.locator('#email').fill('graceson121@gmail.com')
  await page.locator('#password').fill('Testuser@123#')
  await page.getByRole('button', { name: 'Login' }).click();

  // save signed-in state to 'loggedInState.json'
  await page.context().storageState({ path: 'loggedInState.json' });
  // await browser.close();
}

export default globalSetup;