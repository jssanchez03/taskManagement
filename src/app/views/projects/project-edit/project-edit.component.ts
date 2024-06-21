import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project/project.service';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})

export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  project: any;
  projectId: string;
  users: any;

  constructor(private fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService
  ) {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.projectId = params['project'];
    });
    this.getProjectValues(this.projectId);
    this.projectForm = this.fb.group({
      name: [this.project?.project?.name, Validators.required],
      description: [this.project?.project?.description],
      startDate: [this.formatDate(this.project?.project?.startDate), Validators.required],
      endDate: [this.formatDate(this.project?.project?.endDate), Validators.required],
      state: [this.project?.project?.state, Validators.required],
      idLeader: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllUsersCombo();
    this.getProjectValues(this.projectId);

  }

  // Método para convertir la fecha al formato yyyy-MM-dd
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async getProjectValues(id: string){
    try{
      this.project = await this.projectService.findById(id);
      console.log(this.project);
    }catch{
      console.error("Error al obtener proyecto");
    }
  }

  getAllUsersCombo() {
    this.userService.listUsersCombo().then(users => this.users = users);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Formulario enviado', this.projectForm.value);
      this.update(this.projectId, this.projectForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  async update(id: string, project: any){
    try{
      await this.projectService.updateById(id, project);
    }catch{
      console.error("Error al guardar proyecto");
    }
  }
}
