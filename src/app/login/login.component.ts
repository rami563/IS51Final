import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }

  login(){
    if(this.username !== 'rami' && this.password !=='rami123'){
      this.toastService.showToast('danger', 2000, 'Wrong Username or Password')
    } else {
      this.router.navigate(['cart'])
      this.toastService.showToast('success', 2000, 'Login Successful')
    }
  }
}
