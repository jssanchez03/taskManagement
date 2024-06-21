import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';


interface Usuario {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  rol: string;
  state: string;
}

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  @Input() usuario: Usuario | null = null;

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+((gmail\.com)|(espe\.edu\.ec))$/)]],
      rol: ['', Validators.required],
      state: ['', Validators.required]
    });

    if (this.usuario) {
      this.userForm.patchValue(this.usuario);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario válido', this.userForm.value);
    } else {
      console.log('Formulario inválido. Revise los campos.');
    }
  }
}
