import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss']
})
export class AnnouncementFormComponent {
  announcementForm!: FormGroup

  constructor(private fb: FormBuilder, private api: BackendService, private router: Router) {
    this.announcementForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSubmit() {
    let value = this.announcementForm.value;

    this.api.addNotice(value).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: ' Added Successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.announcementForm.reset()
          this.router.navigate(['dashboard'])
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
