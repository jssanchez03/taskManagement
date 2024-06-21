import { Component, Input, OnInit, } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectService } from '../../../services/project/project.service';
import { TaskService } from '../../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';

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
  proyectoInfo: any;
  projectId: string;

  modalVisible = false;
  tareaSeleccionada: any = null;

  constructor(private projectService: ProjectService,
    private taskService: TaskService,
    public ActivatedRoute: ActivatedRoute,
  ) {
   }

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.projectId = params['project'];
    });
    this.loadInfoProject(this.projectId);
    this.loadTareas();
  }

  loadTareas() {
    this.taskService.listTasksByProject(this.projectId).then((tasks: any) => {
      this.tareas = tasks;
    }).catch(error => {
      console.error('Error al obtener los tareas:', error);
    });
  }

  loadInfoProject(id: string){
    try{
      this.projectService.findById(id).then(data => this.proyectoInfo = data);

    } catch {
      console.log('Error al cargar proyecto');
    }
  }

  async verDetalles(id: string) {
    try{
      this.tareaSeleccionada = await this.taskService.findById(id);
      this.modalVisible = true;
    }catch{
      console.error("Error al obtener tarea");
    }
  }

  cerrarModal() {
    this.modalVisible = false;
    this.tareaSeleccionada = null;
  }

  editarTarea(index: number) {
    console.log('Editando tarea:', this.tareas[index]);
  }

  async eliminarTarea(id: string) {
    try{
      await this.taskService.deleteById(id);
      console.log("Registro eliminado");
        this.loadTareas();
    }catch{
      console.error("Error el eliminar");
    }
  }
}
