import { ModuleRoutes } from "../routes";

// no es necesario testear los enum
describe("Routes", () => {
  test("Routes work without errors", () => {
    expect(ModuleRoutes.Home).toBe("");
    expect(ModuleRoutes.ShoppingCart).toBe("shopping-cart");
  });
});
