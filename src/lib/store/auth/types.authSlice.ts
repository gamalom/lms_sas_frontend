import { Status } from "../../types/types";

export interface IUserData {
  username: string;
  token: string;
  role?: string;
  instituteId?: string | number | null;
}

export interface IInitialData {
  user: IUserData;
  status: Status;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export function isInstituteUser(user: IUserData) {
  return user.role === "institute" && user.instituteId != null && user.instituteId !== "";
}

export function isStudentUser(user: IUserData) {
  return user.role === "student";
}

export function canManageInstituteResources(user: IUserData) {
  return (
    isInstituteUser(user) ||
    user.role === "super-admin"
  );
}

export function persistAuthUser(user: IUserData) {
  localStorage.setItem("token", user.token);
  localStorage.setItem("username", user.username ?? "");
  localStorage.setItem("role", user.role ?? "");
  localStorage.setItem(
    "instituteId",
    user.instituteId != null ? String(user.instituteId) : "",
  );
}

export function clearAuthStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("instituteId");
}

export function readAuthFromStorage(): IUserData | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const instituteId = localStorage.getItem("instituteId");

  return {
    token,
    username: localStorage.getItem("username") ?? "",
    role: localStorage.getItem("role") ?? undefined,
    instituteId: instituteId || null,
  };
}
