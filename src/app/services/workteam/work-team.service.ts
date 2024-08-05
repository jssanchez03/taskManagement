import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkTeamService {

  private url = 'http://localhost:8083/m1/workteams/';

  constructor(private http: HttpClient) { }

  save(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}save`, data).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al guardar WorkTeam:', error);
          reject(error);
        }
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}list`).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al listar WorkTeams:', error);
          reject(error);
        }
      });
    });
  }

  findById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}findById/${id}`).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al encontrar WorkTeam por ID:', error);
          reject(error);
        }
      });
    });
  }

  updateById(id: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}updateById/${id}`, data).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al actualizar WorkTeam:', error);
          reject(error);
        }
      });
    });
  }

  deleteById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}deleteById/${id}`).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al eliminar WorkTeam:', error);
          reject(error);
        }
      });
    });
  }
}
