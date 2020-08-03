
import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{
  
  constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute
  ) {}

 ngOnInit() {
   const appTitle = this.titleService.getTitle();
   this.router
     .events.pipe(
       filter(event => event instanceof NavigationEnd),
       map(() => {
         let child = this.activatedRoute.firstChild;
         console.log(child.firstChild)
         console.log(child.snapshot.data['title'])
         while (child.firstChild) {
           child = child.firstChild;
         }
         if (child.snapshot.data['title']) {
           return child.snapshot.data['title'];
         }
         return appTitle;
       })
     ).subscribe((title: string) => {
       this.titleService.setTitle(title);
     });
 }
}
