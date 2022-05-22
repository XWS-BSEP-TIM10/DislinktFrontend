import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NewPasswordDTO } from "../dto/NewPasswordDto";
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  isSubmitted = false;
  confirmPasswordError = "";

  constructor(private router: Router, private authService: AuthenticationService) { }

  recoveryForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    repeatedNewPassword: new FormControl('', [Validators.required])
  })

  get f() { return this.recoveryForm.controls; }


  ngOnInit(): void {
  }

  changePassword() {
    this.isSubmitted = true;

    if (this.recoveryForm.invalid) {
      return
    }

    var password = this.recoveryForm.get('newPassword')?.value;
    var repeatedPassword = this.recoveryForm.get('repeatedNewPassword')?.value;

    if (password != repeatedPassword) {
      this.confirmPasswordError = "The password conformation does not match";
      return
    }

    let newPasswordDTO: NewPasswordDTO = {
      newPassword: this.recoveryForm.get('newPassword')?.value,
      repeatedNewPassword: this.recoveryForm.get('repeatedNewPassword')?.value
    }
    alert(newPasswordDTO)
    this.authService.changePasswordRecovery(decodeURI(window.location.pathname.split("/")[2]), newPasswordDTO).subscribe((data: any) => {
      alert('success')
      this.recoveryForm.get('newPassword')?.setValue('')
      this.recoveryForm.get('repeatedNewPassword')?.setValue('')
    }, (err: Error) => {
      alert('failure')
      this.recoveryForm.get('newPassword')?.setValue('')
      this.recoveryForm.get('repeatedNewPassword')?.setValue('')
    })

    this.router.navigateByUrl('/login')
  }

  togglePass(id: string, toggleId: string) {
    var x = (document.getElementById(id) as HTMLInputElement);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    const elem = document.querySelector('#' + toggleId) as HTMLElement;
    elem.classList.toggle('bi-eye');
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}
