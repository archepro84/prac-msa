/* eslint-disable */
import { Observable } from "rxjs";

export const protobufPackage = "company";

export interface Company {
  id: number;
  name: string;
}

export interface CompanyById {
  id: number;
}

export interface CreateCompany {
  name: string;
}

export interface Empty {
}

export interface CompanyService {
  Create(request: CreateCompany): Promise<Company>;
  FindOne(request: CompanyById): Promise<Company>;
  FindAll(request: Empty): Observable<Company>;
}
