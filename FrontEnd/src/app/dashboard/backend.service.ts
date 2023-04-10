import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // api: string = environment.api
  api: string = 'http://localhost:3400/api'

  // api:string='/api'

  constructor(private http: HttpClient) { }

  addItem(item: any) {
    return this.http.post(`${this.api}/pupils`, item)
  }


  //get all data

  getItems() {
    return this.http.get(`${this.api}/pupils`)

  }

  //getOne all data

  getOneItems(id: any) {
    return this.http.get(`${this.api}/pupils/${id}`)

  }

  // delete 


  deleteItem(id: any) {
    return this.http.delete(`${this.api}/pupils/${id}`)
  }


  // updateItem 
  updateItem(id: any, item: any) {
    return this.http.put(`${this.api}/pupils/${id}`, item)
  }


  //?remarks

  addRemarks(item: any) {
    return this.http.post(`${this.api}/remarks`, item)
  }
  getRemarks(id: any) {
    return this.http.get(`${this.api}/remarks/${id}`)
  }


  //comments
  postComment(item: any) {
    return this.http.post(`${this.api}/comments`, item)

  }



  //announcements
  addNotice(item: any) {
    return this.http.post(`${this.api}/announcements`, item)
  }


  //get all data

  getNotice() {
    return this.http.get(`${this.api}/announcements`)

  }

  //getOne all data

  getOneNotice(id: any) {
    return this.http.get(`${this.api}/announcements/${id}`)

  }

  // delete 


  deleteNotice(id: any) {
    return this.http.delete(`${this.api}/announcements/${id}`)
  }


  // updateItem 
  updateNotice(id: any, item: any) {
    return this.http.put(`${this.api}/announcements/${id}`, item)
  }

  //signUp volunteering
  signVolunteer(user_id: any, id: any) {
    return this.http.patch(`${this.api}/announcements/${id}`, { user_id })

  }

   //optOut volunteering
   optOut(user_id: any, id: any) {
    return this.http.patch(`${this.api}/announcements/optOut/${id}`, { user_id })

  }

  //get volunteer details
  getVolunteerdetails(value: any) {
    return this.http.post(`${this.api}/pupils/volunteer`, { value })

  }

  // *calender 


  addCalender(item: any) {
    return this.http.post(`${this.api}/calender`, item)
  }


  //get all data

  getCalender() {
    return this.http.get(`${this.api}/calender`)
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );

  }

  //getOne all data

  getOneCalender(id: any) {
    return this.http.get(`${this.api}/calender/${id}`)

  }

  // delete 


  deleteCalender(id: any) {
    return this.http.delete(`${this.api}/calender/${id}`)
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }

  // updateItem 
  updateCalender(id: any, item: any) {
    return this.http.put(`${this.api}/calender/${id}`, item)
  }


}
