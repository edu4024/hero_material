import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[HeroService],
  moduleId: module.id,
})

export class MainPageComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource;
    displayedColumns=['score','name','type','color','date'];

 constructor(private heroService: HeroService) {

 }


 ngOnInit() {
   this.heroService.getHeroes().subscribe(results =>{
     if(!results){
       return
     }
     this.dataSource= new MatTableDataSource(results);
     this.dataSource.sort=this.sort;
   });
 }

  applyFilter(filterValue: string) {
       filterValue = filterValue.trim(); // Remove whitespace
       filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
       this.dataSource.filter = filterValue;
     }


}
