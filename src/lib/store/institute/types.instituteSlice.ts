import { Status } from "../../types/types";

export interface IInstitute {
  instituteName: string;
  instituteAddress: string;
  institutePhoneNumber: string;
  instituteEmail: string;
}

export interface IInitialInstituteData {
  institute: IInstitute;
  status: Status;
}
