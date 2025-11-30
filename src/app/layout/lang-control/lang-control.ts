import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TRANSLOCO_CONF } from '../../transloco/transloco-conf';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lang-control',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,

    TitleCasePipe,
    NgTemplateOutlet,
  ],
  templateUrl: './lang-control.html',
  styleUrl: './lang-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangControlComponent {

  private transloco = inject(TranslocoService);

  completeLanguageList = TRANSLOCO_CONF.availableLangs;
  currentLang = signal(this.transloco.getActiveLang());

  switchLanguage(lang: string) {
    this.transloco.setActiveLang(lang);
    this.currentLang.set(lang);
  }

}
