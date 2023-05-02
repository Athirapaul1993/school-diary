import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.scss']
})
export class AnnouncementEditComponent {
  announcementForm!: FormGroup
  id: any
  constructor(private fb: FormBuilder, private api: BackendService ) {
    this.announcementForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.id = localStorage.getItem('announcement_id');
    this.api.getOneNotice(this.id).subscribe((res: any) => {
      let item = res.data[0]
      this.announcementForm = this.fb.group({
        type: [item.type, Validators.required],
        description: [item.description, Validators.required]
      })
    })

  }

 
  onSubmit() {
    let value = this.announcementForm.value;

    this.api.updateNotice(this.id, value).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: ' Added Successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.announcementForm.reset()
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.announcementForm.reset()
        })
      }
    })
  }
}
