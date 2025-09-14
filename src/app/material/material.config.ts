import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const materialFormFieldConfig = {
  appearance: 'outline' as const,
  hideRequiredMarker: false,
  floatLabel: 'auto' as const,
  color: 'primary' as const
};

export const materialFormFieldProvider = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: materialFormFieldConfig
};
