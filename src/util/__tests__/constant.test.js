describe('Constants', () => {
  it('ACTION constants are defined', () => {
    const Constant = require('../constant').default;
    expect(Constant.ACTION.STORE).toBe('store/');
    expect(Constant.ACTION.CATEGORY).toBe('category/');
    expect(Constant.ACTION.CONTENT).toBe('content/');
    expect(Constant.ACTION.PRODUCTS).toBe('products/');
    expect(Constant.ACTION.CART).toBe('cart/');
    expect(Constant.ACTION.CUSTOMER).toBe('customer/');
    expect(Constant.ACTION.CUSTOMERS).toBe('customers/');
    expect(Constant.ACTION.AUTH).toBe('auth/');
    expect(Constant.ACTION.SHIPPING).toBe('shipping');
    expect(Constant.ACTION.CHECKOUT).toBe('checkout');
  });
});
