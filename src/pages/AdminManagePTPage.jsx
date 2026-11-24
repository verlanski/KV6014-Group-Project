import { useState } from "react";

export default function AdminManagePTPage() {
  //Use State is just for memory, if something changes in these fields itll redraw the page, yay!
  //Uses a dictionary to store key value pairs.
  const [formData, setFormData] = useState({   
    campaignName: "",
    location: "",
    startDate: "",
    email: "",
    phone: "",
  });


  const [errors, setErrors] = useState({});                           //Error messages for each field. 
  const [touched, setTouched] = useState({});                         //Which fields have been touched by the user. Used to determine when to show error messages.
  const [isSubmitting, setIsSubmitting] = useState(false);            //Is the form currently being submitted
  const [isSuccess, setIsSuccess] = useState(false);                  //Show success screen / message
  const [serverError, setServerError] = useState("");                 //Server error message
  const [successMessage, setSuccessMessage] = useState("");           //Green "sent off" message

  const validateField = (name, value) => {
    switch (name) {
      case "campaignName":
        if (!value.trim()) return "Campaign name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";

      case "location":
        if (!value.trim()) return "Location is required";
        return "";

      case "startDate":
        if (!value) return "Start date is required";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value.trim())) return "Email is invalid";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (value.trim().length < 10) return "Phone number must be at least 10 characters";
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
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If already touched, re-validate on change
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleReset = () => {
    setFormData({ campaignName: "", location: "", startDate: "", email: "", phone: "" });
    setErrors({});
    setTouched({});
    setServerError("");
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

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
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      //Placeholder route
      const response = await fetch(`${apiUrl}/api/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignName: formData.campaignName.trim(),
          location: formData.location.trim(),
          startDate: formData.startDate,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please check your details and try again.");
      }

      setSuccessMessage("Campaign has been sent off successfully!");
      setFormData({ campaignName: "", location: "", startDate: "", email: "", phone: "" });
      setErrors({});
      setTouched({});

    } catch (err) {
      setServerError(err.message || "Failed to submit. Please check your network connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-start sm:items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden my-4 sm:my-8">
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
              Campaign Successfully Created!
            </h2>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-block px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer"
              >
                Create another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-6">
            {successMessage && (
              <div
                role="status"
                className="p-3.5 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700 font-medium"
              >
                {successMessage}
              </div>
            )}

            {serverError && (
              <div
                role="alert"
                className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 font-medium"
              >
                {serverError}
              </div>
            )}

            {/* Campaign Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="campaignName"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Campaign Name
              </label>
              <div className="flex-1">
                <input
                  id="campaignName"
                  name="campaignName"
                  type="text"
                  placeholder="e.g. Autumn Screening Sale"
                  value={formData.campaignName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.campaignName && errors.campaignName)}
                  aria-describedby={touched.campaignName && errors.campaignName ? "campaignName-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.campaignName && errors.campaignName
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.campaignName && errors.campaignName && (
                  <p id="campaignName-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.campaignName}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="location"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Location
              </label>
              <div className="flex-1">
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Newcastle City Centre"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.location && errors.location)}
                  aria-describedby={touched.location && errors.location ? "location-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.location && errors.location
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.location && errors.location && (
                  <p id="location-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <label
                htmlFor="startDate"
                className="text-base sm:text-lg font-medium text-slate-900 sm:w-1/3 shrink-0"
              >
                Start Date
              </label>
              <div className="flex-1">
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.startDate && errors.startDate)}
                  aria-describedby={touched.startDate && errors.startDate ? "startDate-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-1.5 px-1 text-slate-900 focus:outline-none transition-colors ${
                    touched.startDate && errors.startDate
                      ? "border-red-500 focus:border-red-600"
                      : "border-slate-800 focus:border-primary"
                  }`}
                />
                {touched.startDate && errors.startDate && (
                  <p id="startDate-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.startDate}
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
                  placeholder="e.g. example@example.com"
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
                  placeholder="e.g. (123) 456-7890"
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

            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center text-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 font-bold text-lg text-slate-900 hover:text-primary transition-colors py-2 px-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
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