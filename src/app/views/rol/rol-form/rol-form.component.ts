import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services/rol/rol.service';
import Swal from 'sweetalert2';

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

  constructor(
    private formBuilder: FormBuilder,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.rolForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rolForm.valid) {
      console.log('Formulario de rol válido:', this.rolForm.value);
      this.save(this.rolForm.value);
    } else {
      console.log('Formulario de rol inválido. Revise los campos.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario de rol inválido. Revise los campos.'
      });
    }
  }

  async save(rol: any) {
    try {
      await this.rolService.save(rol);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El rol ha sido guardado correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el rol'
      });
    }
  }
}
