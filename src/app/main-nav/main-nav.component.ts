import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit() {
  }

  showAbout() {
    
    this.toastService.showToast('success', 2000, 'This application is designed by Rami Abed. (C) 2020');
  }

}
