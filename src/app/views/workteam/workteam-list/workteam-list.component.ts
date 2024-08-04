import { Component, OnInit } from '@angular/core';
import { WorkTeamService } from '../../../services/workteam/work-team.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

type WorkTeam = {
  id: string;
  name: string;
  description: string;
  state: string;
}

@Component({
  selector: 'app-workteam-list',
  standalone: true,
  imports: [SidebarComponent,
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule],
  templateUrl: './workteam-list.component.html',
  styleUrl: './workteam-list.component.css'
})
export class WorkteamListComponent implements OnInit {
  workTeams: WorkTeam[];
  modalVisible = false;

  constructor(private workTeamService: WorkTeamService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllWorkTeams();
  }

  getAllWorkTeams() {
    this.workTeamService.list().then(workTeams => this.workTeams = workTeams as WorkTeam[]);
  }

  editarWorkTeam(id: string): void {
    this.router.navigate(['workteam-edit'], { queryParams: { id: id } });
  }

  async eliminarWorkTeam(id: string) {
    try {
      await this.workTeamService.deleteById(id);
      console.log("Registro eliminado");
      this.getAllWorkTeams();
    } catch {
      console.error("Error al eliminar");
    }
  }
}
