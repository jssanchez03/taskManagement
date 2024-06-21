import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  rol: string;
  estado: string;
  numProyectos?: number;
  numTareas?: number;
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
  usuarios: Usuario[] = [
    {
      id: 1,
      nombres: 'Juan',
      apellidos: 'Pérez',
      telefono: '123456789',
      email: 'juan.perez@example.com',
      rol: 'Administrador',
      estado: 'Activo',
      numProyectos: 5,
      numTareas: 10
    },
    {
      id: 2,
      nombres: 'María',
      apellidos: 'González',
      telefono: '987654321',
      email: 'maria.gonzalez@example.com',
      rol: 'Usuario',
      estado: 'Activo',
      numProyectos: 3,
      numTareas: 7
    },
    {
      id: 3,
      nombres: 'Carlos',
      apellidos: 'Rodríguez',
      telefono: '456789123',
      email: 'carlos.rodriguez@example.com',
      rol: 'Administrador',
      estado: 'Inactivo',
      numProyectos: 2,
      numTareas: 4
    },
    {
      id: 4,
      nombres: 'Ana',
      apellidos: 'Martínez',
      telefono: '789123456',
      email: 'ana.martinez@example.com',
      rol: 'Invitado',
      estado: 'Activo',
      numProyectos: 1,
      numTareas: 2
    },
    {
      id: 5,
      nombres: 'Luis',
      apellidos: 'Sánchez',
      telefono: '321654987',
      email: 'luis.sanchez@example.com',
      rol: 'Usuario',
      estado: 'Activo',
      numProyectos: 4,
      numTareas: 8
    }
  ];

  modalVisible = false;
  usuarioSeleccionado: Usuario | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  verDetalles(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.usuarioSeleccionado = null;
  }

  editarUsuario(usuario: Usuario): void {
    console.log('Editando usuario:', usuario);
  }

  eliminarUsuario(usuario: Usuario): void {
    console.log('Eliminando usuario:', usuario);
    this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
  }
}
