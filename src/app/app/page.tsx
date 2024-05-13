"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../_components/header";
import { api } from "~/trpc/react";

const MainApp = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  // Fetch categories using useQuery from your API
  const { data, error, isLoading } = api.categories.getAllCategories.useQuery({
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
      // Handle success, e.g., show a toast notification
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
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

  ///// pagination
  // useEffect(() => {
  //   if (data) {
  //     setCategories(data.categories);
  //     setTotalPages(data.totalPages);
  //     if (currentPage > 4 && totalPages > 7) {
  //       setStartPage(currentPage - 3);
  //     } else {
  //       setStartPage(1);
  //     }
  //   }
  // }, [data, currentPage, totalPages]);

  const handlePagination = (page) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(newPage);
  };
  return (
    <div>
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

        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <input
                type="checkbox"
                checked={selectedCategoryIds.includes(category.id)}
                onChange={() =>
                  handleCategoryCheckboxChange(parseInt(category.id))
                }
              />
              {category.name}
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
      </div>
    </div>
  );
};

export default MainApp;

{
  /* Pagination */
}
{
  /* <div className="mt-5 flex items-center justify-center">
          <button
            className="mx-1 rounded bg-gray-200 px-3 py-1"
            onClick={() => handlePagination(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className="mx-1 rounded bg-gray-200 px-3 py-1"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`mx-1 rounded bg-gray-200 px-3 py-1 ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
                onClick={() => handlePagination(page)}
              >
                {page}
              </button>
            ),
          )}
          <button
            className="mx-1 rounded bg-gray-200 px-3 py-1"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className="mx-1 rounded bg-gray-200 px-3 py-1"
            onClick={() => handlePagination(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div> */
}
{
  /* <div className="mt-5 flex items-center justify-center">
          <button
            className=" mx-1  px-3 py-1"
            onClick={() => handlePagination(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className="mx-1  px-3 py-1"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from(
            { length: totalPages > 7 ? 7 : totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              key={page}
              className={` px-3 py-1 ${currentPage === page ? " font-bold text-black" : " text-gray-600"}`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
          {totalPages > 7 && (
            <button
              className="mx-1  px-3 py-1"
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          )}
          <button
            className="mx-1  px-3 py-1"
            onClick={() => handlePagination(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>{" "} */
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Header } from "../_components/header";
// import { api } from "~/trpc/react";

// const MainApp = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const data = api.categories.getAllCategories.useQuery({ page: 2 });

//   return (
//     <div>
//       <Header />

//       <div className="mb-5 ml-[35%] mr-[35%] mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
//         <h2 className="mt-5 text-center text-3xl font-bold">
//           Please mark your intrests!
//         </h2>
//         <p className="mt-5 text-center">We will keep you notified</p>

//         <h3 className="mt-10 text-xl font-medium">My saved intrests!</h3>

//       </div>
//     </div>
//   );
// };

// export default MainApp;
