import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

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

  taskForm: FormGroup;
  usuarios = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      responsible: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.loadUsuarios();

    if (this.tarea) {
      this.taskForm.patchValue(this.tarea);
    }
  }

  loadUsuarios() {

  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Formulario válido', this.taskForm.value);

    } else {
      console.log('Formulario inválido. Revise los campos.');
    }
  }
}
