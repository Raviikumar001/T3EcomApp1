import React from "react";
import { Header } from "../_components/header";
import Link from "next/link";
const page: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="mb-5 ml-[35%] mr-[35%]  mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
        <form>
          <h2 className=" text-center text-3xl font-semibold">Login</h2>
          <p className="mt-4 text-center text-xl font-medium">
            Welcome back to ECOMMERCE
          </p>
          <p className=" mt-3 text-center ">
            The next gen business marketplace
          </p>

          <div className="mt-5">
            <label>Email</label>
            <br />
            <input
              className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="email"
              placeholder="Enter"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="password"
              placeholder="Enter"
            />
            <button className="mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white">
              LOGIN
            </button>

            <p className="mt-5 text-center text-gray-700">
              {" "}
              Don&apos;t have an Account?{" "}
              <span className="text-black">
                {" "}
                <Link href="/register">REGISTER </Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
