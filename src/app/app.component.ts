import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ProjectFormComponent } from './views/projects/project-form/project-form.component';
import { ProjectListComponent } from './views/projects/project-list/project-list.component';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './views/layout/layout.component';
import { TaskFormComponent } from './views/tasks/task-form/task-form.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,
      RouterModule,
      ProjectFormComponent,
      ProjectListComponent,
      TaskFormComponent,
      HomeComponent,
      LayoutComponent,
      DropdownModule,
      SidebarComponent]
})
export class AppComponent {
  title = 'taskManagement';
}
