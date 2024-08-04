import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserWorkteamService } from '../../../services/user-workteam/user-workteam.service';
import { Router } from '@angular/router';

type UserWorkTeam = {
  user: { name: string };  // Ajusta según la estructura real del objeto
  workTeam: { name: string };  // Ajusta según la estructura real del objeto
}


@Component({
  selector: 'app-user-workteam-list',
  standalone: true,
  imports: [SidebarComponent,
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule],
  templateUrl: './user-workteam-list.component.html',
  styleUrl: './user-workteam-list.component.css'
})
export class UserWorkteamListComponent implements OnInit {
  userWorkTeams: UserWorkTeam[] = [];
  modalVisible = false;
  userWorkTeamSeleccionado: UserWorkTeam | null = null;

  constructor(private userWorkteamService: UserWorkteamService, public router: Router) { }

  ngOnInit(): void {
    this.getAllUserWorkTeams();
  }

  getAllUserWorkTeams() {
    this.userWorkteamService.list().then(userWorkTeams => this.userWorkTeams = userWorkTeams as UserWorkTeam[]);
  }

  async verDetalles(userWorkTeam: UserWorkTeam) {
    this.userWorkTeamSeleccionado = userWorkTeam;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.userWorkTeamSeleccionado = null;
  }

  editarUserWorkTeam(userWorkTeam: UserWorkTeam): void {
    this.router.navigate(['userworkteam-edit'], { queryParams: { user: userWorkTeam.user, workTeam: userWorkTeam.workTeam } });
  }

  async eliminarUserWorkTeam(userWorkTeam: UserWorkTeam) {
    try {
      await this.userWorkteamService.deleteById(`${userWorkTeam.user}-${userWorkTeam.workTeam}`);
      console.log("Registro eliminado");
      this.getAllUserWorkTeams();
    } catch {
      console.error("Error al eliminar");
    }
  }
}
