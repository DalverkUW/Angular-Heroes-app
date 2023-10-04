import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from './../../services/hero-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css']
})
export class NewHeroPageComponent implements OnInit {

  //Esto es un formulario
  heroForm = new FormGroup({
    id:               new FormControl(''),              
    superhero:        new FormControl<string>('', {nonNullable: true}),   //Siempre debe ser string, no puede quedar nulo
    publisher:        new FormControl<Publisher>(Publisher.DCComics),       
    alter_ego:        new FormControl(''),       
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),      
    alt_img:          new FormControl('')        
  });

  publishers = [{id: 'DC Comics', desc: 'DC - Comics'}, {id: 'Marvel Comics', desc: 'Marvel - Comics'}]



  constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  get CurrentHero(): Heroe{
    const hero = this.heroForm.value as Heroe;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroService.getHeroById( id )),
      )
      .subscribe( heroSUB => {
        if (!heroSUB) return this.router.navigateByUrl('/');

        this.heroForm.reset( heroSUB );
        return
      })
  }

  onSubmit(){
    if (this.heroForm.invalid) return
    
    if (this.CurrentHero.id) {
      this.heroService.UpdateHero(this.CurrentHero)
        .subscribe(heroSUB => {
          this.router.navigate(['/heroes/edit', heroSUB.id])
          this.showSnackBar(`${heroSUB.superhero} actualizado!`);
        });
      return
    }

    this.heroService.addHero(this.CurrentHero)
    .subscribe(heroSUB => {
      this.showSnackBar(`${heroSUB.superhero} actualizado!`);
      this.router.navigate(['/heroes']);
    });
  }

  //Borrar héroe
  onDeleteHero(){
    if(!this.CurrentHero.id) throw Error('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean) => result),
      switchMap(() => this.heroService.DeleteHero(this.CurrentHero.id)),
      filter((wasDeleted: boolean) => wasDeleted)      
    )
    .subscribe(() => {
      this.router.navigate(['/heroes']); 
    });    
  }

  //Snack bar
  showSnackBar(message:string){
    this.snackbar.open(message, 'done', {
      duration: 2500
    });
  }
}
