import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  title = 'Family Application';
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
