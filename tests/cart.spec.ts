import { test, expect } from "@playwright/test";
import { HomePageComponent } from "../Components/homePage.component";
import { PurchaseComponent } from "../Components/purchase.component";
import { CartComponent } from "../Components/cart.components";

test.describe("cart editing tests", () => {
  let homePageComponent: HomePageComponent;
  let purchaseComponent: PurchaseComponent;
  let cartComponent: CartComponent;

  test.beforeEach(async ({ page }) => {
    homePageComponent = new HomePageComponent(page);
    cartComponent = new CartComponent(page);
    purchaseComponent = new PurchaseComponent(page, homePageComponent);

    await page.goto("/");
  });

  test.afterEach("Status check", async ({ page }, testInfo) => {
    console.log(
      `Finished ${testInfo.title} test with status ${testInfo.status}`
    );

    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Failed ${testInfo.title} test`);
  });

  test("open_cart", async ({ page }) => {
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

  test("change_item_quantity", async ({ page }) => {
    //Arrange
    const buyedProduct = purchaseComponent.topProducts[0];
    const quantityInput = page.locator(".form-control");

    //Act
    await homePageComponent.topProductsSection.scrollIntoViewIfNeeded();
    await buyedProduct.hover();
    await purchaseComponent.clickAddToCartButton(
      purchaseComponent.topProductsAddToCartButtons[0]
    );
    await homePageComponent.viewCartButton.click();
    await quantityInput.first().fill("3");
    await quantityInput.first().press("Enter");

    //Assert
    await expect(cartComponent.cartModificationSuccessAlert).toContainText(
      "Success: You have modified your shopping cart!"
    );
  });
});

test.describe("empyting cart tests", () => {
  let homePageComponent: HomePageComponent;
  let purchaseComponent: PurchaseComponent;
  let cartComponent: CartComponent;

  test.beforeEach(async ({ page }) => {
    homePageComponent = new HomePageComponent(page);
    purchaseComponent = new PurchaseComponent(page, homePageComponent);
    cartComponent = new CartComponent(page);
    const buyedProducts = [
      purchaseComponent.topProducts[0],
      purchaseComponent.topProducts[1],
      purchaseComponent.topProducts[2],
    ];

    await page.goto("/");
    await homePageComponent.topProductsSection.scrollIntoViewIfNeeded();
    for (let i = 0; i < 3; i++) {
      await buyedProducts[i].hover();
      await purchaseComponent.clickAddToCartButton(
        purchaseComponent.topProductsAddToCartButtons[i]
      );
    }
    await homePageComponent.viewCartButton.first().click();
  });

  test.afterEach("Status check", async ({ page }, testInfo) => {
    console.log(
      `Finished ${testInfo.title} test with status ${testInfo.status}`
    );

    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Failed ${testInfo.title} test`);
  });

  test("remove_all_items_from_cart", async ({ page }) => {
    //Arrange
    const removeFromCartButton = cartComponent.removeFromCartButton;

    //Act
    for (let i = 0; i < 3; i++) {
      if (removeFromCartButton) {
        await removeFromCartButton.first().click();
        await page.waitForTimeout(500);
      }
    }
    //Assert
    await expect
      .soft(cartComponent.emptyCartContent)
      .toContainText(cartComponent.emptyCartExpectedMessage);
  });
});
