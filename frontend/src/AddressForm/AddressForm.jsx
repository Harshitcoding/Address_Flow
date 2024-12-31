import React, { useState, useEffect } from "react";
import BackendUrl from "../config";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    houseNumber: "",
    apartment: "",
    label: "HOME",
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendUrl}/addresses`);
      if (!response.ok) throw new Error("Failed to fetch addresses");
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (e) => {
    e.preventDefault();

    if (!formData.houseNumber) {
      alert("Required field missing: houseNumber is mandatory");
      return;
    }

    try {
      const response = await fetch(`${BackendUrl}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Address added successfully!");
        setFormData({
          houseNumber: "",
          apartment: "",
          label: "HOME",
        });
        fetchAddresses();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Error adding address.");
      }
    } catch (error) {
      alert("Failed to add address. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Address Management</h1>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={addAddress}
      >
        <div className="mb-4">
          <label
            htmlFor="houseNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            House / Flat / Block No.*:
          </label>
          <input
            type="text"
            id="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="apartment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Apartment:
          </label>
          <input
            type="text"
            id="apartment"
            value={formData.apartment}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="label"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Save as:
          </label>
          <select
            id="label"
            value={formData.label}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="HOME">Home</option>
            <option value="OFFICE">Office</option>
            <option value="FRIENDS">Friends</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Address
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Addresses</h2>
      {loading ? (
        <p className="text-gray-600">Loading addresses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="w-full max-w-md bg-white shadow-md rounded p-4">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="border-b last:border-none py-2 text-gray-700"
            >
              <div>
                <strong>{address.label}</strong>
              </div>
              <div>{address.houseNumber}</div>
              {address.apartment && <div>{address.apartment}</div>}
              <div>
                Added on: {new Date(address.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressForm;
