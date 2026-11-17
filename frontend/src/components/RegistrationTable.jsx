
import { useMemo, useState } from "react";
import { registrations } from "../data/registrations";

function RegistrationTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Search and filter registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        registration.id.toLowerCase().includes(searchText) ||
        registration.owner.toLowerCase().includes(searchText) ||
        registration.brand.toLowerCase().includes(searchText) ||
        registration.model.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        registration.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredRegistrations.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedRegistrations = filteredRegistrations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset pagination when searching or filtering
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section
      id="registrations"
      className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Table heading */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Car Registrations
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View and manage submitted car show registrations.
        </p>
      </div>

      {/* Search and filter */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search ID, owner, brand, or model..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:max-w-md"
        />

        <select
          value={statusFilter}
          onChange={(e) => handleFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Registration count */}
      <div className="mb-4 text-sm text-slate-500">
        Showing {filteredRegistrations.length === 0 ? 0 : startIndex + 1}
        {" - "}
        {Math.min(startIndex + itemsPerPage, filteredRegistrations.length)}
        {" of "}
        {filteredRegistrations.length} registrations
      </div>

      {/* Responsive table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-4 font-semibold">Registration ID</th>
              <th className="px-4 py-4 font-semibold">Owner</th>
              <th className="px-4 py-4 font-semibold">Car</th>
              <th className="px-4 py-4 font-semibold">Category</th>
              <th className="px-4 py-4 font-semibold">Date</th>
              <th className="px-4 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {displayedRegistrations.map((registration) => (
              <tr
                key={registration.id}
                className="transition hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-4 font-medium text-blue-600">
                  {registration.id}
                </td>

                <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800">
                  {registration.owner}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                  {registration.brand} {registration.model}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                  {registration.category}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                  {registration.date}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      registration.status
                    )}`}
                  >
                    {registration.status}
                  </span>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {displayedRegistrations.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-12 text-center">
                  <p className="font-semibold text-slate-700">
                    No registrations found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRegistrations.length > 0 && (
        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default RegistrationTable;
