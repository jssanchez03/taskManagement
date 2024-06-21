import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ProjectService } from '../../../services/project/project.service';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  users: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      idLeader: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.saveProject(this.projectForm.value);
    } else {
      this.showAlert('Formulario inválido', 'Revise los campos del formulario.', 'error');
    }
  }

  getAllUsers() {
    this.userService.listUsersCombo().then(users => this.users = users);
  }

  async saveProject(project: any) {
    try {
      await this.projectService.save(project);
      this.showAlert('Éxito', 'Proyecto guardado exitosamente.', 'success');
    } catch (error) {
      console.error("Error al guardar proyecto", error);
      this.showAlert('Error', `Hubo un error al guardar el proyecto:`, 'error');
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
