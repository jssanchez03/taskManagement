import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:8080/companies';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getCompanyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/findById/${id}`);
  }

  saveCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, companyData);
  }

  updateCompany(id: string, companyData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateById/${id}`, companyData);
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }

}
