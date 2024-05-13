// @ts-nocheck
"use client";

import SkeletonLoader from "../_components/skeleton";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../_components/header";
import { api } from "~/trpc/react";
import toast, { Toaster } from "react-hot-toast";
const MainApp = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const { data, isLoading } = api.categories.getAllCategories.useQuery({
    page: currentPage,
  });

  const { data: userSelectedCategories } =
    api.categories.getUserCategories.useQuery();
  console.log(userSelectedCategories);
  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      setTotalPages(data.totalPages);
      if (currentPage > 4 && totalPages > 7) {
        setStartPage(currentPage - 3);
      } else {
        setStartPage(1);
      }
    }
    if (userSelectedCategories) {
      setSelectedCategoryIds(userSelectedCategories);
    }
  }, [data, currentPage, totalPages, userSelectedCategories]);

  const updateUserCategory = api.categories.updateUserCategory.useMutation({
    onSuccess: () => {
      toast.success("Updated cateogry prefrence!");
    },
    onError: (error) => {
      console.log(error);
      toast("There seems to be an error 😌, try again!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const handleCategoryCheckboxChange = (categoryId) => {
    setSelectedCategoryIds((prevSelectedCategoryIds) => {
      const updatedSelectedCategoryIds = prevSelectedCategoryIds.includes(
        categoryId,
      )
        ? prevSelectedCategoryIds.filter((id) => id !== categoryId)
        : [...prevSelectedCategoryIds, categoryId];

      updateUserCategory.mutate({ categoryId: categoryId });

      return updatedSelectedCategoryIds;
    });
  };

  const handlePagination = (page) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(newPage);
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />

      <div className="mb-5 ml-[35%] mr-[35%] mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
        <h2 className="mt-5 text-center text-3xl font-bold">
          Please mark your interests!
        </h2>
        <p className="mt-5 text-center">We will keep you notified</p>
        <h3 className="mt-10 text-xl font-medium">My saved interests!</h3>
        {/* Display categories */}
        {/* <ul>
          {categories.map((category) => (
            <li key={category.id}>{category?.name}</li>
          ))}
        </ul> */}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <ul className="mt-5">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="largerCheckbox bg-grey-700 rounded-md accent-gray-900"
                    checked={selectedCategoryIds.includes(category.id)}
                    onChange={() =>
                      handleCategoryCheckboxChange(parseInt(category.id))
                    }
                  />
                  <span className=" text-lg">{category.name} </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-start">
              <button
                className=" px-1.5 py-1"
                onClick={() => handlePagination(1)}
                disabled={currentPage === 1}
              >
                {"<<"}
              </button>
              <button
                className="px-1.5 py-1"
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, index) => {
                const page = startPage + index;
                return page <= totalPages ? (
                  <button
                    key={page}
                    className={` px-1.5 py-1 ${
                      currentPage === page
                        ? "font-bold text-black"
                        : "text-gray-600"
                    }`}
                    onClick={() => handlePagination(page)}
                  >
                    {page}
                  </button>
                ) : null;
              })}
              {totalPages > 7 && currentPage <= totalPages - 4 && (
                <span className=" px-1.5 py-1">...</span>
              )}
              {totalPages > 7 && (
                <button
                  className=" px-1.5 py-1"
                  onClick={() => handlePagination(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              )}
              <button
                className=" px-1.5 py-1"
                onClick={() => handlePagination(totalPages)}
                disabled={currentPage === totalPages}
              >
                {">>"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainApp;
