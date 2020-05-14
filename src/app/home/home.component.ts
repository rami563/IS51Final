import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  data: object = {};
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem("output"));
    if (data && Object.keys(data).length > 0) {
      this.data = data;
    }
  }
}
