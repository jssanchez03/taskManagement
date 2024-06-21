import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { RolService } from '../../../services/rol/rol.service';
import Swal from 'sweetalert2';

export interface Rol {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roles: Rol[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public rolService: RolService
  ) { }

  ngOnInit(): void {
    this.getAllRoles();

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      idRol: [''],
      state: ['', Validators.required]
    });
  }

  getAllRoles() {
    this.rolService.listRoles().then(roles => this.roles = roles as Rol[]);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario válido', this.userForm.value);
      this.save(this.userForm.value);
    } else {
      console.log('Formulario inválido. Revise los campos.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido. Revise los campos.'
      });
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  async save(user: any) {
    try {
      await this.userService.save(user);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El usuario ha sido guardado correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el usuario'
      });
    }
  }
}
