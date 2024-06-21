import { SidebarComponent } from './../../../components/sidebar/sidebar.component';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services/rol/rol.service';

export interface Rol {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-rol-list',
  standalone: true,
  imports: [SidebarComponent,
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './rol-list.component.html',
  styleUrl: './rol-list.component.css'
})
export class RolListComponent implements OnInit{

  roles: Rol[];
  
  constructor(public rolService: RolService){}

  ngOnInit(): void {
    this.getAllRoles();
  }
  
  getAllRoles() {
    this.rolService.listRoles().then(roles => this.roles = roles as Rol[]);
  }
  
  editarRol(rol: Rol) {
    console.log('Editar rol:', rol);
    // Implementar lógica de edición
  }

  async eliminarRol(idRol: string) {
    try{
      await this.rolService.deleteById(idRol);
      console.log("Registro eliminado");
        this.getAllRoles();
    }catch{
      console.error("Error el eliminar");
    }
    
  }
}
