import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ProjectService } from '../../../services/project/project.service';
import { UserService } from '../../../services/user/user.service';
import { CompanyService } from '../../../services/company/company.service';
import Swal from 'sweetalert2';

interface Project {
  id: string; // We'll treat UUID as string in frontend
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  state: string;
  idLeader: string;
  companyId: string; // We'll treat UUID as string in frontend
}

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string;
  users: any;
  companies: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private companyService: CompanyService
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      idLeader: ['', Validators.required],
      companyId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['project'];
      if (this.projectId) {
        this.getProjectValues(this.projectId);
      }
    });
    this.getAllUsers();
    this.getAllCompanies();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  async getProjectValues(id: string) {
    try {
      const response = await this.projectService.findById(id);
      console.log('Datos del proyecto recibidos:', response);
      if (response && response.project) {
        const project = response.project;
        this.projectForm.patchValue({
          name: project.name,
          description: project.description,
          startDate: this.formatDate(project.startDate),
          endDate: this.formatDate(project.endDate),
          state: project.state,
          idLeader: project.idLeader,
          companyId: project.companyId
        });

        if (!response.userLeader) {
          console.warn('No se pudo obtener la información del líder del proyecto');
          // Puedes mostrar una alerta o manejar este caso como prefieras
        }
      } else {
        throw new Error('Proyecto no encontrado');
      }
    } catch (error) {
      console.error("Error al obtener proyecto", error);
      this.showAlert('Error', 'No se pudo cargar la información del proyecto.', 'error');
    }
  }

  getAllUsers() {
    this.userService.listUsersCombo().then(users => this.users = users);
  }

  getAllCompanies() {
    this.companyService.getCompanies().subscribe(
      companies => this.companies = companies,
      error => console.error('Error al obtener empresas:', error)
    );
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.updateProject(this.projectId, this.projectForm.value);
    } else {
      this.showAlert('Formulario inválido', 'Por favor, revise los campos del formulario.', 'error');
    }
  }

  async updateProject(id: string, project: any) {
    try {
      await this.projectService.updateById(id, project);
      this.showAlert('Éxito', 'Proyecto actualizado exitosamente.', 'success');
    } catch (error) {
      console.error("Error al actualizar proyecto", error);
      this.showAlert('Error', 'Hubo un error al actualizar el proyecto.', 'error');
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
