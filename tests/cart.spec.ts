import { test, expect, Locator } from "@playwright/test";
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
    const buyedProduct = purchaseComponent.topProduct1;
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
    const buyedProduct = purchaseComponent.topProduct1;

    await page.goto("/");
    await homePageComponent.topProductsSection.scrollIntoViewIfNeeded();
    await buyedProduct.hover();
    await purchaseComponent.clickAddToCartButton(
      purchaseComponent.topProductsAddToCartButtons[0]
    );
    await homePageComponent.viewCartButton.click();
  });

  test("remove_item_from_cart", async ({ page }) => {
    //Arrange
    const removeFromCartButton = cartComponent.removeFromCartButton;

    //Act
    if (removeFromCartButton) {
      await removeFromCartButton.click();
    }

    //Assert
    await expect(cartComponent.emptyCartContent).toContainText(
      cartComponent.emptyCartExpectedMessage
    );
  });
});
