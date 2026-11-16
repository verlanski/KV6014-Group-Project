import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { saveToken } from "../services/auth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return "";

      case "password":
        if (!value) return "Password is required";
        return "";

      default:
        return "";
    }
  };

  const validateAll = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    // Re-validate on change if already touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      // Persist auth tokens & user info
      if (data.session?.access_token) {
        //Changed so that the access token is saved using the saveToken function, this way the header will update when the user logs in
        saveToken(data.session.access_token);
        localStorage.setItem("refresh_token", data.session.refresh_token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (data.role) {
        localStorage.setItem("user_role", data.role);
      }

      // Role-based routing: admin -> /admin, user -> /booking
      const destination = data.role === "admin" ? "/admin" : "/booking";
      navigate(destination);

    } catch (err) {
      setServerError(err.message || "Failed to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-start sm:items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden my-4 sm:my-8">
        {/* Header banner with pale sky / secondary color */}
        <div className="bg-secondary py-5 px-6 sm:px-10 text-center border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-wide">
            Log In
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-6">
          {serverError && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 font-medium"
            >
              {serverError}
            </div>
          )}
            {/* Email Field */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="email"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Email:
              </label>
              <div className="flex-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.email && errors.email
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="password"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Password:
              </label>
              <div className="flex-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.password && errors.password)}
                  aria-describedby={touched.password && errors.password ? "password-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.password && errors.password
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.password && errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 font-bold text-lg text-slate-900 hover:text-primary transition-colors py-2 px-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? "Logging in..." : "Log In"}</span>
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </button>

              <Link
                to="/register"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
              >
                Don't have an account? Register
              </Link>
            </div>
          </form>
      </div>
    </div>
  );
}