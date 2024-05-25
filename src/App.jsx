import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages/index";
import { store } from "./store";
import { ErrorElement } from "./components";

// loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";

// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        errorElement: <ErrorElement></ErrorElement>,
        loader: landingLoader(queryClient),
      },
      {
        path: "products",
        element: <Products></Products>,
        errorElement: <ErrorElement></ErrorElement>,
        loader: productsLoader(queryClient),
      },
      {
        path: "products/:id",
        element: <SingleProduct></SingleProduct>,
        loader: singleProductLoader(queryClient),
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error></Error>,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <Error></Error>,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};
export default App;
