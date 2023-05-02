import { Component } from '@angular/core';
import { BackendService } from '../../../backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-remarks',
  templateUrl: './add-remarks.component.html',
  styleUrls: ['./add-remarks.component.scss']
})
export class AddRemarksComponent {

  remarkForm!: FormGroup

  constructor(private fb: FormBuilder, private api: BackendService, private router: Router) {
    this.remarkForm = this.fb.group({
      remark: ['', Validators.required],
      studentId: ['', Validators.required]
    })


  }


  remarksSubmit() {
    this.remarkForm.value.studentId = localStorage.getItem('pupil_id')
    let remarks = this.remarkForm.value
    this.api.addRemarks(remarks).subscribe((res: any) => {
      if (res.status) {

        Swal.fire({
          icon: 'success',
          title: ' Sent',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/dashboard/pupils'])
        })
      }
      else {
            Swal.fire({
              icon: 'error',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
    })
  }



}
