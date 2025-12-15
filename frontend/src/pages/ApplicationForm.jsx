import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  nativePlace: "",
  highestQualification: "",
  contactNumber: "",
  teklaYears: "",
  aiscExperience: "no",
  editingExperience: "no",
  checkingExperience: "no",
  modelingExperience: "no",
  leadExperience: "",
  technicalSkills: "",
  basisForInterview: "",
  companiesWorked: "",
  currentSalary: "",
  lastIncrementDate: "",
  reasonForLeaving: "",
  expectedSalary: "",
  noticePeriod: "",
  additionalComments: "",
};

const ApplicationForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("DRAFT");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* =========================
     LOAD EXISTING APPLICATION
     ========================= */
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/api/application/me");
        if (data.application) {
          const app = data.application;
          setStatus(app.status);
          setForm({
            ...initialForm,
            name: app.user?.name || "",
            contactNumber: app.user?.contactNumber || "",
            nativePlace: app.nativePlace || "",
            highestQualification: app.highestQualification || "",
            teklaYears: app.teklaYears ?? "",
            aiscExperience: app.aiscExperience ? "yes" : "no",
            editingExperience: app.editingExperience ? "yes" : "no",
            checkingExperience: app.checkingExperience ? "yes" : "no",
            modelingExperience: app.modelingExperience ? "yes" : "no",
            leadExperience: app.leadExperience || "",
            technicalSkills: app.technicalSkills || "",
            basisForInterview: app.basisForInterview || "",
            companiesWorked: app.companiesWorked ?? "",
            currentSalary: app.currentSalary ?? "",
            lastIncrementDate: app.lastIncrementDate
              ? app.lastIncrementDate.substring(0, 10)
              : "",
            reasonForLeaving: app.reasonForLeaving || "",
            expectedSalary: app.expectedSalary ?? "",
            noticePeriod: app.noticePeriod || "",
            additionalComments: app.additionalComments || "",
          });
        }
      } catch (err) {
        console.error("Failed to load application", err);
      }
    };
    load();
  }, []);

  const readOnly = status !== "DRAFT";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     BUILD PAYLOAD
     ========================= */
  const payload = () => ({
    nativePlace: form.nativePlace,
    highestQualification: form.highestQualification,
    contactNumber: form.contactNumber,
    teklaYears: form.teklaYears ? Number(form.teklaYears) : null,
    aiscExperience: form.aiscExperience === "yes",
    editingExperience: form.editingExperience === "yes",
    checkingExperience: form.checkingExperience === "yes",
    modelingExperience: form.modelingExperience === "yes",
    leadExperience: form.leadExperience,
    technicalSkills: form.technicalSkills,
    basisForInterview: form.basisForInterview,
    companiesWorked: form.companiesWorked ? Number(form.companiesWorked) : null,
    currentSalary: form.currentSalary ? Number(form.currentSalary) : null,
    lastIncrementDate: form.lastIncrementDate || null,
    reasonForLeaving: form.reasonForLeaving,
    expectedSalary: form.expectedSalary ? Number(form.expectedSalary) : null,
    noticePeriod: form.noticePeriod,
    additionalComments: form.additionalComments,
  });

  /* =========================
     SAVE / SUBMIT
     ========================= */
  const save = async (type) => {
    setLoading(true);
    setMessage("");
    try {
      const route =
        type === "submit"
          ? "/api/application/submit"
          : "/api/application/save-draft";

      const { data } = await api.post(route, payload());
      setStatus(data.application.status);
      setMessage(type === "submit" ? "Application submitted!" : "Draft saved");

      if (type === "submit") {
        setTimeout(() => navigate("/dashboard"), 800);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Job Application</h2>
          <p className="text-sm text-slate-600">
            Complete all sections. Status: {status}
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-brand-600 underline"
        >
          Back
        </button>
      </div>

      <form className="mt-6 space-y-6">
        {/* ---------- Candidate Details ---------- */}
        <Section title="Candidate Details">
          <Grid>
            <Field label="Name" required>
              <input name="name" value={form.name} disabled className="input" />
            </Field>
            <Field label="Native Place">
              <input
                name="nativePlace"
                value={form.nativePlace}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
            <Field label="Highest Qualification">
              <input
                name="highestQualification"
                value={form.highestQualification}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
            <Field label="Contact Number" required>
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
          </Grid>
        </Section>

        {/* ---------- Experience ---------- */}
        <Section title="Experience Details">
          <Grid>
            <Field label="Total years of experience in Tekla">
              <input
                type="number"
                name="teklaYears"
                value={form.teklaYears}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>

            {[
              ["aiscExperience", "AISC experience"],
              ["editingExperience", "Editing experience"],
              ["checkingExperience", "Checking experience"],
              ["modelingExperience", "Modeling experience"],
            ].map(([key, label]) => (
              <Field key={key} label={label}>
                <select
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  disabled={readOnly}
                  className="input"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </Field>
            ))}

            <Field label="Project Lead / Team Lead experience">
              <input
                name="leadExperience"
                value={form.leadExperience}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
          </Grid>
        </Section>

        {/* ---------- Technical ---------- */}
        <Section title="Technical Skills">
          <Grid>
            <Field label="Familiarity with Editing / Checking / Modeling">
              <textarea
                name="technicalSkills"
                value={form.technicalSkills}
                onChange={handleChange}
                disabled={readOnly}
                className="input h-24"
              />
            </Field>
            <Field label="Basis for interview">
              <input
                name="basisForInterview"
                value={form.basisForInterview}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
          </Grid>
        </Section>

        {/* ---------- Professional ---------- */}
        <Section title="Professional Details">
          <Grid>
            <Field label="Number of companies worked with">
              <input
                type="number"
                name="companiesWorked"
                value={form.companiesWorked}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
            <Field label="Current salary (CTC per month)">
              <input
                type="number"
                name="currentSalary"
                value={form.currentSalary}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
            <Field label="Date of last increment">
              <input
                type="date"
                name="lastIncrementDate"
                value={form.lastIncrementDate}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
            <Field label="Reasons for leaving current company">
              <textarea
                name="reasonForLeaving"
                value={form.reasonForLeaving}
                onChange={handleChange}
                disabled={readOnly}
                className="input h-24"
              />
            </Field>
            <Field label="Expected salary (CTC per month)">
              <input
                type="number"
                name="expectedSalary"
                value={form.expectedSalary}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
            <Field label="Notice period">
              <input
                name="noticePeriod"
                value={form.noticePeriod}
                onChange={handleChange}
                disabled={readOnly}
                className="input"
              />
            </Field>
          </Grid>
        </Section>

        {/* ---------- Comments ---------- */}
        <Section title="Additional Comments">
          <Field label="Performance, achievements, strengths">
            <textarea
              name="additionalComments"
              value={form.additionalComments}
              onChange={handleChange}
              disabled={readOnly}
              className="input h-24"
            />
          </Field>
        </Section>

        {message && <p className="text-sm text-brand-600">{message}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={loading || readOnly}
            onClick={() => save("draft")}
            className="rounded-md border border-slate-300 px-5 py-2 disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={loading || readOnly}
            onClick={() => save("submit")}
            className="rounded-md bg-brand-600 px-5 py-2 text-white disabled:opacity-50"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="rounded-lg border border-slate-100 p-4">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <div className="mt-4 space-y-4">{children}</div>
  </div>
);

const Grid = ({ children }) => (
  <div className="grid gap-4 md:grid-cols-2">{children}</div>
);

const Field = ({ label, required, children }) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
    <span>
      {label} {required && <span className="text-red-600">*</span>}
    </span>
    {children}
  </label>
);

export default ApplicationForm;
