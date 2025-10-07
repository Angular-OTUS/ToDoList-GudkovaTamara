import { MAT_CARD_CONFIG } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';

const appearanceConfig = {
  appearance: 'outline'
};

export const materialFormFieldConfig = {
  // appearance: 'outline' as const,
  hideRequiredMarker: false,
  floatLabel: 'auto' as const,
  color: 'primary' as const,
  subscriptSizing: 'dynamic',
  ...appearanceConfig,
};

export const materialConfigProviders = [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: materialFormFieldConfig
  },
  {
    provide: MAT_CARD_CONFIG,
    useValue: appearanceConfig
  }
];

export const materialFormFieldProvider = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: materialFormFieldConfig
};
