import { AuthService } from './../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  sidebarItems = [
    // urls vienen del router
    {label: 'Listado', icon: 'label', url:'./list'},
    {label: 'Añadir', icon: 'add', url:'./new-heroe'},
    {label: 'Buscar', icon: 'search', url:'./search'},
  ]

  constructor(private router: Router, private authService: AuthService) { }

  get user(): User | undefined{
    return this.authService.currentUser;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut()    
  }

}
