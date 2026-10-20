import { useState } from "react";
import { Link } from "react-router";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Mock API / Supabase authentication stub
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-start sm:items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden my-4 sm:my-8">
        {/* Header banner with pale sky / secondary color */}
        <div className="bg-secondary py-5 px-6 sm:px-10 text-center border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-wide">
            Log In
          </h1>
        </div>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Welcome Back!
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
              You have successfully logged in. You can now manage or book your screening appointments.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:opacity-90 transition-opacity text-center"
              >
                Book Appointment
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-full hover:bg-slate-200 transition-colors text-center"
              >
                Go to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-6">
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

            {/* Admin shortcut link matching wireframe note */}
            <div className="pt-2 border-t border-slate-100 text-center sm:text-right">
              <Link
                to="/admin"
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                Admin log in &rarr;
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}