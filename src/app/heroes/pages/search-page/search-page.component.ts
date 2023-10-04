import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroService } from '../../services/hero-service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchInput = new FormControl('');
  heroes: Heroe[] = [];
  selectedHero?: Heroe

  constructor(private HeroService: HeroService) { }

  ngOnInit(): void {
  }

  searchHero(){
    const value: string = this.searchInput.value || '';   
    
    this.HeroService.getSuggestions(value)
      .subscribe(heroesSUB => this.heroes = heroesSUB);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent){
    if (!event.option.value) {
      this.selectedHero = undefined;
      return 
    }

    const hero: Heroe = event.option.value;
    this.searchInput.setValue(hero.superhero);

    

  }

}
