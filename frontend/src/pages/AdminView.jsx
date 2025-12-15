import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const AdminView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get(`/admin/applications/${id}`);
      setApplication(data.application);
      setNotes(data.application.adminNotes || "");
      setStatus(data.application.status);
    } catch {
      setApplication(null);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const saveStatus = async () => {
    await api.put(`/admin/applications/${id}/status`, { status });
    setMessage("Status updated");
    load();
  };

  const saveNotes = async () => {
    await api.put(`/admin/applications/${id}/notes`, { adminNotes: notes });
    setMessage("Notes saved");
    load();
  };

  if (!application) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p>Application not found</p>
      </div>
    );
  }

  const Field = ({ label, value }) => (
    <div>
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value || "-"}</p>
    </div>
  );

  const bool = (v) => (v ? "Yes" : "No");

  return (
    <div className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {application.user?.name}
          </h2>
          <p className="text-sm text-slate-600">Contact: {application.user?.contactNumber}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-brand-600 underline"
        >
          Back
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Tekla Experience (years)" value={application.teklaYears} />
        <Field label="Expected Salary" value={application.expectedSalary} />
        <Field label="AISC Experience" value={bool(application.aiscExperience)} />
        <Field label="Editing Experience" value={bool(application.editingExperience)} />
        <Field label="Checking Experience" value={bool(application.checkingExperience)} />
        <Field label="Modeling Experience" value={bool(application.modelingExperience)} />
        <Field label="Lead Experience" value={application.leadExperience} />
        <Field label="Companies Worked" value={application.companiesWorked} />
        <Field label="Current Salary" value={application.currentSalary} />
        <Field label="Last Increment" value={application.lastIncrementDate?.substring(0, 10)} />
        <Field label="Notice Period" value={application.noticePeriod} />
        <Field label="Status" value={application.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Technical Skills" value={application.technicalSkills} />
        <Field label="Basis for Interview" value={application.basisForInterview} />
        <Field label="Reason for Leaving" value={application.reasonForLeaving} />
        <Field label="Additional Comments" value={application.additionalComments} />
      </div>

      <div className="space-y-3 rounded-lg border border-slate-100 p-4">
        <p className="text-sm font-semibold text-slate-800">Admin actions</p>
        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input w-52"
          >
            {[
              "NEW",
              "SHORTLISTED",
              "REJECTED",
              "INTERVIEW_SCHEDULED",
              "HIRED",
              "SUBMITTED",
              "DRAFT",
            ].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={saveStatus}
            className="rounded-md bg-brand-600 px-4 py-2 text-white"
          >
            Update Status
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Private notes</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input mt-1 h-28"
            placeholder="Notes visible to admins only"
          />
          <button
            onClick={saveNotes}
            className="mt-2 rounded-md border px-4 py-2"
          >
            Save Notes
          </button>
        </div>
        {message && <p className="text-sm text-brand-600">{message}</p>}
      </div>
    </div>
  );
};

export default AdminView;

