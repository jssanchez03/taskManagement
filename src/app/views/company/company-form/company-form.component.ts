import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      console.log('Formulario válido', this.companyForm.value);
      this.save(this.companyForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  save(companyData: any) {
    this.companyService.saveCompany(companyData).subscribe(
      response => {
        Swal.fire('Éxito', 'Compañía guardada correctamente', 'success');
        this.companyForm.reset();
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al guardar la compañía', 'error');
      }
    );
  }
}
