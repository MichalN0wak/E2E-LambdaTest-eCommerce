import { test, expect } from "@playwright/test";
import { NavBarComponent } from "../Components/nav-bar.component";
import { HomePageComponent } from "../Components/homePage.component";

test.describe("", () => {
  let homePageComponent: HomePageComponent;

  test.beforeEach(async ({ page }) => {
    homePageComponent = new HomePageComponent(page);

    await page.goto("/");
  });

  test.only("open_cart", async ({ page }) => {
    //Arrange
    const cartButton = homePageComponent.cartButton;
    const editCartButton = homePageComponent.editCartButton;

    //Act
    await cartButton.click();
    await editCartButton.click();

    //Assert
    await expect(page).toHaveURL(
      "https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart"
    );
  });
});
