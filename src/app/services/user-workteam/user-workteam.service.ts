import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserWorkteamService {

  private url = 'http://localhost:8083/m1/userworkteams/';

  constructor(private http: HttpClient) { }

  // Guardar la asignación de usuario a un equipo de trabajo
  save(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}save`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al guardar UserWorkTeam:', error);
          reject(error);
        }
      });
    });
  }

  // Obtener todas las asignaciones de usuario a equipos de trabajo
  list() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}list`).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al listar UserWorkTeams:', error);
          reject(error);
        }
      });
    });
  }

  // Obtener asignación de usuario por ID
  findById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}findById/${id}`).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al encontrar UserWorkTeam por ID:', error);
          reject(error);
        }
      });
    });
  }

  // Actualizar asignación de usuario por ID
  updateById(id: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}updateById/${id}`, data).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al actualizar UserWorkTeam:', error);
          reject(error);
        }
      });
    });
  }

  // Eliminar asignación de usuario por ID
  deleteById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}deleteById/${id}`).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error('Error al eliminar UserWorkTeam:', error);
          reject(error);
        }
      });
    });
  }
}
