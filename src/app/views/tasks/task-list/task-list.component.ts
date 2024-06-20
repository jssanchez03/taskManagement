import { Component, Input, OnInit, } from '@angular/core';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SidebarComponent,
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tareas: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadTareas();
  }

  loadTareas() {
    this.tareas = [
      { id: 1, nombre: 'Tarea 1', descripcion: 'Descripción de la tarea 1', fechaInicio: '2023-06-01', fechaFin: '2023-06-15', proyectoId: 1, responsables: [{ nombre: 'Responsable 1' }] },
      { id: 2, nombre: 'Tarea 2', descripcion: 'Descripción de la tarea 2', fechaInicio: '2023-06-02', fechaFin: '2023-06-16', proyectoId: 1, responsables: [{ nombre: 'Responsable 2' }] },
      { id: 3, nombre: 'Tarea 3', descripcion: 'Descripción de la tarea 3', fechaInicio: '2023-06-03', fechaFin: '2023-06-17', proyectoId: 1, responsables: [{ nombre: 'Responsable 3' }] },
      { id: 4, nombre: 'Tarea 4', descripcion: 'Descripción de la tarea 4', fechaInicio: '2023-06-04', fechaFin: '2023-06-18', proyectoId: 1, responsables: [{ nombre: 'Responsable 4' }] },
      { id: 5, nombre: 'Tarea 5', descripcion: 'Descripción de la tarea 5', fechaInicio: '2023-06-05', fechaFin: '2023-06-19', proyectoId: 1, responsables: [{ nombre: 'Responsable 5' }] },
      { id: 6, nombre: 'Tarea 6', descripcion: 'Descripción de la tarea 6', fechaInicio: '2023-06-06', fechaFin: '2023-06-20', proyectoId: 1, responsables: [{ nombre: 'Responsable 6' }] },
      { id: 7, nombre: 'Tarea 7', descripcion: 'Descripción de la tarea 7', fechaInicio: '2023-06-07', fechaFin: '2023-06-21', proyectoId: 1, responsables: [{ nombre: 'Responsable 7' }] },
      { id: 8, nombre: 'Tarea 8', descripcion: 'Descripción de la tarea 8', fechaInicio: '2023-06-08', fechaFin: '2023-06-22', proyectoId: 1, responsables: [{ nombre: 'Responsable 8' }] },
      { id: 9, nombre: 'Tarea 9', descripcion: 'Descripción de la tarea 9', fechaInicio: '2023-06-09', fechaFin: '2023-06-23', proyectoId: 1, responsables: [{ nombre: 'Responsable 9' }] },
      { id: 10, nombre: 'Tarea 10', descripcion: 'Descripción de la tarea 10', fechaInicio: '2023-06-10', fechaFin: '2023-06-24', proyectoId: 1, responsables: [{ nombre: 'Responsable 10' }] },
      { id: 11, nombre: 'Tarea 11', descripcion: 'Descripción de la tarea 11', fechaInicio: '2023-06-11', fechaFin: '2023-06-25', proyectoId: 1, responsables: [{ nombre: 'Responsable 11' }] },
      { id: 12, nombre: 'Tarea 12', descripcion: 'Descripción de la tarea 12', fechaInicio: '2023-06-12', fechaFin: '2023-06-26', proyectoId: 1, responsables: [{ nombre: 'Responsable 12' }] },
      { id: 13, nombre: 'Tarea 13', descripcion: 'Descripción de la tarea 13', fechaInicio: '2023-06-13', fechaFin: '2023-06-27', proyectoId: 1, responsables: [{ nombre: 'Responsable 13' }] },
      { id: 14, nombre: 'Tarea 14', descripcion: 'Descripción de la tarea 14', fechaInicio: '2023-06-14', fechaFin: '2023-06-28', proyectoId: 1, responsables: [{ nombre: 'Responsable 14' }] },
      { id: 15, nombre: 'Tarea 15', descripcion: 'Descripción de la tarea 15', fechaInicio: '2023-06-15', fechaFin: '2023-06-29', proyectoId: 1, responsables: [{ nombre: 'Responsable 15' }] },
      { id: 16, nombre: 'Tarea 16', descripcion: 'Descripción de la tarea 16', fechaInicio: '2023-06-16', fechaFin: '2023-06-30', proyectoId: 1, responsables: [{ nombre: 'Responsable 16' }] },
    ];
  }

  getResponsablesNames(responsables: any[]): string {
    return responsables.map(responsable => responsable.nombre).join(', ');
  }

  aceptarTarea(index: number) {
    // Implementa la lógica para aceptar una tarea
  }

  denegarTarea(index: number) {
    // Implementa la lógica para denegar una tarea
  }
}
