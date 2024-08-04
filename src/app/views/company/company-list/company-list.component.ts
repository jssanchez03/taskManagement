import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface Company {
  name: string;
  description: string;
}

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [ CommonModule,
    SidebarComponent,
    TableModule,
    FormsModule,
    ButtonModule,],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit {
  searchTerm: string = '';
  filteredCompanies: Company[] = [];
  companies: any;

  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getCompanies().subscribe(
      (companies: any) => {
        this.companies = companies;
        this.filteredCompanies = companies;
        console.log(this.companies);
      },
      error => {
        console.error('Error al obtener las compañías:', error);
      }
    );
  }

  editCompany(companyId: string) {
    this.router.navigate(['company-edit'], { queryParams: { company: companyId } });
  }

  deleteCompany(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteCompany(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado!',
              'La compañía ha sido eliminada.',
              'success'
            );
            this.getAllCompanies();
          },
          error => {
            console.error('Error al eliminar la compañía:', error);
            Swal.fire(
              'Error!',
              'No se pudo eliminar la compañía.',
              'error'
            );
          }
        );
      }
    });
  }

  viewCompany(id: string) {
    this.router.navigate(['/company-details'], { queryParams: { company: id } });
  }

  searchCompanies() {
    if (this.searchTerm) {
      this.filteredCompanies = this.companies.filter((company: { name: string; }) =>
        company.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCompanies = [...this.companies];
    }
  }
}
