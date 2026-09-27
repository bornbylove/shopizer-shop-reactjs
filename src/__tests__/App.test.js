import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createMultilanguageReducer } from 'redux-multilanguage';

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
  productData: () => ({ products: [], productid: '', categoryid: '' }),
  merchantData: () => ({ merchant: '', defaultStore: '' }),
  cartData: () => ({ cartItems: {}, cartID: '', cartCount: 0, orderID: '' }),
  loading: () => ({ isLoading: false }),
  userData: () => ({ userData: '', country: [], shipCountry: [], state: [], shipState: [], currentAddress: [] }),
  content: () => ({ contentId: '' }),
});

const store = createStore(rootReducer, applyMiddleware(thunk));

test('App renders without crashing', () => {
  const App = require('../App').default;
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toBeInTheDocument();
});
