"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/src/lib/coponents/auth/auth-guard";
import DashboardHeader from "@/src/lib/coponents/dashboard/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { createInstitute } from "@/src/lib/store/institute/instituteSlice";
import { IInstitute } from "@/src/lib/store/institute/types.instituteSlice";
import { Status } from "@/src/lib/types/types";

export default function CreateInstitutePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const instituteStatus = useAppSelector((state) => state.institute.status);
  const [institute, setInstitute] = useState<IInstitute>({
    instituteName: "",
    instituteAddress: "",
    institutePhoneNumber: "",
    instituteEmail: "",
    institutePanNumber: "",
    instituteVatNumber: "",
  });
  const [idType, setIdType] = useState<"select" | "pan" | "vat">("select");

  useEffect(() => {
    if (instituteStatus === Status.SUCCESS) {
      router.push("/institute/dashboard");
    }
  }, [instituteStatus, router]);

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
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <DashboardHeader showRegisterAsInstitute={false} />
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center">
              <h1 className="flex items-center justify-center text-2xl font-semibold text-green-600">
                <span className="mr-1 text-3xl font-bold">Register</span>
                as Institute
              </h1>
              <p className="mt-1 text-sm text-green-500">
                Set up your institute after student registration
              </p>
            </div>

            <div className="relative my-6 border-t border-gray-300">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-3 text-gray-500">
                Institute Details
              </span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Institute Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="instituteName"
                value={institute.instituteName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="institutePhoneNumber"
                value={institute.institutePhoneNumber}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="instituteEmail"
                value={institute.instituteEmail}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
                name="instituteAddress"
                value={institute.instituteAddress}
                onChange={handleChange}
                required
              />

              <select
                value={idType}
                onChange={handleIdTypeChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
              >
                <option value="select">Select ID Type</option>
                <option value="pan">Pan Number</option>
                <option value="vat">Vat Number</option>
              </select>

              {idType !== "select" && (
                <input
                  type="text"
                  placeholder={idType === "pan" ? "Pan Number" : "Vat Number"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-100"
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
              )}

              {instituteStatus === Status.ERROR && (
                <p className="text-sm text-red-600">
                  Failed to create institute. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
              >
                Create Institute
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                href="/dashboard"
                className="text-sm text-green-500 hover:underline"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
