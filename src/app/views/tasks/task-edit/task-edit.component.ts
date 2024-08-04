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

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.taskId = params['task'];
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      responsible: ['', Validators.required],
      projectId: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.getTaskValues(this.taskId);
    this.loadUsuarios();
    this.loadProjects();
  }

  loadUsuarios() {
    this.userService.listUsersCombo().then(users => this.usuarios = users);
  }

  loadProjects() {
    this.projectService.listProjects().then(projects => this.proyectos = projects);
  }

  async getTaskValues(id: string) {
    try {
      this.task = await this.taskService.findById(id);
      console.log('Datos de la tarea:', this.task);
      this.updateForm(this.task);
    } catch {
      console.error("Error al obtener tarea");
    }
  }


  updateForm(task: any) {
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      startDate: this.formatDate(task.startDate),
      endDate: this.formatDate(task.endDate),
      responsible: task.responsible,
      projectId: task.projectId,
      state: task.state
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  async update(id: string, task: any) {
    try {
      await this.taskService.updateById(id, task);
      this.showAlert('Éxito', 'Tarea editada exitosamente.', 'success');
    } catch {
      console.error("Error al guardar tarea");
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
