import { useState } from "react";
import { Link } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateField = (name, value, allValues) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s'.-]+$/.test(value.trim())) return "Please enter a valid name";
        return "";

      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return "";

      case "address":
        if (!value.trim()) return "Residential address is required";
        if (value.trim().length < 5) return "Please enter a complete address";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\+?[0-9\s-]{8,16}$/.test(value.trim())) {
          return "Please enter a valid phone number (e.g. +60 12-345 6789)";
        }
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
          return "Password must include both letters and numbers";
        }
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== allValues.password) return "Passwords do not match";
        return "";

      case "consent":
        if (!value) return "You must consent to data collection to register";
        return "";

      default:
        return "";
    }
  };

  const validateAll = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key], data);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    const updatedData = {
      ...formData,
      [name]: fieldValue,
    };

    setFormData(updatedData);

    // If already touched, re-validate on change
    if (touched[name]) {
      const fieldError = validateField(name, fieldValue, updatedData);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));

      // Special check: if password changes, recheck confirmPassword if touched
      if (name === "password" && touched.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateField("confirmPassword", updatedData.confirmPassword, updatedData),
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, fieldValue, formData);
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
      // Focus on first invalid element
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
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          consent: formData.consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed. Please check your details and try again.");
      }

      setIsSuccess(true);
    } catch (err) {
      setServerError(err.message || "Failed to register. Please check your network connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-start sm:items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden my-4 sm:my-8">
        {/* Header matching Figma wireframe */}
        <div className="bg-bg-surface py-5 px-6 sm:px-10 text-center border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-wide">
            Registration
          </h1>
        </div>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Registration Successful!
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
              Thank you for registering with the ROSE Organisation. You can now log in to book your screening appointment.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Go to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-6">
            {serverError && (
              <div
                role="alert"
                className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 font-medium"
              >
                {serverError}
              </div>
            )}
            {/* Full Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="fullName"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Full Name
              </label>
              <div className="flex-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.fullName && errors.fullName)}
                  aria-describedby={touched.fullName && errors.fullName ? "fullName-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.fullName && errors.fullName
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.fullName && errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="email"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Email
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

            {/* Address */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="address"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Address
              </label>
              <div className="flex-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Residential address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.address && errors.address)}
                  aria-describedby={touched.address && errors.address ? "address-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.address && errors.address
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.address && errors.address && (
                  <p id="address-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="phone"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Phone
              </label>
              <div className="flex-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="012345678901"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.phone && errors.phone)}
                  aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.phone && errors.phone
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.phone && errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="password"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Password
              </label>
              <div className="flex-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters (letters & numbers)"
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

            {/* Confirm Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="confirmPassword"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Confirm Password
              </label>
              <div className="flex-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                  aria-describedby={touched.confirmPassword && errors.confirmPassword ? "confirmPassword-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p id="confirmPassword-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Data Collection Consent Checkbox */}
            <div className="pt-2">
              <div
                className={`flex items-start gap-3 p-3.5 rounded-lg border transition-colors ${
                  touched.consent && errors.consent
                    ? "bg-red-50 border-red-300"
                    : "bg-bg-surface-alternative/60 border-slate-200"
                }`}
              >
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.consent && errors.consent)}
                  aria-describedby={touched.consent && errors.consent ? "consent-error" : undefined}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                />
                <label
                  htmlFor="consent"
                  className="text-xs sm:text-sm text-slate-700 leading-relaxed cursor-pointer select-none"
                >
                  I consent to the collection and processing of my personal and health information by the ROSE Organisation for the purpose of cervical cancer screening, health records, and communication of test results.
                </label>
              </div>
              {touched.consent && errors.consent && (
                <p id="consent-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 font-bold text-lg text-slate-900 hover:text-primary transition-colors py-2 px-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? "Registering..." : "Register"}</span>
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </button>

              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
              >
                Already have an account? Log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}