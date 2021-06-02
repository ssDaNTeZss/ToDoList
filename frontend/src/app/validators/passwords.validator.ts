import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordsValidator(): ValidatorFn {
  return (
    control: AbstractControl,
  ): { [key: string]: boolean } | null => {
    const pas1 = control.value.password,
      pas2 = control.value.password2;

    if (!pas1 && !pas2) {
      const valid = !control.value || (pas1 === pas2);

      return valid ? null : {passswords: true};
    }
  };
}
