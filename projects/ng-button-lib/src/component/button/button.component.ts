import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() type: 'default' | 'primary' | 'warning' | 'danger';
  @Input() icon: string;
  @Input() disable: boolean;

  constructor() { }

  ngOnInit() {
  }

}
