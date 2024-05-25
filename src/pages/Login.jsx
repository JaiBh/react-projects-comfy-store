import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const resp = await customFetch.post("/auth/local/", data);
      store.dispatch(loginUser(resp.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
    }
    return null;
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const resp = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(resp.data));
      toast.success("Welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error. Please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier"></FormInput>
        <FormInput type="password" label="password" name="password"></FormInput>
        <div className="mt-4">
          <SubmitBtn text="login"></SubmitBtn>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block uppercase"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
