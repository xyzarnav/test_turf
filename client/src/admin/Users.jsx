import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users"); // Change this to your actual API endpoint
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs only once after the component mounts

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <section id="users" className="mb-8">
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <p>Manage your users here.</p>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
