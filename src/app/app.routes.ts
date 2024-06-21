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
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { TaskEditComponent } from './views/tasks/task-edit/task-edit.component';
import { RolEditComponent } from './views/rol/rol-edit/rol-edit.component';
import { ProjectEditComponent } from './views/projects/project-edit/project-edit.component';

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
    path: 'project-edit',
    component: ProjectEditComponent,
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
    path: 'task-edit',
    component: TaskEditComponent,
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
    path: 'rol-edit',
    component: RolEditComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user-form',
    component: UserFormComponent,
  },
  {
    path: 'user-edit',
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
