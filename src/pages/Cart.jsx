import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SectionTitle, CartItemsList, CartTotals } from "../components";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty"></SectionTitle>;
  }
  return (
    <>
      <SectionTitle text="Shopping cart"></SectionTitle>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList></CartItemsList>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals></CartTotals>
          {user ? (
            <Link
              to="/checkout"
              className="btn btn-primary btn-block mt-8 uppercase"
            >
              proceed to checkout
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-block mt-8 uppercase"
            >
              please log in
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
