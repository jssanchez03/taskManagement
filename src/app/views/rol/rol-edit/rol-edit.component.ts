import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rol-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './rol-edit.component.html',
  styleUrl: './rol-edit.component.css'
})
export class RolEditComponent implements OnInit {
  @Input() rolData: any;
  rolForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rolForm = this.formBuilder.group({
      name: [this.rolData?.name || '', Validators.required],
      description: [this.rolData?.description || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rolForm.valid) {
      // Lógica para actualizar el rol
      console.log('Formulario de rol válido:', this.rolForm.value);
    } else {
      console.log('Formulario de rol inválido. Revise los campos.');
    }
  }
}
