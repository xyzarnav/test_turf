import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import axios from "axios";
import ReactPaginate from "react-paginate";

// Global Filter component for searching
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <span className="text-white">
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
        placeholder="Search users"
      />
    </span>
  );
};

const Users = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10; // Display 10 queries at a time

  // Fetch user data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users"); // API endpoint
        setData(response.data);
        setPageCount(Math.ceil(response.data.length / itemsPerPage)); // Calculate total pages
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "UserID",
        accessor: "UserID",
      },
      {
        Header: "FullName",
        accessor: "FullName",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      
    
      {
        Header: "Gender",
        accessor: "Gender",
      },
    ],
    []
  );

  // React Table Hooks for pagination and global filtering (search)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page, // Use the current page rows
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: itemsPerPage } },
    useGlobalFilter, // For search functionality
    usePagination // For pagination functionality
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setPageSize(itemsPerPage); // Set number of rows per page
  };

  return (
    <section id="users" className="mb-8">
      <h2 className="text-xl font-bold mb-2 text-white">Users</h2>
      <p className="text-white mb-4">Manage your users here.</p>

      {/* Global Filter (Search Bar) */}
      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/* Table */}
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-600 mt-4"
      >
        <thead className="bg-gray-800 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-gray-900 divide-y divide-gray-700 text-white"
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center space-x-2"}
          pageClassName={"page-item"}
          pageLinkClassName={
            "page-link text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          }
          previousClassName={"page-item"}
          previousLinkClassName={
            "page-link text-black bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          }
          nextClassName={"page-item"}
          nextLinkClassName={
            "page-link text-black bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          }
          activeClassName={"bg-blue-800"}
        />
      </div>
    </section>
  );
};

export default Users;
