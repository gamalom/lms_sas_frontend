"use client";
import { useAppDispatch } from "@/src/lib/store/hooks";
import { createInstitute } from "@/src/lib/store/institute/instituteSlice";
import { IInstitute } from "@/src/lib/store/institute/types.instituteSlice";
import { useState } from "react";

export default function CreateInstitutePage() {
  const dispatch = useAppDispatch();
  const [institute, setInstitute] = useState<IInstitute>({
    instituteName: "",
    instituteAddress: "",
    institutePhoneNumber: "",
    instituteEmail: "",
    institutePanNumber: "",
    instituteVatNumber: "",
  });
  const [idType, setIdType] = useState<"select" | "pan" | "vat">("select");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstitute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "select" | "pan" | "vat";
    setIdType(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createInstitute(institute));
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {/* Logo and Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-600 flex items-center justify-center">
              <span className="mr-1 text-3xl font-bold">Create</span>
              Institute
            </h1>
            <p className="text-green-500 text-sm mt-1">
              Create your institute account
            </p>
          </div>
          {/* Divider */}
          <div className="my-6 border-t border-gray-300 relative">
            <span className="absolute -top-2.5 bg-white left-1/2 transform -translate-x-1/2 px-3 text-gray-500">
              Create
            </span>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Institute Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="instituteName"
                value={institute.instituteName}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="institutePhoneNumber"
                value={institute.institutePhoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="instituteEmail"
                value={institute.instituteEmail}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="instituteAddress"
                value={institute.instituteAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <select
                value={idType}
                onChange={handleIdTypeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100 bg-white"
              >
                <option value="select">Select</option>
                <option value="pan">Pan Number</option>
                <option value="vat">Vat Number</option>
              </select>
            </div>

            {idType !== "select" && (
              <div>
                <input
                  type="text"
                  placeholder={idType}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                  name={
                    idType === "pan"
                      ? "institutePanNumber"
                      : "instituteVatNumber"
                  }
                  value={
                    idType === "pan"
                      ? institute.institutePanNumber || ""
                      : institute.instituteVatNumber || ""
                  }
                  onChange={handleChange}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md  bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
            >
              Create
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">
              Have your account?
              <a
                href="#"
                className="text-green-500 font-medium hover:underline"
              >
                Login Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
