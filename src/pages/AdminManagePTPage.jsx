import { useState } from "react";
import { Link } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateField = (name, value, allValues) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Please give your name.";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s'.-]+$/.test(value.trim())) return "Please enter a valid name";
        return "";

      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please check your details and try again.");
      }

      setIsSuccess(true);
    } catch (err) {
      setServerError(err.message || "Failed to submit. Please check your network connection and try again.");
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
            Campaigns
          </h1>
        </div>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Campaign Successfully Submitted!
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
              Thank you for submitting your campaign details. Our team will review them soon.
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
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0">
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
                      : "border-slate-800 focus:border-primary"}`}/>
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
                  }`}/>
                {touched.phone && errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
           
            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center text-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 font-bold text-lg text-slate-900 hover:text-primary transition-colors py-2 px-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 cursor-pointer">
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}