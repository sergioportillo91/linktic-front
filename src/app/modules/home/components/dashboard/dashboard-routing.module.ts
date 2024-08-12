import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GestionarClientesComponent } from './components/gestionar-clientes/gestionar-clientes.component';
import { HomeComponent } from './components/home/home.component';
import { RouterConstant } from 'src/app/constants/routes/router.constant';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { GestionarReservasComponent } from './components/gestionar-reservas/gestionar-reservas.component';
import { GestionarServiciosComponent } from './components/gestionar-servicios/gestionar-servicios.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: RouterConstant.ROUTER_SERVICES,
    component: GestionarServiciosComponent
  },
  {
    path: RouterConstant.ROUTER_RESERVATIONS,
    component: GestionarReservasComponent
  },
  {
    path: RouterConstant.ROUTER_CLIENTS,
    component: GestionarClientesComponent
  },

]

@NgModule({
  declarations: [
    DashboardComponent,
    GestionarServiciosComponent,
    GestionarReservasComponent,
    HomeComponent,
    GestionarClientesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength, actualLength }) =>
                      `Cantidad de caracteres mínima ${requiredLength} actual ${actualLength}`,
          maxlength: ({ requiredLength, actualLength }) =>
                      `Cantidad máxima de caracteres ${requiredLength} actual ${actualLength}`,
        }
      }
    })
  ]
})
export class DashboardRoutingModule { }
