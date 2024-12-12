import { productResponseMock } from "../__mocks__/product";
import { getProducts } from "../product-request";


// esto podr'ia ser un util ya que se repite en category.request
const mockFetch = (data: any, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
      blob: () => Promise.resolve(data),
      clone: () => ({ ...response }),
      Text: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });

  global.fetch = fn;
  return fn;
};

describe("ProductResponse", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });


  it("should get products", async () => {
    mockFetch({ products: productResponseMock });
    const response = await getProducts();
    expect(response).toEqual(productResponseMock);
  })

  it("should not load products", async () => {
    mockFetch({}, 500, false);
    try {
      await getProducts();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should get products with error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(
        new Error("Hubo un problema al obtener las categorías.")
      );
    try {
      await getProducts();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
