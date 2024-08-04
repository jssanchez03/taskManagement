import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface ProjectWithLeader {
  project: any;
  userLeader: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = "http://localhost:8080/project/";

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

  listProjects(){
    return new Promise(resolve => {
      this.http.get(this.url + 'listProjects').subscribe({
        next:(data) =>{
          resolve(data);
        },
        error: (err)=>{
          console.log(err);
        }
      });
    })
  }

  // findById(id: string){
  //   return new Promise(resolve => {
  //     this.http.get(this.url + 'findById/' + id).subscribe({
  //       next:(data) =>{
  //         resolve(data);
  //       },
  //       error: (err)=>{
  //         console.log(err);
  //       }
  //     });
  //   })
  // }

  findById(id: string): Promise<ProjectWithLeader> {
    return firstValueFrom(this.http.get<ProjectWithLeader>(this.url + 'findById/' + id));
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
