import { Component, OnInit, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
    if (!this.heroe) {
      throw Error("Hero property is required");
      
    }
  }

}
