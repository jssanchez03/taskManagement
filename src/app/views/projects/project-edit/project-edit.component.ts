import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Leader {
  id: number;
  name: string;
}

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})

export class ProjectEditComponent implements OnInit {
  @Input() projectData: any;
  projectForm: FormGroup;
  leaders: Leader[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María González' },
    { id: 3, name: 'Carlos Rodríguez' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: [this.projectData?.name || '', Validators.required],
      description: [this.projectData?.description || ''],
      startDate: [this.projectData?.startDate || '', Validators.required],
      endDate: [this.projectData?.endDate || '', Validators.required],
      status: [this.projectData?.status || '', Validators.required],
      leaderId: [this.projectData?.leaderId || '', Validators.required]
    });
  }

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get startDate() {
    return this.projectForm.get('startDate');
  }

  get endDate() {
    return this.projectForm.get('endDate');
  }

  get status() {
    return this.projectForm.get('status');
  }

  get leaderId() {
    return this.projectForm.get('leaderId');
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Formulario enviado', this.projectForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
