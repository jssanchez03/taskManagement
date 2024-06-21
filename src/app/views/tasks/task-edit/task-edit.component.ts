import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
import { ProjectService } from '../../../services/project/project.service';
import Swal from 'sweetalert2';

interface Tarea {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  responsible: string;
  state: string;
}

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})

export class TaskEditComponent implements OnInit {
  @Input() tarea: Tarea | null = null;
  taskId: string;
  task: any;
  usuarios: any;
  proyectos: any;

  taskForm: FormGroup;

  constructor(private fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.taskId = params['task'];
    });

    this.getTaskValues(this.taskId);
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: [this.task?.task.name, Validators.required],
      description: [this.task?.task.description],
      startDate: [this.formatDate(this.task?.task.startDate), Validators.required],
      endDate: [this.formatDate(this.task?.task.endDate), Validators.required],
      responsible: ['', Validators.required],
      projectId: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.loadUsuarios();
    this.loadProjects();

    if (this.tarea) {
      this.taskForm.patchValue(this.tarea);
    }
  }

  loadUsuarios() {
    this.userService.listUsersCombo().then(users => this.usuarios = users);
  }
  loadProjects() {
    this.projectService.listProjects().then(p => this.proyectos = p);
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async getTaskValues(id: string){
    try{
      this.task = await this.taskService.findById(id);
    }catch{
      console.error("Error al obtener tarea");
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Formulario válido', this.taskForm.value);
      this.update(this.taskId, this.taskForm.value);
    } else {
      console.log('Formulario inválido. Revise los campos.');
      this.showAlert('Formulario inválido', 'Revise los campos del formulario.', 'error');
    }
  }

  async update(id: string, task: any){
    try{
      await this.taskService.updateById(id, task);
      this.showAlert('Éxito', 'Tarea editada exitosamente.', 'success');
    }catch{
      console.error("Error al guardar usuario");
      this.showAlert('Error', 'Hubo un error al editar la tarea.', 'error');
    }
  }

  showAlert(title: string, text: string, icon: any): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
