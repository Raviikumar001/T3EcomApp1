import React from "react";
import { Header } from "../_components/header";

const page = () => {
  return (
    <div>
      <Header />

      <div className="mb-5 ml-[35%] mr-[35%] mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
        <h2 className="mt-5 text-center text-3xl font-bold">
          Please mark your intrests!
        </h2>
        <p className="mt-5 text-center">We will keep you notified</p>

        <h3 className="mt-10 text-xl font-medium">My saved intrests!</h3>
      </div>
    </div>
  );
};

export default page;
