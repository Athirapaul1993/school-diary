import { Component } from '@angular/core';
import { BackendService } from '../../../backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-remarks',
  templateUrl: './add-remarks.component.html',
  styleUrls: ['./add-remarks.component.scss'],
})
export class AddRemarksComponent {
  remarkForm!: FormGroup;
  selectedFile: any = null;
  images: any;
  ifUploaded: Boolean = false; //to ensure uploading is complete
  fd: any = new FormData();

  constructor(
    private fb: FormBuilder,
    private api: BackendService,
    private router: Router
  ) {
    this.remarkForm = this.fb.group({
      remark: ['', Validators.required],
      studentId: ['', Validators.required],
    });
  }
  //Image upload
  pdf(event: any) {
    if (event.target.files.length > 0) {
      console.log('files');

      this.selectedFile = <File>event.target.files[0];
    } else {
      console.log('no files');
    }
  }

  remarksSubmit() {
    this.remarkForm.value.studentId = localStorage.getItem('pupil_id');
    const remarks = this.remarkForm.value;
    // append pdf and send data
    for (const prop in remarks) {
      this.fd.append(prop, remarks[prop]);
    }

    if (this.selectedFile) {
      this.fd.append('pdf', this.selectedFile, this.selectedFile.name); //image appended last due to bug
    }

    this.api.addRemarks(this.fd).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: ' Sent',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/dashboard/pupils']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
