import { Component, OnInit, Inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ModalWindowComponent} from '../modal-window/modal-window.component'

@Component({
  moduleId: module.id,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers:[HeroService]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  editHero: Hero;

  constructor(
    private heroService: HeroService,
    public dialog:MatDialog
  ) {}

  ngOnInit() {
      this.getHeroes();
  }

  types=[
      { name: 'tank'},
      {  name: 'healer'},
      {  name: 'hunter'},
      {  name: 'runer'},
      {  name: 'magician'},
      {  name: 'warrior'},
      {  name: 'archer'}
  ]

  getHeroes(): void {
     this.heroService.getHeroes()
       .subscribe(heroes => this.heroes = heroes);
   }

  add(name: string, type: string, score: number): void{
      this.editHero=undefined;
      name=name.trim();
      type=type.trim();
      score=Number(score);
        if(!name && !type && !score){return;}
      const newHero: Hero={name, type, score} as Hero
         this.heroService.addHero(newHero)
            .subscribe(hero=> this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.openModal();
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero._id).subscribe();
  }

  openModal():void{
   this.dialog.open(
      ModalWindowComponent,
      {data:{name:'Hero deleted!'}}
    );
  }
}
