import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';

type User = {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  idRol: string;
  state: string;
}

interface Usuario {
  user: User,
  rolName: string,
  numProjects: string,
  numTasks: string
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  usuarios: Usuario[];

  modalVisible = false;
  usuarioSeleccionado: Usuario | null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.listUsers().then(usuarios => this.usuarios = usuarios as Usuario[]);
  }

  async verDetalles(id: string) {
    try{
      this.usuarioSeleccionado = await this.userService.findById(id) as Usuario;
      this.modalVisible = true;
    }catch{
      console.error("Error al obtener usuario");
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.usuarioSeleccionado = null;
  }

  editarUsuario(usuario: Usuario): void {
    console.log('Editando usuario:', usuario);
  }

  async eliminarUsuario(id: string) {
    try{
      await this.userService.deleteById(id);
      console.log("Registro eliminado");
        this.getAllUsers();
    }catch{
      console.error("Error el eliminar");
    }
  }
}
