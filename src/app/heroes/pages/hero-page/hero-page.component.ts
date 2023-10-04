import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from './../../services/hero-service.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

  public hero?: Heroe;

  constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroService.getHeroById(id) )
    )
    .subscribe(heroSUB => { 
      if(!heroSUB) return this.router.navigate(['/heroes/list']);
      this.hero = heroSUB;
      return 
    } )
  }

  regresar(){
    this.router.navigateByUrl("heroes/list")
  }

}
