import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  providers:[HeroService],
  moduleId: module.id
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
   heroes: Hero[];
   heroName='';
   editHero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }



   save(): void {
     this.editHero=undefined;
     
    // const update:Hero={name, type, color,score,_id, date}
     if(this.hero){
      this.heroService.updateHero(this.hero)
      .subscribe(
        hero => {
        const ix = hero ? this.heroes.findIndex(h => h._id === hero._id) : -1;
          if (ix > -1) { this.heroes[ix] = hero; }
      },
      ()=>this.goBack());
     }
   }

    colors = [
      {name: 'red'},
      {name: 'olive'},
      {name: 'purple'},
      {name: 'black'},
      {name: 'gray'},
      {name: 'teal'},
      {name: 'lime'},
      {name: 'aqua'},
      {name: 'pink'}
   ];
  }
