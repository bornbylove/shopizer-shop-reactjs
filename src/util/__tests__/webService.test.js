const axios = require('axios');

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  defaults: { baseURL: '' },
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

beforeAll(() => {
  window._env_ = {
    APP_BASE_URL: 'http://localhost:8080',
    APP_API_VERSION: '/api/v1/',
    APP_MERCHANT: 'DEFAULT',
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('WebService', () => {
  it('get makes a GET request and returns data', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, name: 'test' } });
    const WebService = require('../webService').default;
    const result = await WebService.get('/products');
    expect(axios.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual({ id: 1, name: 'test' });
  });

  it('post makes a POST request with params and returns data', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });
    const WebService = require('../webService').default;
    const result = await WebService.post('/cart', { product: 'SKU123' });
    expect(axios.post).toHaveBeenCalledWith('/cart', { product: 'SKU123' });
    expect(result).toEqual({ success: true });
  });

  it('put makes a PUT request with params and returns data', async () => {
    axios.put.mockResolvedValue({ data: { updated: true } });
    const WebService = require('../webService').default;
    const result = await WebService.put('/cart/123', { quantity: 2 });
    expect(axios.put).toHaveBeenCalledWith('/cart/123', { quantity: 2 });
    expect(result).toEqual({ updated: true });
  });

  it('delete makes a DELETE request and returns data', async () => {
    axios.delete.mockResolvedValue({ data: { deleted: true } });
    const WebService = require('../webService').default;
    const result = await WebService.delete('/cart/123/product/456');
    expect(axios.delete).toHaveBeenCalledWith('/cart/123/product/456');
    expect(result).toEqual({ deleted: true });
  });

  it('patch makes a PATCH request with params and returns data', async () => {
    axios.patch.mockResolvedValue({ data: { patched: true } });
    const WebService = require('../webService').default;
    const result = await WebService.patch('/cart/123', { quantity: 3 });
    expect(axios.patch).toHaveBeenCalledWith('/cart/123', { quantity: 3 });
    expect(result).toEqual({ patched: true });
  });
});
