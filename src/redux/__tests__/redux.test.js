import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import { createMultilanguageReducer } from 'redux-multilanguage';

describe('Redux Store', () => {
  it('initializes with correct state shape', () => {
    const rootReducer = require('../reducers/rootReducer').default;
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const state = store.getState();

    expect(state).toHaveProperty('multilanguage');
    expect(state).toHaveProperty('productData');
    expect(state).toHaveProperty('merchantData');
    expect(state).toHaveProperty('cartData');
    expect(state).toHaveProperty('loading');
    expect(state).toHaveProperty('userData');
    expect(state).toHaveProperty('content');

    expect(state.productData).toEqual({ products: [], productid: '', categoryid: '' });
    expect(state.cartData.cartID).toBe('');
    expect(state.cartData.cartCount).toBe(0);
    expect(state.loading.isLoading).toBe(false);
  });

  it('multilanguage initializes with default language', () => {
    const rootReducer = require('../reducers/rootReducer').default;
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const { multilanguage } = store.getState();
    expect(multilanguage.currentLanguageCode).toBe('en');
  });
});

describe('Redux Actions', () => {
  it('setLoader dispatches SET_LOADER', () => {
    const { setLoader } = require('../actions/loaderActions');
    const rootReducer = require('../reducers/rootReducer').default;
    const store = createStore(rootReducer, applyMiddleware(thunk));

    store.dispatch(setLoader(true));
    expect(store.getState().loading.isLoading).toBe(true);

    store.dispatch(setLoader(false));
    expect(store.getState().loading.isLoading).toBe(false);
  });

  it('setProductID dispatches SET_PRODUCT_ID', () => {
    const { setProductID } = require('../actions/productActions');
    const rootReducer = require('../reducers/rootReducer').default;
    const store = createStore(rootReducer, applyMiddleware(thunk));

    store.dispatch(setProductID(123));
    expect(store.getState().productData.productid).toBe(123);

    store.dispatch(setProductID(456));
    expect(store.getState().productData.productid).toBe(456);
  });

  it('setCategoryID dispatches SET_CATEGORY_ID', () => {
    const { setCategoryID } = require('../actions/productActions');
    const rootReducer = require('../reducers/rootReducer').default;
    const store = createStore(rootReducer, applyMiddleware(thunk));

    store.dispatch(setCategoryID('fashion'));
    expect(store.getState().productData.categoryid).toBe('fashion');
  });

  it('setContent dispatches SET_CONTENT_ID', () => {
    const { setContent } = require('../actions/contentAction');
    const rootReducer = require('../reducers/rootReducer').default;
    const store = createStore(rootReducer, applyMiddleware(thunk));

    store.dispatch(setContent('about-us'));
    expect(store.getState().content.contentId).toBe('about-us');
  });
});
