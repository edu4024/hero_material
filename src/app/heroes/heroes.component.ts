import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


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

  constructor(private heroService: HeroService) {

  }
  ngOnInit() {
      this.getHeroes();
  }

  types=[
      { name: 'tank'},
      {  name: 'healer'},
      {  name: 'hunter'},
      {  name: 'runer'},
  ]

  getHeroes(): void {
     this.heroService.getHeroes()
       .subscribe(heroes => this.heroes = heroes);
   }

  add(name: string, type: string): void{
      this.editHero=undefined;
      name=name.trim();
      type=type.trim();
        if(!name){return;}
      const newHero: Hero={name, type} as Hero
         this.heroService.addHero(newHero)
            .subscribe(hero=> this.heroes.push(hero));
  }

  delete(hero: Hero): void {
   this.heroes = this.heroes.filter(h => h !== hero);
   this.heroService.deleteHero(hero._id).subscribe();

 }

}
