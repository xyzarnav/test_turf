// Overview.jsx
import React from "react";
import { useTable } from "react-table";

const Overview = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <section id="overview" className="mb-8">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <p>Welcome to the admin dashboard.</p>
      <section id="data-table" className="mb-8">
        <h2 className="text-xl font-bold mb-2">Data Table</h2>
        <table
          {...getTableProps()}
          className="min-w-full bg-gray-800 text-white"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 border-b border-gray-700 bg-gray-900 text-left text-sm leading-4 font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b border-gray-700 text-sm"
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
    </section>
  );
};

export default Overview;