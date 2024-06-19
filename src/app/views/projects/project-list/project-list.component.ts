import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

interface Project {
  name: string;
  status: string;
  progress: number;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects: Project[] = [
    { name: 'Proyecto 1', status: 'En progreso', progress: 45 },
    { name: 'Proyecto 2', status: 'Completado', progress: 100 },
    { name: 'Proyecto 3', status: 'En espera', progress: 20 }
  ];

  editProject(project: Project) {
    console.log('Editar proyecto:', project);
    // Implementar lógica de edición
  }

  deleteProject(project: Project) {
    console.log('Eliminar proyecto:', project);
    // Implementar lógica de eliminación
    this.projects = this.projects.filter(p => p !== project);
  }
}
