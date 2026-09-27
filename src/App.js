import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { ErrorBoundary } from "react-error-boundary";

import Loader from "./components/loader/loader"
import Cookie from "./components/consent/Cookie"
import Cookies from 'universal-cookie';


import {
  setShopizerCartID
} from "./redux/actions/cartActions";

// var sha512 = require('js-sha512').sha512;
// home pages
const Home = lazy(() => import("./pages/home/Home"));

// shop pages
const Category = lazy(() => import("./pages/category/Category"));

// product pages
const ProductDetail = lazy(() => import("./pages/product-details/ProductDetail"));

// other pages
// const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/other/ResetPassword"));

const Cart = lazy(() => import("./pages/other/Cart"));
const RecentOrder = lazy(() => import("./pages/other/RecentOrder"));
const OrderDetails = lazy(() => import("./pages/other/OrderDetails"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
const OrderConfirm = lazy(() => import("./pages/other/OrderConfirm"));
const Content = lazy(() => import("./pages/content/Content"));
const SearchProduct = lazy(() => import("./pages/search-product/SearchProduct"));


//export default function App = (props) => {
const App = (props) => {


  useEffect(() => {
    var cart_cookie = window._env_.APP_MERCHANT + '_shopizer_cart';
    const cookies = new Cookies();
    let cookie = cookies.get(cart_cookie);
    if (cookie) {
      props.dispatch(setShopizerCartID(cookie));
    }
    // console.log(window._env_);
    document.documentElement.style.setProperty('--theme-color', window._env_.APP_THEME_COLOR)
    //if(cookies[cart_cookie]) {
    //  console.log('cookie !!! ' + cookies[cart_cookie]);
    //  props.dispatch(setShopizerCartID(cookies[cart_cookie]));
    //}
    props.dispatch(
      loadLanguages({
        languages: { //from merchant supported languages
          en: require("./translations/english.json"),
          fr: require("./translations/french.json")
        }
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>

          <Loader></Loader>
          <Cookie></Cookie>
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />

                {/* Homepages */}


                {/* Shop pages */}
                <Route
                  path="/category/:id"
                  element={<Category />}
                />

                {/* Shop product pages */}
                <Route
                  path="/product/:id"
                  element={<ProductDetail />}
                />
                <Route
                  path="/content/:id"
                  element={<Content />}
                />
                <Route
                  path="/search/:id"
                  element={<SearchProduct />}
                />

                {/* Other pages */}

                <Route
                  path="/contact"
                  element={<Contact />}
                />
                <Route
                  path="/my-account"
                  element={<MyAccount />}
                />
                <Route
                  path="/register"
                  element={<LoginRegister />}
                />
                <Route
                  path="/login"
                  element={<LoginRegister />}
                />
                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />
                <Route
                  path="/customer/:code/reset/:id"
                  element={<ResetPassword />}
                />

                <Route
                  path="/cart"
                  element={<Cart />}
                />
                <Route
                  path="/recent-order"
                  element={<RecentOrder />}
                />
                <Route
                  path="/order-details/:id"
                  element={<OrderDetails />}
                />
                <Route
                  path="/checkout"
                  element={<Checkout />}
                />

                <Route
                  path="/order-confirm"
                  element={<OrderConfirm />}
                />

                <Route
                  path={"/not-found"}
                  element={<NotFound />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ScrollToTop>
          </ErrorBoundary>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-boundary" style={{ textAlign: 'center', padding: '50px' }}>
    <h2>Something went wrong</h2>
    {process.env.NODE_ENV === 'development' && <pre style={{ color: 'red' }}>{error.message}</pre>}
    <button onClick={resetErrorBoundary} style={{ padding: '10px 20px', cursor: 'pointer' }}>
      Try again
    </button>
  </div>
);

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
