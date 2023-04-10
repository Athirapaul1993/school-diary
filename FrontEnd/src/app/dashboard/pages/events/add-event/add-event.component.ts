import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BackendService } from '../../../backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {

  eventForm!: FormGroup

  error: any;
  constructor(private apiService: BackendService, private router: Router, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['']
    })
  }


  saveEvent() {
    let value = this.eventForm.value
    this.apiService.addCalender(value)
      .subscribe(
        (response: any) => {
          if (response.status) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your Event has been added successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/dashboard/calender']);
          }
          else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 1500
            });
            this.eventForm.reset();
          }
        });
  }

}
