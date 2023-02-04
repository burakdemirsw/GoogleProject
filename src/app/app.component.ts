import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private router:Router,private route: ActivatedRoute){

  }
  currentUrl!: string
  ngOnInit(): void {
    this.currentPage();

    }

    currentPage(){
this.currentUrl= location.href.split("/")[3]
console.log(this.currentPage)

    }
  title = 'GoogleProject';
}
