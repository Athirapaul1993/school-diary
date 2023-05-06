import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-edit',
  templateUrl: './teachers-edit.component.html',
  styleUrls: ['./teachers-edit.component.scss'],
})
export class TeachersEditComponent {
  nurseryStudentForm!: FormGroup;
  selectedFile: any = null;
  images: any;
  imgName: String = '';
  ifUploaded: Boolean = false; //to ensure uploading is complete
  fd: any = new FormData();
  id: any;
  passwordReg: string = '';

  constructor(
    private fb: FormBuilder,
    private api: BackendService,
    private router: Router
  ) {
    this.nurseryStudentForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: [''],
      address: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],

      emergencyName: ['', Validators.required],
      emergencyPhoneNumber: ['', Validators.required],
      emergencyRelationship: [''],
    });
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('pupil_id');
    this.getIndividualData(this.id);
  }

  //single info
  getIndividualData(id: any) {
    this.api.getOneItems(id).subscribe((res: any) => {
      let item = res.data[0];

      this.nurseryStudentForm = this.fb.group({
        fullName: [item.fullName, Validators.required],
        dateOfBirth: [item.dateOfBirth, Validators.required],
        gender: [item.gender],
        address: [item.address],
        email: [item.email, Validators.required],
        password: [item.password, Validators.required],

        emergencyName: [item.emergencyName, Validators.required],
        emergencyPhoneNumber: [item.emergencyPhoneNumber, Validators.required],
        emergencyRelationship: [item.emergencyRelationship],
      });
      this.imgName = item.photo.split('\\')[2];
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
      this.fd.append(prop, nurseryStudent[prop]);
    }

    if (this.selectedFile) {
      this.fd.append('image', this.selectedFile, this.selectedFile.name); //image appended last due to bug
    }

    this.api.updateItem(this.id, this.fd).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: ' Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/dashboard/teachers']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/dashboard/teachers']);
        });
      }
    });
  }

  // to auto generate password
  toPassword() {
    if (
      this.nurseryStudentForm.value.fullName &&
      this.nurseryStudentForm.value.dateOfBirth
    ) {
      // Capitalize all characters of the name
      const capitalized = this.nurseryStudentForm.value.fullName.toUpperCase();
      // Take the first four characters of the capitalized name
      const shortened = capitalized.slice(0, 4);
      //take year from input
      const year = this.getYearFromDate(
        this.nurseryStudentForm.value.dateOfBirth
      );
      this.passwordReg = shortened + '@' + year;
    }
  }

  // to take year from dob
  getYearFromDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }
}
