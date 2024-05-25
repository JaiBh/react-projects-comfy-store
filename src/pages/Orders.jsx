import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { ComplexPaginationContainer, SectionTitle } from "../components";
import OrdersList from "../components/OrdersList";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () => {
      return customFetch.get(`/orders`, {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!store.getState().userState.user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const resp = await queryClient.ensureQueryData(ordersQuery(params, user));
      return { orders: resp.data.data, meta: resp.data.meta };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error loading orders";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text={"please make an order"}></SectionTitle>;
  }
  return (
    <>
      <SectionTitle text={"Your Orders"}></SectionTitle>
      <OrdersList></OrdersList>
      <ComplexPaginationContainer></ComplexPaginationContainer>
    </>
  );
};
export default Orders;
