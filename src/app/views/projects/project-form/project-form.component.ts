import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { ProjectService } from '../../../services/project/project.service';
import { UserService } from '../../../services/user/user.service';


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

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService
  ) {
    this.getAllUsersCombo();
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      idLeader: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Formulario enviado', this.projectForm.value);
      this.save(this.projectForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  getAllUsersCombo() {
    this.userService.listUsersCombo().then(users => this.users = users);
  }

  async save(project: any){
    try{
      await this.projectService.save(project);
    }catch{
      console.error("Error al guardar proyecto");
    }
  }
}
