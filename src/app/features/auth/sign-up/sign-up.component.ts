import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private readonly maxNameLength = 16;
  private readonly fb = inject(FormBuilder);

  signupForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxNameLength),
        this.badNameValidator('bidzina'),
      ],
    ],
    lastName: [
      '',
      [Validators.required, Validators.maxLength(this.maxNameLength)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  get controls() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.controls.email.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onAutofill() {
    // ცალკე კონტროლებზე
    // this.controls.firstName.setValue("John");
    // this.controls.lastName.setValue("Doe");

    // FormGroup-ით
    this.signupForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mail.com',
    });
  }

  onSubmt() {
    console.log(this.signupForm.value);
  }

  badNameValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      return control.value.includes(pattern)
        ? { badName: `pattern "${pattern}" is prohibited!` }
        : null;
    };
  }
}
