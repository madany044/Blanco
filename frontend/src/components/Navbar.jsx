import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold text-brand-600">
          Blanco Hiring Portal
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          {!user && (
            <>
              <Link
                to="/login"
                className="rounded-md border border-brand-600 px-3 py-1 text-brand-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-brand-600 px-3 py-1 text-white"
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <span className="text-slate-700">Hi, {user.name}</span>
              {user.role === "ADMIN" ? (
                <Link to="/admin" className="text-brand-600 underline">
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/dashboard" className="text-brand-600 underline">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="rounded-md border px-3 py-1 text-slate-700"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

