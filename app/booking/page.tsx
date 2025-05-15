"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function BookingForm() {
  const searchParams = useSearchParams();
  const dateFromParams = searchParams.get("date") || "";

  const [fromDate, setFromDate] = useState(dateFromParams);
  const [toDate, setToDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate all inputs
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fromDate) newErrors.fromDate = "Please select a starting date.";
    if (!toDate) newErrors.toDate = "Please select an ending date.";
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate))
      newErrors.toDate = "End date cannot be earlier than start date.";

    if (adults < 1) newErrors.adults = "At least one adult is required.";
    if (children < 0) newErrors.children = "Children count cannot be negative.";
    if (rooms < 1) newErrors.rooms = "At least one room is required.";

    if (!name.trim()) newErrors.name = "Please enter your full name.";

    if (!phone.trim())
      newErrors.phone = "Please enter a valid phone number.";
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(phone))
      newErrors.phone = "Phone number format is invalid.";

    if (!email.trim())
      newErrors.email = "Please enter your email address.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      newErrors.email = "Email format is invalid.";

    if (!amount.trim())
      newErrors.amount = "Please enter the payment amount.";
    else if (isNaN(Number(amount)) || Number(amount) < 0)
      newErrors.amount = "Amount must be a positive number.";

    if (file) {
      if (
        !(
          file.type === "application/pdf" ||
          file.type.startsWith("image/")
        )
      ) {
        newErrors.file = "Only PDF or image files are allowed.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.type.startsWith("image/")
    ) {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: "" }));
    } else {
      alert("Only PDF or image files are allowed!");
      e.target.value = "";
      setFile(null);
      setErrors((prev) => ({ ...prev, file: "Only PDF or image files are allowed." }));
    }
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    alert(`
Booking Details:
From: ${fromDate}
To: ${toDate}
Adults: ${adults}
Children: ${children}
Rooms: ${rooms}
Name: ${name}
Phone: ${phone}
Email: ${email}
Amount: ${amount}
Notes: ${notes}
Document/File: ${file ? file.name : "No file uploaded"}
    `);

    // You can reset the form here if you want:
    // setFromDate("");
    // setToDate("");
    // setAdults(1);
    // setChildren(0);
    // setRooms(1);
    // setName("");
    // setPhone("");
    // setEmail("");
    // setAmount("");
    // setNotes("");
    // setFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-700">
        Customer Booking Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fromDate" className="block mb-2 font-medium text-gray-700">
              From Date
            </label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
                errors.fromDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fromDate && <p className="text-red-500 mt-1 text-sm">{errors.fromDate}</p>}
          </div>

          <div>
            <label htmlFor="toDate" className="block mb-2 font-medium text-gray-700">
              To Date
            </label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate || new Date().toISOString().split("T")[0]}
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
                errors.toDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.toDate && <p className="text-red-500 mt-1 text-sm">{errors.toDate}</p>}
          </div>
        </div>

        {/* Guests and Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="adults" className="block mb-2 font-medium text-gray-700">
              Adults
            </label>
            <input
              id="adults"
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              placeholder="Number of adults"
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
                errors.adults ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.adults && <p className="text-red-500 mt-1 text-sm">{errors.adults}</p>}
          </div>

          <div>
            <label htmlFor="children" className="block mb-2 font-medium text-gray-700">
              Children
            </label>
            <input
              id="children"
              type="number"
              min={0}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              placeholder="Number of children"
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
                errors.children ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.children && <p className="text-red-500 mt-1 text-sm">{errors.children}</p>}
          </div>

          <div>
            <label htmlFor="rooms" className="block mb-2 font-medium text-gray-700">
              Rooms
            </label>
            <input
              id="rooms"
              type="number"
              min={1}
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              placeholder="Number of rooms"
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
                errors.rooms ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.rooms && <p className="text-red-500 mt-1 text-sm">{errors.rooms}</p>}
          </div>
        </div>

        {/* Personal Details */}
        <div>
          <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 234 567 890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
        </div>

        {/* Payment */}
        <div>
          <label htmlFor="amount" className="block mb-2 font-medium text-gray-700">
            Payment Amount ($)
          </label>
          <input
            id="amount"
            type="text"
            placeholder="Enter amount paid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.amount && <p className="text-red-500 mt-1 text-sm">{errors.amount}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block mb-2 font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="notes"
            placeholder="Any special requests or information"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black font-bold"
          />
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="file" className="block mb-2 font-medium text-gray-700">
            Upload Document (PDF/Image)
          </label>
          <input
            id="file"
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className={`w-full text-black ${
              errors.file ? "border-red-500" : ""
            }`}
          />
          {errors.file && <p className="text-red-500 mt-1 text-sm">{errors.file}</p>}
          {file && (
            <p className="mt-2 font-semibold text-black">
              Selected file: {file.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md transition"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}