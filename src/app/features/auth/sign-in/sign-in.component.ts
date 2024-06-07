import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  isSignUpSuccess = false;
  email = '';
  password = '';
  keepSignedIn = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    });
  }

  onSignIn() {
    console.log(this.email, this.password, this.keepSignedIn);
  }
}
