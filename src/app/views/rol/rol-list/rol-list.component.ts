import { SidebarComponent } from './../../../components/sidebar/sidebar.component';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

export interface Rol {
  nombre: string;
  descripcion: string;
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
export class RolListComponent {
  roles: Rol[] = [
    { nombre: 'Administrador', descripcion: 'Tiene acceso a todas las funcionalidades del sistema.' },
    { nombre: 'Editor', descripcion: 'Puede crear y editar contenido.' },
    { nombre: 'Lector', descripcion: 'Sólo puede leer contenido.' },
    { nombre: 'Colaborador', descripcion: 'Puede contribuir con contenido.' }
  ];

  editarRol(rol: Rol) {
    console.log('Editar rol:', rol);
    // Implementar lógica de edición
  }

  eliminarRol(rol: Rol) {
    console.log('Eliminar rol:', rol);
    // Implementar lógica de eliminación
    this.roles = this.roles.filter(r => r !== rol);
  }
}
