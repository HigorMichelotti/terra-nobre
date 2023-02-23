import { Subject, Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  emitirMenuAlterado = new EventEmitter<string>();
}
