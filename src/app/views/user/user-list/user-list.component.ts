import { Component, OnInit } from '@angular/core';
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
  idRol: number;
  estado: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [SidebarComponent,
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
      idRol: 1,
      estado: 'Activo'
    },
    {
      id: 2,
      nombres: 'María',
      apellidos: 'González',
      telefono: '987654321',
      email: 'maria.gonzalez@example.com',
      idRol: 2,
      estado: 'Activo'
    },
    {
      id: 3,
      nombres: 'Carlos',
      apellidos: 'Rodríguez',
      telefono: '456789123',
      email: 'carlos.rodriguez@example.com',
      idRol: 1,
      estado: 'Inactivo'
    },
    {
      id: 4,
      nombres: 'Ana',
      apellidos: 'Martínez',
      telefono: '789123456',
      email: 'ana.martinez@example.com',
      idRol: 3,
      estado: 'Activo'
    },
    {
      id: 5,
      nombres: 'Luis',
      apellidos: 'Sánchez',
      telefono: '321654987',
      email: 'luis.sanchez@example.com',
      idRol: 2,
      estado: 'Activo'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  editarUsuario(index: number): void {
    // Implementa la lógica para editar el usuario
    console.log('Editando usuario:', this.usuarios[index]);
  }

  eliminarUsuario(index: number): void {
    // Implementa la lógica para eliminar el usuario
    console.log('Eliminando usuario:', this.usuarios[index]);
    this.usuarios.splice(index, 1);
  }
}
