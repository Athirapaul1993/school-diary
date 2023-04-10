import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss']
})
export class PupilsComponent {

  nurseryStudentForm!: FormGroup;
  selectedFile: any = null;
  images: any;
  ifUploaded: Boolean = false; //to ensure uploading is complete
  fd: any = new FormData();

  passwordReg: string = ''
  constructor(private fb: FormBuilder, private api: BackendService, private router: Router) {
    this.nurseryStudentForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: [''],
      address: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // image: [null],
      parentName: ['', Validators.required],
      parentPhoneNumber: ['', Validators.required],
      emergencyName: ['', Validators.required],
      emergencyPhoneNumber: ['', Validators.required],
      emergencyRelationship: [''],

    });
  }

  //Image upload
  passportPhoto(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
    }
  }

  onSubmit() {
    const nurseryStudent = this.nurseryStudentForm.value;
    // append image and send data 
    for (const prop in nurseryStudent) {
      this.fd.append(prop, nurseryStudent[prop])
    }

    if (this.selectedFile) {
      this.fd.append('image', this.selectedFile, this.selectedFile.name); //image appended last due to bug
    }

    this.api.addItem(this.fd).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: ' Added Successfully',
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
        }).then(() => {
          this.router.navigate(['/dashboard/pupils'])
        })
      }
    })
  }



  // to auto generate password 
  toPassword() {
    if (this.nurseryStudentForm.value.fullName && this.nurseryStudentForm.value.dateOfBirth) {
      // Capitalize all characters of the name
      const capitalized = this.nurseryStudentForm.value.fullName.toUpperCase();
      // Take the first four characters of the capitalized name
      const shortened = capitalized.slice(0, 4);
      //take year from input
      const year = this.getYearFromDate(this.nurseryStudentForm.value.dateOfBirth);
      this.passwordReg = shortened + '@' + year

    }

  }

  // to take year from dob  
  getYearFromDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }
}
