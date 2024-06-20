import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rol-form',
  standalone: true,
  imports: [SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './rol-form.component.html',
  styleUrl: './rol-form.component.css'
})
export class RolFormComponent implements OnInit {
  rolForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rolForm = this.formBuilder.group({
      rolId: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rolForm.valid) {
      // Lógica para guardar el rol
      console.log('Formulario de rol válido:', this.rolForm.value);
    } else {
      console.log('Formulario de rol inválido. Revise los campos.');
    }
  }
}
