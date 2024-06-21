import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project/project.service';

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
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  searchTerm: string = '';
  filteredProjects: Project[] = [];
  projects: any;

  constructor(private router: Router,
    private projectService: ProjectService
  ) {} // Inject Router

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.listProjects().then((projects: any) => {
      this.projects = projects;
      this.filteredProjects = projects;
      console.log(this.projects);
    }).catch(error => {
      console.error('Error al obtener los proyectos:', error);
    });
  }

  editProject(project: Project) {
    console.log('Editar proyecto:', project);
    // Implementar lógica de edición
  }

  async deleteProject(id: string) {
    try{
      await this.projectService.deleteById(id);
      this.getAllProjects();
    }catch{
      console.error("Error el eliminar");
    }
  }

  viewProject(id: string) {
    this.router.navigate(['/task-list'], { queryParams: { project: id } }); // Redirigir a /task-list
  }

  searchProjects() {
    if (this.searchTerm) {
      this.filteredProjects = this.projects.filter((project: { name: string; }) =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProjects = [...this.projects];
    }
  }
}
