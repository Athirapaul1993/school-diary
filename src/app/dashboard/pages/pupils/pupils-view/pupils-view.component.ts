import { Component } from '@angular/core';
import { BackendService } from '../../../backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pupils-view',
  templateUrl: './pupils-view.component.html',
  styleUrls: ['./pupils-view.component.scss']
})
export class PupilsViewComponent {
  item: any
  remark: any

  commentForm!: FormGroup
  comments: any
  showContent:boolean = true

  constructor(private fb: FormBuilder, public api: BackendService, private router: Router) {

    this.commentForm = this.fb.group({

      text: ['', Validators.required],
      postId: ['', Validators.required],
      userId: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    let id = localStorage.getItem('pupil_id')

    this.getIndividualData(id);
    this.getRecentRemark(id);
  }



  getRecentRemark(id: any) {
    this.api.getRemarks(id).subscribe((res: any) => {
      this.remark = res.data
      this.comments = res.comments
    })
  }

  //single info
  getIndividualData(id: any) {

    this.api.getOneItems(id).subscribe((res: any) => {
      this.item = res.data[0]
    });
  }


  commentSubmit() {
    this.commentForm.value.postId = this.remark._id;
    this.commentForm.value.userId = localStorage.getItem('pupil_id')

    this.api.postComment(this.commentForm.value).subscribe((res: any) => {
      this.comments = res.comments
      this.commentForm.reset()

    })

  }
 
  editItem() {
    this.router.navigate(['/dashboard/edit-item']);
  }
}
