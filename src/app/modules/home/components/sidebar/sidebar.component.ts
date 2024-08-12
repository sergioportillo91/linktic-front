import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    setTimeout(() => {
      const tipoUsuario = JSON.parse(sessionStorage.getItem('AUTH')!).tipo;
      this.nombreUsuario = JSON.parse(sessionStorage.getItem('AUTH')!).nick;
      this.visible = 'Administrador' == tipoUsuario;
    }, 100);
  }
  @Output() state = new EventEmitter();
  public isExpanded = false;
  public showButtons = false;
  public visible = false;
  public nombreUsuario = '';
  public buttons = [
    {
      id: 1,
      path: '',
      label: 'Menú',
      icon: 'pi pi-box',
      expanded: false,
      expand: () => {
        this.toggleSubmenu(1)
      },
      childrens: [
        {
          path: 'reservations',
          label: 'Gestionar Reservas',
          icon: 'pi pi-table',
          visible: true,
        },
        {
          path: 'services',
          label: 'Gestionar Servicios',
          icon: 'pi pi-briefcase',
          visible: true,
        },
        {
          path: 'clients',
          label: 'Gestionar Clientes',
          icon: 'pi pi-user',
          visible: true,
        },
      ]
    },
  
  ]

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.showButtons = !this.showButtons;
    if(!this.isExpanded){
      this.buttons = this.buttons.map((button) => {
        button.expanded = false;
        return button;
      })
    }
    this.state.emit(this.isExpanded);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  goTo(path: string){
    this.toggleSidebar();
    this.router.navigate([`home/dashboard/${path}`])
  }

  toggleSubmenu(id: number){
    this.buttons.forEach((item, index) => {
      if((index+1)==id){
        item.expanded = !item.expanded;
      }else{
        item.expanded = false;
      }
    })
  }

}
