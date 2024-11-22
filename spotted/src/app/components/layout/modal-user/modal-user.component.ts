import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [MdbFormsModule],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.scss',
})
export class ModalUserComponent {
  constructor(public modalRef: MdbModalRef<ModalUserComponent>) {}
}
