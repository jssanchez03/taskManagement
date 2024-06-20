import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './views/projects/project-form/project-form.component';
import { NgModule } from '@angular/core';
import { ProjectListComponent } from './views/projects/project-list/project-list.component';
import { HomeComponent } from './views/home/home.component';
import { RolListComponent } from './views/rol/rol-list/rol-list.component';
import { RolFormComponent } from './views/rol/rol-form/rol-form.component';
import { TaskFormComponent } from './views/tasks/task-form/task-form.component';
import { TaskListComponent } from './views/tasks/task-list/task-list.component';
import { UserListComponent } from './views/user/user-list/user-list.component';
import { UserFormComponent } from './views/user/user-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'project-list',
    component: ProjectListComponent
  },
  {
    path: 'project-form',
    component: ProjectFormComponent,
  },
  {
    path: 'task-list',
    component: TaskListComponent,
  },
  {
    path: 'task-form',
    component: TaskFormComponent,
  },
  {
    path: 'rol-list',
    component: RolListComponent,
  },
  {
    path: 'rol-form',
    component: RolFormComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user-form',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
