import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

interface Project {
  name: string;
  status: string;
  progress: number;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TableModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  searchTerm: string = '';
  filteredProjects: Project[] = [];
  projects: Project[] = [
    { name: 'Proyecto 1', status: 'En progreso', progress: 45 },
    { name: 'Proyecto 2', status: 'Completado', progress: 100 },
    { name: 'Proyecto 3', status: 'En espera', progress: 20 }
  ];

  ngOnInit() {
    this.filteredProjects = [...this.projects];
  }

  editProject(project: Project) {
    console.log('Editar proyecto:', project);
    // Implementar lógica de edición
  }

  deleteProject(project: Project) {
    console.log('Eliminar proyecto:', project);
    this.projects = this.projects.filter(p => p !== project);
    this.filteredProjects = this.filteredProjects.filter(p => p !== project);
  }

  viewProject(project: Project) {
    // Implementa la lógica para ver los detalles del proyecto
    console.log('Ver proyecto:', project);
  }

  searchProjects() {
    if (this.searchTerm) {
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProjects = [...this.projects];
    }
  }
}
