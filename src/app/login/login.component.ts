import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        login: '',
        password: ''
      }
    );
  }

  submit(): void {
    let username = this.form.get('login')?.value;

    if (username == null) return;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    
    let body = JSON.stringify(this.form.getRawValue());

    this.http.post<HttpStatusCode>('http://localhost:8080/api/login', body, { headers: headers }).subscribe(
      res => {
        if (res.toString() == "OK") this.router.navigate(['/students'], { queryParams: { 'login': username } })
        else if (res.toString() == "CONFLICT") alert("INCORRECT PASSWORD")
        else alert("USER NOT FOUND");
      },
      err => alert(err.error),
      () => {}
    );
  }
}
