import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './units/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { PupilsComponent } from './pages/pupils/pupils-form/pupils.component';
import { PupilsListComponent } from './pages/pupils/pupils-list/pupils-list.component';
import { PupilsViewComponent } from './pages/pupils/pupils-view/pupils-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from './backend.service';
import { AnnouncementListComponent } from './pages/announcements/announcement-list/announcement-list.component';
import { AnnouncementFormComponent } from './pages/announcements/announcement-form/announcement-form.component';
import { PupilsEditComponent } from './pages/pupils/pupils-edit/pupils-edit.component';
import { AnnouncementEditComponent } from './pages/announcements/announcement-edit/announcement-edit.component';
import { SearchPipe } from './search.pipe';
import { CalenderComponent } from './pages/events/calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddEventComponent } from './pages/events/add-event/add-event.component';
import { AnnouncementViewComponent } from './pages/announcements/announcement-view/announcement-view.component';
import { AddRemarksComponent } from './pages/pupils/add-remarks/add-remarks.component';
import { RoleGuard } from '../auth/role.guard';
import { TeachersListComponent } from './pages/teachers/teachers-list/teachers-list.component';
import { TeachersViewComponent } from './pages/teachers/teachers-view/teachers-view.component';
import { TeachersFormComponent } from './pages/teachers/teachers-form/teachers-form.component';
import { TeachersEditComponent } from './pages/teachers/teachers-edit/teachers-edit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    PupilsComponent,
    PupilsListComponent,
    PupilsViewComponent,
    AnnouncementListComponent,
    AnnouncementFormComponent,
    PupilsEditComponent,
    AnnouncementEditComponent,
    SearchPipe,
    CalenderComponent,
    AddEventComponent,
    AnnouncementViewComponent,
    AddRemarksComponent,
    TeachersEditComponent,
    TeachersListComponent,
    TeachersFormComponent,
    TeachersViewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [BackendService, SearchPipe, RoleGuard],
})
export class DashboardModule {}
