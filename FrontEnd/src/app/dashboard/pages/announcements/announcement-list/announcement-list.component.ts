import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../../backend.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent {


  constructor( private route: Router, public api: BackendService, private auth: AuthService) { }

  query: String = ''
  announcements: any
  //redirect to add form
  addItem() {
    this.route.navigate(['dashboard/announcement-new'])
  }
  isAuthorized() {
    return this.auth.isAdmin()
  }

  ngOnInit() {
    this.getItems();

  

  }


  getItems() {
    this.api.getNotice().subscribe((res: any) => {
      this.announcements = res.data
    })
  }

  //delete

  deleteItem(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteNotice(id).subscribe(result => {
          this.announcements = this.announcements.filter((item: any) => item._id !== id)
        });

      }
    })


  }

  viewItem(id: any) {
    localStorage.setItem('announcement_id', id)
    this.route.navigate(['dashboard/announcement-view']);

  }



}
