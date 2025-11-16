import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacklogStateService {

  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);

  constructor() { }

  // private routeParamsSub = this.route.paramMap.pipe(
  //   takeUntilDestroyed(this.destroyRef),
  //   filter(params => this.getCurrentUrl().includes('/backlog'))
  // ).subscribe(params => {
  //   // та же логика обработки параметров
  // });

}
