import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress-upload.component.html',
  styleUrls: ['./progress-upload.component.scss']
})
export class ProgressUploadComponent implements OnInit {
  @Input() progress = 0;
  @Input() classCss = "progress";
  constructor() { }

  ngOnInit() { }
}
