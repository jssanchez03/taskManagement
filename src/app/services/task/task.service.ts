import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = "http://localhost:8083/m2/task/";

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

  listTasksByProject(id: string){
    return new Promise(resolve => {
      this.http.get(this.url + 'listTasksByProject/' + id).subscribe({
        next:(data) =>{
          resolve(data);
        },
        error: (err)=>{
          console.log(err);
        }
      });
    })
  }

  findById(id: string){
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

  deleteById(id: string){
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

  updateById(id: string, data: any){
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
