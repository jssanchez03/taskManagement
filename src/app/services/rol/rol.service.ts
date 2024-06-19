import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = "http://localhost:8080/rol/";

  constructor(public http: HttpClient) { }

  save(data: any) {
    return new Promise(resolve => {
      this.http.post(this.url + 'save', data).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
    })
  }

  listRoles(){
    return new Promise(resolve => {
      this.http.get(this.url + 'listRoles').subscribe({
        next:(data) =>{
          resolve(data);
        },
        error: (err)=>{
          console.log(err);
        }
      });
    })
  }

  findById(id: number){
    return new Promise(resolve => {
      this.http.get(this.url + 'findById/' + id).subscribe({
        next:(data) =>{
          resolve(data);
        },
        error: (err)=>{
          console.log(err);
        }
      });
    })
  }

  deleteById(id: number){
    return new Promise(resolve => {
      this.http.delete(this.url + 'deleteById/' + id).subscribe({
        next:(data) =>{
          resolve(data);
        },
        error: (err)=>{
          console.log(err);
        }
      });
    })
  }

  updateById(id: number, data: any){
    return new Promise(resolve => {
      this.http.put(this.url + 'updateById/' + id, data).subscribe({
        next:(data) =>{
          resolve(data);
        },
        error: (err)=>{
          console.log(err);
        }
      });
    })
  }
}
