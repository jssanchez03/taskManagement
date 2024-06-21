import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RolService } from '../../../services/rol/rol.service';

@Component({
  selector: 'app-rol-edit',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './rol-edit.component.html',
  styleUrl: './rol-edit.component.css'
})
export class RolEditComponent implements OnInit {
  rolForm: FormGroup;
  rolId: string;
  rol: any;

  constructor(private formBuilder: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private rolService: RolService
  ) {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.rolId = params['rol'];
    });

    this.getRolValues(this.rolId);
   }

  ngOnInit(): void {
    this.rolForm = this.formBuilder.group({
      name: [this.rol.name || '', Validators.required],
      description: [this.rol.description || '', Validators.required]
    });
  }

  async getRolValues(id: string){
    try{ 
      this.rol = await this.rolService.findById(id);
      console.log(this.rol);
    }catch{
      console.error("Error al obtener rol");
    }
  }

  onSubmit(): void {
    if (this.rolForm.valid) {
      // Lógica para actualizar el rol
      console.log('Formulario de rol válido:', this.rolForm.value);
      this.update(this.rolId, this.rolForm.value);
    } else {
      console.log('Formulario de rol inválido. Revise los campos.');
    }
  }

  async update(idRol: string, rol: any){
    try{
      await this.rolService.updateById(idRol, rol);
    }catch{
      console.error("Error al guardar rol");
    }
  }
}
