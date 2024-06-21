import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { RolService } from '../../../services/rol/rol.service';

export interface Rol {
  id: string,
  name: string;
  description: string;
}

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  usuario: any;
  userId: string;
  roles: Rol[];
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    public rolService: RolService,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.userId = params['user'];
    });

    this.getUserValues(this.userId);
  }

  ngOnInit(): void {
    this.getAllRoles();

    this.userForm = this.formBuilder.group({
      name: [this.usuario?.user.name, [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      lastname: [this.usuario?.user.lastname, [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      phone: [this.usuario.user.phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: [this.usuario.user.email, [Validators.required, Validators.email]],
      idRol: [''],
      state: ['', Validators.required]
    });

    if (this.usuario) {
      this.userForm.patchValue(this.usuario);
    }
  }

  getAllRoles() {
    this.rolService.listRoles().then(roles => this.roles = roles as Rol[]);
  }

  async getUserValues(id: string){
    try{ 
      this.usuario = await this.userService.findById(id);
    }catch{
      console.error("Error al obtener rol");
    }
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

  async update(idUser: string, user: any){
    try{
      await this.userService.updateById(idUser, user);
    }catch{
      console.error("Error al guardar usuario");
    }
  }
}
