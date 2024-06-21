import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
import { ProjectService } from '../../../services/project/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    SidebarComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  users: any;
  projects: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getAllUsersCombo();
    this.getAllProjectsCombo();
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      responsible: ['', Validators.required],
      state: ['', Validators.required],
      projectId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.save(this.taskForm.value);
    } else {
      this.showAlert('Formulario inválido', 'Revise los campos del formulario.', 'error');
    }
  }

  getAllUsersCombo() {
    this.userService.listUsersCombo().then(users => this.users = users);
  }

  getAllProjectsCombo() {
    this.projectService.listProjects().then(projects => this.projects = projects);
  }

  async save(task: any) {
    try {
      await this.taskService.save(task);
      this.showAlert('Éxito', 'Tarea guardada exitosamente.', 'success');
    } catch (error) {
      console.error("Error al guardar tarea", error);
      this.showAlert('Error', 'Hubo un error al guardar la tarea.', 'error');
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
