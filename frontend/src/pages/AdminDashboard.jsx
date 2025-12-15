import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const statuses = [
  "NEW",
  "SHORTLISTED",
  "REJECTED",
  "INTERVIEW_SCHEDULED",
  "HIRED",
  "SUBMITTED",
  "DRAFT",
];

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [minExp, setMinExp] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (pageParam = page) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("page", pageParam);
    params.append("limit", 10);
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (minExp) params.append("minExperience", minExp);
    try {
      const { data } = await api.get(`/api/admin/applications?${params.toString()}`);
      setItems(data.applications);
      setTotal(data.pagination.total);
      setPage(data.pagination.page);

    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = Math.ceil(total / 10) || 1;

  return (
    <div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Admin Dashboard</h2>
          <p className="text-sm text-slate-600">Review candidate applications</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search name or contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-64"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input w-48"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Tekla exp"
          value={minExp}
          onChange={(e) => setMinExp(e.target.value)}
          className="input w-40"
        />
        <button
          onClick={() => fetchData(1)}
          className="rounded-md bg-brand-600 px-4 py-2 text-white"
        >
          Filter
        </button>
      </div>

      <div className="overflow-auto rounded-lg border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <Th>Candidate</Th>
              <Th>Contact</Th>
              <Th>Tekla Exp</Th>
              <Th>Expected Salary</Th>
              <Th>Status</Th>
              <Th>Submitted</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading && (
              <tr>
                <td className="p-4 text-center" colSpan={7}>
                  Loading...
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td className="p-4 text-center" colSpan={7}>
                  No applications found
                </td>
              </tr>
            )}
            {!loading &&
              items.map((item) => (
                <tr key={item.id}>
                  <Td>{item.user?.name}</Td>
                  <Td>{item.user?.contactNumber}</Td>
                  <Td>{item.teklaYears ?? "-"}</Td>
                  <Td>{item.expectedSalary ?? "-"}</Td>
                  <Td>{item.status}</Td>
                  <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Link
                      to={`/admin/applications/${item.id}`}
                      className="text-brand-600 underline"
                    >
                      View
                    </Link>
                  </Td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => fetchData(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-slate-600">
          Page {page} of {pages}
        </span>
        <button
          onClick={() => fetchData(Math.min(pages, page + 1))}
          disabled={page >= pages}
          className="rounded-md border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
    {children}
  </th>
);

const Td = ({ children }) => <td className="px-4 py-3 text-slate-800">{children}</td>;

export default AdminDashboard;

