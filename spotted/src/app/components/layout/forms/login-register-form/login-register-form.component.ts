import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';

@Component({
  selector: 'app-login-register-form',
  standalone: true,
  imports: [MdbFormsModule, MdbTabsModule],
  templateUrl: './login-register-form.component.html',
  styleUrl: './login-register-form.component.scss',
})
export class LoginRegisterFormComponent {}
