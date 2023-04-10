import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../../backend.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-pupils-list',
  templateUrl: './pupils-list.component.html',
  styleUrls: ['./pupils-list.component.scss']
})
export class PupilsListComponent {
  constructor(private route: Router, public api: BackendService, private auth: AuthService) { }

  query = '';
  pupils: any
  //redirect to add form
  addItem() {
    this.route.navigate(['dashboard/add-new'])
  }

  isAuthorized() {
    return this.auth.isAdmin()
  }

  ngOnInit() {
    this.getItems()

  }


  getItems() {
    this.api.getItems().subscribe((res: any) => {
      let list = res.data
      this.pupils = list.filter((i: any) => !i.admin)
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
      confirmButtonText: 'Yes, delete it!',
      timer: 30000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.api.deleteItem(id).subscribe(result => {
          this.pupils = this.pupils.filter((item: any) => item._id !== id)
        });

      }
    })


  }




  viewItem(id: any) {
    localStorage.setItem('pupil_id', id)
    this.route.navigate(['dashboard/view-item']);

  }

  logout() {
    localStorage.removeItem('token')
    this.route.navigate(['/login']);
  }

}
