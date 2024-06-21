import { Component, Input, OnInit, } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SidebarComponent,
    DatePipe,
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
  proyectoInfo = {
    nombreProyecto: 'Proyecto XYZ',
    liderNombre: 'Juan',
    liderApellido: 'Pérez',
    fechaInicial: '2023-06-01',
    fechaFinal: '2023-12-31',
    email: 'juan.perez@ejemplo.com'
  };

  modalVisible = false;
  tareaSeleccionada: any = null;

  constructor() { }

  ngOnInit(): void {
    this.loadTareas();
  }

  loadTareas() {
    this.tareas = [
      {
        nombre: 'Tarea 1',
        descripcion: 'Descripción de la tarea 1',
        fechaInicio: '2023-06-01',
        fechaFin: '2023-06-15',
        estado: 'En progreso',
        responsable: 'María García',
        email: 'maria.garcia@ejemplo.com',
        rol: 'Desarrollador'
      },
      { nombre: 'Tarea 2', descripcion: 'Descripción de la tarea 2', fechaInicio: '2023-06-02', fechaFin: '2023-06-16', estado: 'Pendiente' },
      { nombre: 'Tarea 3', descripcion: 'Descripción de la tarea 3', fechaInicio: '2023-06-03', fechaFin: '2023-06-17', estado: 'Completada' },
      { nombre: 'Tarea 4', descripcion: 'Descripción de la tarea 4', fechaInicio: '2023-06-04', fechaFin: '2023-06-18', estado: 'En progreso' },
      { nombre: 'Tarea 5', descripcion: 'Descripción de la tarea 5', fechaInicio: '2023-06-05', fechaFin: '2023-06-19', estado: 'Pendiente' },
      { nombre: 'Tarea 6', descripcion: 'Descripción de la tarea 6', fechaInicio: '2023-06-06', fechaFin: '2023-06-20', estado: 'Completada' },
      { nombre: 'Tarea 7', descripcion: 'Descripción de la tarea 7', fechaInicio: '2023-06-07', fechaFin: '2023-06-21', estado: 'En progreso' },
      { nombre: 'Tarea 8', descripcion: 'Descripción de la tarea 8', fechaInicio: '2023-06-08', fechaFin: '2023-06-22', estado: 'Pendiente' },
      { nombre: 'Tarea 9', descripcion: 'Descripción de la tarea 9', fechaInicio: '2023-06-09', fechaFin: '2023-06-23', estado: 'Completada' },
      { nombre: 'Tarea 10', descripcion: 'Descripción de la tarea 10', fechaInicio: '2023-06-10', fechaFin: '2023-06-24', estado: 'En progreso' },
      { nombre: 'Tarea 11', descripcion: 'Descripción de la tarea 11', fechaInicio: '2023-06-11', fechaFin: '2023-06-25', estado: 'Pendiente' },
      { nombre: 'Tarea 12', descripcion: 'Descripción de la tarea 12', fechaInicio: '2023-06-12', fechaFin: '2023-06-26', estado: 'Completada' },
      { nombre: 'Tarea 13', descripcion: 'Descripción de la tarea 13', fechaInicio: '2023-06-13', fechaFin: '2023-06-27', estado: 'En progreso' },
      { nombre: 'Tarea 14', descripcion: 'Descripción de la tarea 14', fechaInicio: '2023-06-14', fechaFin: '2023-06-28', estado: 'Pendiente' },
      { nombre: 'Tarea 15', descripcion: 'Descripción de la tarea 15', fechaInicio: '2023-06-15', fechaFin: '2023-06-29', estado: 'Completada' },
      { nombre: 'Tarea 16', descripcion: 'Descripción de la tarea 16', fechaInicio: '2023-06-16', fechaFin: '2023-06-30', estado: 'En progreso' },
    ];
  }

  verDetalles(index: number) {
    this.tareaSeleccionada = this.tareas[index];
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.tareaSeleccionada = null;
  }

  editarTarea(index: number) {
    console.log('Editando tarea:', this.tareas[index]);
  }

  eliminarTarea(index: number) {
    console.log('Eliminando tarea:', this.tareas[index]);
    this.tareas.splice(index, 1);
  }
}
