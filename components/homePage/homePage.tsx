"use client";
import { log } from "node:console";
import { useEffect, useState } from "react";
import Popup from "../popup/popup";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const HomePage = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  // const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      setSpinner(true);
      if (localStorage.getItem("Category")) {
        setSelected(localStorage.getItem("Category") || "");
      }
      const response = await fetch(
        `/api/headline?category=${selected}&page=${page}&pageSize=${pageSize}`
      );
      const result = await response.json();
      setData(result.articles);
      localStorage.setItem("Category", selected);
      console.log;
      setTotalPages(Math.ceil(result.totalResults / pageSize));
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selected, page]);

  useEffect(() => {
    fetchDataBySearch();
  }, [searchTerm, page]);

  const fetchDataBySearch = async () => {
    try {
      if (searchTerm.length > 1) {
        setSpinner(true);
      //    if (localStorage.getItem("searchTerm")) {
      //   setSelected(localStorage.getItem("searchTerm") || "");
      // }
        localStorage.setItem("searchTerm", searchTerm);
        const response = await fetch(
          `/api/search?query=${searchTerm}&page=${page}&pageSize=${pageSize}`
        );
        const data = await response.json();
        setData(data);
        setSpinner(false);
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 min-h-screen">
      <div className="text-2xl sm:text-3xl text-center font-bold  my-3">
        Today Head Lines
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-center mb-6">
        <div className="flex justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-48 md:w-56 lg:w-64 p-2 border border-black rounded-lg bg-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-lg">Category:</span>
            <select
              className="w-full sm:w-48 p-2 border rounded-md text-lg"
              value={selected}
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {spinner ? (
          <div className="flex justify-center items-center col-span-3 min-h-[300px]">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-300 animate-spin" />
            </div>
          </div>
        ) : (
          data.map((article: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow  hover:shadow-lg transition flex flex-col gap-3 bg-gray-300 cursor-pointer"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-xl font-semibold">{article.title}</h2>

                <p className="text-gray-600">{article.description}</p>

                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
              </a>
            </div>
          ))
        )}
      </div>

      {/* {open && selectedArticle && (
        <Popup open={open} onClose={onClose} data={selectedArticle} />
      )} */}

      <div
        className={`flex justify-center md:justify-end gap-4 mt-2 ${
          spinner
            ? "fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg"
            : ""
        }`}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
