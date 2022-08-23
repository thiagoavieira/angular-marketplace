import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../list-films/film.model';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listSelectedFilms: Film[] = [];
  totalPrice!: number;
  disabled = false;
  hide = true;
  form: any;

  constructor(private checkoutService: CheckoutService, private route: Router) { }

  ngOnInit(): void {
    this.totalPrice = this.checkoutService.totalPrice;
    this.listSelectedFilms = this.checkoutService.listSelectedFilms;
    this.toggleButton();
  }

  payment():void {
    this.checkoutService.showMessage("Payment!", true);
    this.route.navigate(['../list-films'])
  }

  cancel(): void{
    this.route.navigate(['../list-films']);
  }

  toggleButton() {
    if (this.listSelectedFilms.length == 0){
      this.disabled = true;
    }
  }

  exclude(film: Film): void {
    this.totalPrice -+ film.price;
    this.checkoutService.setFilm(film);
    this.checkoutService.unselectFilm();
    if (this.totalPrice <= 0) {
      this.excludeAll();
    }
  }

  excludeAll() {
    this.checkoutService.totalPrice = 0;
    this.totalPrice = 0;
    this.checkoutService.listSelectedFilms = [];
    this.listSelectedFilms = [];
    this.toggleButton();
  }

}
