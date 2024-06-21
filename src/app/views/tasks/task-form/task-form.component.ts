import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
import { ProjectService } from '../../../services/project/project.service';

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
  ) {
    this.getAllUsersCombo();
    this.getAllProjectsCombo();
  }

  ngOnInit(): void {
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
      console.log('Formulario enviado', this.taskForm.value);
      this.save(this.taskForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  getAllUsersCombo() {
    this.userService.listUsersCombo().then(users => this.users = users);
  }

  getAllProjectsCombo() {
    this.projectService.listProjects().then(projects => this.projects = projects);
  }

  async save(task: any){
    try{
      await this.taskService.save(task);
    }catch{
      console.error("Error al guardar tarea");
    }
  }
}
