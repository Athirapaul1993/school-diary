import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PupilsComponent } from './pages/pupils/pupils-form/pupils.component';
import { PupilsListComponent } from './pages/pupils/pupils-list/pupils-list.component';
import { PupilsViewComponent } from './pages/pupils/pupils-view/pupils-view.component';
import { AnnouncementListComponent } from './pages/announcements/announcement-list/announcement-list.component';
import { AnnouncementFormComponent } from './pages/announcements/announcement-form/announcement-form.component';
import { PupilsEditComponent } from './pages/pupils/pupils-edit/pupils-edit.component';
import { AnnouncementEditComponent } from './pages/announcements/announcement-edit/announcement-edit.component';
import { CalenderComponent } from './pages/events/calender/calender.component';
import { AddEventComponent } from './pages/events/add-event/add-event.component';
import { AnnouncementViewComponent } from './pages/announcements/announcement-view/announcement-view.component';
import { AddRemarksComponent } from './pages/pupils/add-remarks/add-remarks.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', pathMatch: 'full', component: AnnouncementListComponent },
      { path: 'pupils', canActivate:[RoleGuard],component: PupilsListComponent },
      { path: 'add-new',canActivate:[RoleGuard], component: PupilsComponent },
      { path: 'view-item', component: PupilsViewComponent },
      { path: 'edit-item',canActivate:[RoleGuard], component: PupilsEditComponent },
      { path: 'add-remark',canActivate:[RoleGuard], component: AddRemarksComponent },
      { path: 'announcements', component: AnnouncementListComponent },
      { path: 'announcement-new',canActivate:[RoleGuard], component: AnnouncementFormComponent },
      { path: 'announcement-edit', canActivate:[RoleGuard], component: AnnouncementEditComponent },
      { path: 'announcement-view', component: AnnouncementViewComponent },

      { path: 'calender', component: CalenderComponent },
      { path: 'add-event',canActivate:[RoleGuard], component: AddEventComponent },



    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
