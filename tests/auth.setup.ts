import { test as setup, expect } from "@playwright/test";
import { NavBarComponent } from "../Components/nav-bar.component";
import { LoginPage } from "../Pages/login.page";
import { loginData } from "../test-data/login.data";
import { HomePageComponent } from "../Components/homePage.component";

const authFile = "./loginAuth.json";

setup("authenticate", async ({ page }) => {
  //Arrange
  const navBar = new NavBarComponent(page);
  const loginPage = new LoginPage(page);
  const homePageComponent = new HomePageComponent(page);

  //Act
  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await navBar.myAccountButton.hover();
  await page.getByRole("link", { name: "Login" }).click();
  await loginPage.login(loginData.userEmail, loginData.userPassword);
  await homePageComponent.homeLogo.click();
  await expect(page).toHaveURL(loginPage.expectedUrl);

  //Assert
  await page.context().storageState({ path: authFile });
});
