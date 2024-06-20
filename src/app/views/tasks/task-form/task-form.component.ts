import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

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
  proyectos = [];
  usuarios = [];

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      proyectoId: ['', Validators.required],
      responsables: [[], Validators.required]
    });

    this.loadProyectos();
    this.loadUsuarios();
  }

  loadProyectos() {
    // this.projectService.getProyectos().subscribe((data) => {
    //   this.proyectos = data;
    // });
  }

  loadUsuarios() {
    // this.userService.getUsuarios().subscribe((data) => {
    //   this.usuarios = data;
    // });
  }

  onSubmit() {
    // if (this.taskForm.valid) {
    //   this.taskService.createTarea(this.taskForm.value).subscribe((result) => {
    //     console.log('Tarea creada:', result);
    //   });
    // }
  }
}
