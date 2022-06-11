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
import { ActivatedRoute } from '@angular/router'
import * as zxcvbn from 'zxcvbn'

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  isSubmitted = false;
  passwordError = "";
  confirmPasswordError = "";
  tokenValid = false;
  passwordStrength = "";
  strengthClass = "";

  constructor(private router: Router, private authService: AuthenticationService, private route: ActivatedRoute) { }

  recoveryForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    repeatedNewPassword: new FormControl('', [Validators.required])
  })

  get f() { return this.recoveryForm.controls; }


  ngOnInit(): void {
    let token = decodeURI(this.route.snapshot.paramMap.get('token') || "")
    this.authService.checkToken(token).subscribe(
      (data: any) => {
        this.tokenValid = true;
      }, (err: Error) => {
        this.tokenValid = false;
      });
  }
  checkPass() {
    let password = this.recoveryForm.get('newPassword');
    if (!password?.valid) {
      this.passwordStrength = "";
      return
    }

    const result = zxcvbn(password?.value);
    let strength = "";
    switch (result.score) {
      case 0: { this.strengthClass = "alert alert-danger"; strength = "Worst"; break;}
      case 1: { this.strengthClass = "alert alert-danger"; strength = "Bad"; break;}
      case 2: {this.strengthClass = "alert alert-warning"; strength = "Weak"; break;}
      case 3: {this.strengthClass = "alert alert-info"; strength = "Good"; break;}
      default: {this.strengthClass = "alert alert-success"; strength = "Strong"; break;}
        
    }
    this.passwordStrength = "Strength: " + strength + " " + result.feedback.warning + ". " + result.feedback.suggestions;
  }

  changePassword() {
    this.isSubmitted = true;
    this.passwordError = "";
    this.confirmPasswordError = "";

    if (this.recoveryForm.invalid) {
      return
    }
    
    var password = this.recoveryForm.get('newPassword')?.value;

    const result = zxcvbn(password);

    if (result.score != 3 && result.score != 4) {
      return
    }

    var repeatedPassword = this.recoveryForm.get('repeatedNewPassword')?.value;

    if (password != repeatedPassword) {
      this.confirmPasswordError = "The password conformation does not match";
      return
    }

    let newPasswordDTO: NewPasswordDTO = {
      newPassword: this.recoveryForm.get('newPassword')?.value,
      repeatedNewPassword: this.recoveryForm.get('repeatedNewPassword')?.value
    }
    let token = decodeURI(this.route.snapshot.paramMap.get('token') || "")
    this.authService.changePasswordRecovery(token, newPasswordDTO).subscribe((data: any) => {
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
