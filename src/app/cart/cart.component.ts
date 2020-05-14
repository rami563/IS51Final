import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ToastService } from "../toast/toast.service";

export interface IBike {
  id: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  bikes: Array<IBike> = [];
  nameParams = "";
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    const savedBikes = JSON.parse(localStorage.getItem("bikes"));
    if(savedBikes && savedBikes.length > 0 ) {
      this.bikes = savedBikes;
    } else {
      this.bikes = [
        {
          id: 1,
          image: "../../assets/bike1.jpeg",
          description: "Bike Model 1",
          price: 5000,
          quantity: 1
        },
        {
          id: 2,
          image: "../../assets/bike2.jpeg",
          description: "Bike Model 2",
          price: 4000,
          quantity: 2
        },
        {
          id: 3,
          image: "../../assets/bike3.jpeg",
          description: "Bike Model 3",
          price: 3000,
          quantity: 3
        }
      ];
    }


  }

  async loadTestFromFile() {
    const inventory = await this.http.get("assets/inventory.json").toPromise();
    console.log("Inventory --->", inventory.json);
    return inventory.json();
  }

  //Add bike
  addBike(bike: string) {
    switch (bike) {
      case "Bike Model 1":
        this.bikes.unshift({
          id: 1,
          image: "../../assets/bike1.jpeg",
          description: "Bike Model 1",
          price: 5000,
          quantity: 1
        });
        break;
      case "Bike Model 2":
        this.bikes.unshift({
          id: 2,
          image: "../../assets/bike2.jpeg",
          description: "Bike Model 2",
          price: 4000,
          quantity: 2
        });
        break;
      case "Bike Model 3":
        this.bikes.unshift({
          id: 3,
          image: "../../assets/bike3.jpeg",
          description: "Bike Model 3",
          price: 3000,
          quantity: 3
        });
        break;
    }
    this.saveToLocalStorage("bikes", this.bikes);
  }

  save(key: string, data: Array<IBike>) {
    this.saveToLocalStorage(key, data);
    this.toastService.showToast("success", 2000, "Save successfully");
  }
  
  saveToLocalStorage(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  //Delete bike from array
  delete(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage("bikes",this.bikes);
  }

  validate() {
    if (this.nameParams == null || this.nameParams == "") {
      this.toastService.showToast("warning", 2000, "Name can't be null");
      


    } else if (this.nameParams.indexOf(", ") == -1) {
      this.toastService.showToast(
        "warning",
        2000,
        "name must have comma and space"
      );
    } else {
      let firstName, lastName, indexOfComma, fullName;

      indexOfComma = this.nameParams.indexOf(", ");
      firstName = this.nameParams.slice(
        indexOfComma + 1,
        this.nameParams.length
      );

      lastName = this.nameParams.slice(0, indexOfComma);

      fullName = firstName + " " + lastName;
      
      let total = 0;
      let subtotal = 0;
      let taxAmount = 0.0

      for(let i = 0, len = this.bikes.length; i < len; i++) {
        let bike = this.bikes[i];
          subtotal += bike.price * bike.quantity;
      }
      taxAmount += subtotal * .15
      total += taxAmount + subtotal;

      this.router.navigate([
        "invoice",
        {
          subtotal: subtotal,
          taxAmount: taxAmount,
          total: total,
          fullName: fullName
        }
      ]);

      const output = {
        subtotal: subtotal,
        taxAmount: taxAmount,
        total: total,
        fullName: fullName
      }
      
      this.saveToLocalStorage("output", output);

    }
  }
}
