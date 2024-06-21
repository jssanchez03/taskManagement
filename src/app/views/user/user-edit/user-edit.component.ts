import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { RolService } from '../../../services/rol/rol.service';

export interface Rol {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  usuario: any;
  userId: string;
  roles: Rol[];
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public rolService: RolService,
              private activatedRoute: ActivatedRoute) {

    this.userForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      idRol: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['user'];
      this.loadUser();
    });

    this.getAllRoles();
  }

  async loadUser() {
    if (this.userId) {
      try {
        this.usuario = await this.userService.findById(this.userId);
        this.populateForm();
      } catch {
        console.error("Error al obtener usuario");
      }
    }
  }

  populateForm() {
    if (this.usuario) {
      this.userForm.patchValue({
        cedula: this.usuario.user.cedula,
        name: this.usuario.user.name,
        lastname: this.usuario.user.lastname,
        phone: this.usuario.user.phone,
        email: this.usuario.user.email,
        idRol: this.usuario.user.idRol,
        state: this.usuario.user.state
      });
    }
  }

  getAllRoles() {
    this.rolService.listRoles().then(roles => this.roles = roles as Rol[]);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario válido', this.userForm.value);
      this.update(this.userId, this.userForm.value);
    } else {
      console.log('Formulario inválido. Revise los campos.');
      console.log(this.findInvalidControls());
    }
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  async update(idUser: string, user: any) {
    try {
      await this.userService.updateById(idUser, user);
    } catch {
      console.error("Error al guardar usuario");
    }
  }
}
