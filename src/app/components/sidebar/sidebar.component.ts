import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const arrowElements = document.querySelectorAll('.arrow');
      arrowElements.forEach(arrow => {
        this.renderer.listen(arrow, 'click', (e) => {
          const arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
          if (arrowParent) {
            if (arrowParent.classList.contains('showMenu')) {
              this.renderer.removeClass(arrowParent, 'showMenu');
            } else {
              this.renderer.addClass(arrowParent, 'showMenu');
            }
          }
        });
      });
      this.renderer.addClass(document.body, 'sidebar-closed');
    }
  }

  toggleSidebar() {
    if (isPlatformBrowser(this.platformId)) {
      const sidebar = document.querySelector('.sidebar');
      const content = document.querySelector('.content');
      if (sidebar && content) {
        if (sidebar.classList.contains('close')) {
          this.renderer.removeClass(sidebar, 'close');
          this.renderer.setStyle(content, 'margin-left', '250px');
        } else {
          this.renderer.addClass(sidebar, 'close');
          this.renderer.setStyle(content, 'margin-left', '60px');
        }
      }
    }
  }
}
