import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: BackendService
  ) {}

  loginUser: any;

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getEmail();
  }

  isAuthorized(): boolean {
    return this.auth.isTeacher();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
  getEmail() {
    let id = this.auth.idFetch();
    this.api.getOneItems(id).subscribe((res: any) => {
      this.loginUser = res.data[0].fullName;
    });
  }

  toView() {
    let id = this.auth.idFetch();
    localStorage.setItem('pupil_id', id);
    this.router.navigate(['dashboard/view-item']);
  }
}
