import React from "react";
import Link from "next/link";
import { Header } from "../_components/header";
const page: React.FC = () => {
  return (
    <div>
      <Header />

      <div className="mb-5 ml-[30%] mr-[30%]   mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
        <form>
          <h2 className="text-center text-3xl font-semibold">
            Create your account
          </h2>

          <div className="mt-5">
            <label>Name</label>
            <br />
            <input
              className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="text"
              placeholder="Enter"
            />

            <br />
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
              CREATE ACCOUNT
            </button>

            <p className="mt-5 text-center text-gray-700">
              {" "}
              Have an Account?{" "}
              <span className="text-black">
                <Link href="/login">LOGIN </Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
