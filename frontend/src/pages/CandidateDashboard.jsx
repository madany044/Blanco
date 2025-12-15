import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../services/AuthContext";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await api.get("/application/me");
        setApplication(data.application);
      } catch {
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  if (loading) return null;

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Welcome, {user?.name}
      </h2>
      <p className="text-sm text-slate-600">
        Manage your application for Tekla &amp; AISC opportunity.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-100 p-4">
          <p className="text-sm font-medium text-slate-700">Application status</p>
          <p className="text-lg font-semibold text-brand-600">
            {application?.status || "Draft"}
          </p>
          <p className="text-sm text-slate-500">
            {application ? "View or edit your submission." : "You have not started yet."}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to="/application"
          className="rounded-md bg-brand-600 px-5 py-2 text-white"
        >
          {application ? "View / Update Application" : "Start Application"}
        </Link>
      </div>
    </div>
  );
};

export default CandidateDashboard;

