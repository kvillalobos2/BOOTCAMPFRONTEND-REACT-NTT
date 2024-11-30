import { ModuleRoutes } from "../routes";

describe("Routes", () => {
  test("Routes work without errors", () => {
    expect(ModuleRoutes.Home).toBe("");
    expect(ModuleRoutes.ShoppingCart).toBe("shopping-cart");
  });
});
