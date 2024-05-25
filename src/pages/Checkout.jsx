import { useSelector } from "react-redux";
import { CartTotals, CheckoutForm, SectionTitle } from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((store) => store.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty"></SectionTitle>;
  }
  return (
    <>
      <SectionTitle text="place your order"></SectionTitle>
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm></CheckoutForm>
        <CartTotals></CartTotals>
      </div>
    </>
  );
};
export default Checkout;
