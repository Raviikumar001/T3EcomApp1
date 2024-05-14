import React from "react";

const SkeletonLoader = () => {
  return (
    <div>
      {/* <h2 className="mx-auto mt-5 h-8 w-48 animate-pulse bg-gray-300 text-center text-3xl font-bold"></h2>
      <p className="mx-auto mt-5 h-4 w-32 animate-pulse bg-gray-300 text-center"></p>
      <h3 className="mt-10 h-6 w-40 animate-pulse bg-gray-300 text-xl font-medium"></h3> */}
      <ul className="mt-5">
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index} className="mb-2 flex items-center">
            <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-8 w-36 animate-pulse bg-gray-300"></div>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-start">
        <div className="mr-2 h-10 w-8 animate-pulse rounded bg-gray-300"></div>
        <div className="mr-2 h-10 w-8 animate-pulse rounded bg-gray-300"></div>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="mx-1 h-10 w-8 animate-pulse rounded bg-gray-300"
          ></div>
        ))}
        <div className="ml-2 h-10 w-8 animate-pulse rounded bg-gray-300"></div>
        <div className="ml-2 h-10 w-8 animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
