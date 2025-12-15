import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Job Opportunity
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Tekla &amp; AISC Experts Wanted!
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-md border border-brand-600 px-4 py-2 text-brand-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-brand-600 px-4 py-2 text-white"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="space-y-3 text-slate-800">
        <p>Dear All,</p>
        <p>
          We're hiring experienced professionals in Tekla and AISC standards, with expertise in
          Editing, Checking, and Modeling. Here's the opportunity:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Experience: 1 to 8 years</li>
          <li>Job Location: Mysore</li>
          <li>Salary: Very competitive</li>
          <li>
            Benefits:
            <ul className="list-disc pl-5">
              <li>Free food</li>
              <li>Excellent career growth opportunities</li>
            </ul>
          </li>
        </ul>
        <p>
          If you're interested, please fill out the details in the link below.
          We'll get in touch with you for further discussion.
        </p>
        <p>Looking forward to hearing from you!</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/register"
          className="rounded-md bg-brand-600 px-6 py-3 text-white shadow hover:bg-brand-500"
        >
          Start Application
        </Link>
        <Link
          to="/login"
          className="rounded-md border border-slate-300 px-6 py-3 text-slate-800"
        >
          Already applied? Login
        </Link>
      </div>
    </section>
  );
};

export default Home;

