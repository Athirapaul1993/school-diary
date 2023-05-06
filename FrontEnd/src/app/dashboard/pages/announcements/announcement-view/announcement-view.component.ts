import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BackendService } from 'src/app/dashboard/backend.service';

@Component({
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
  styleUrls: ['./announcement-view.component.scss'],
})
export class AnnouncementViewComponent {
  modalItem: any = '';
  alreadySigned: boolean = false;
  volunteerList: any;
  constructor(
    public route: Router,
    private api: BackendService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    let id = localStorage.getItem('announcement_id');
    this.api.getOneNotice(id).subscribe((res: any) => {
      this.modalItem = res.data[0];
      if (this.modalItem.type == 'Volunteering Activity') {
        if (this.modalItem.volunteers != null) {
          this.getVolunteers();
        }

        //to check if pupil has already signed in
        if (this.modalItem.volunteers.includes(this.auth.idFetch())) {
          this.alreadySigned = true;
        }
      }
    });
  }

  isAuthorized(): boolean {
    return this.auth.isTeacher();
  }

  editItem(id: any) {
    localStorage.setItem('announcement_id', id);

    this.route.navigate(['dashboard/announcement-edit']);
  }

  volunteerSignUp() {
    let user_id = this.auth.idFetch();
    let notice_id = localStorage.getItem('announcement_id');

    this.api.signVolunteer(user_id, notice_id).subscribe((res: any) => {
      this.alreadySigned = true;
      this.modalItem.volunteers.push(user_id);
      this.getVolunteers();
    });
  }

  optOut() {
    let user_id = this.auth.idFetch();
    let notice_id = localStorage.getItem('announcement_id');

    this.api.optOut(user_id, notice_id).subscribe((res: any) => {
      this.alreadySigned = false;
      this.volunteerList = this.volunteerList.filter(
        (e: any) => e._id != user_id
      );
    });
  }

  getVolunteers() {
    this.api
      .getVolunteerdetails(this.modalItem.volunteers)
      .subscribe((res: any) => {
        this.volunteerList = res.data;
      });
  }
}
