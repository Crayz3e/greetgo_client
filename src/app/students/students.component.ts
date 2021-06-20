import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../student'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  private router: ActivatedRoute
  students: Student[]
  login: String
  private routerr: Router
  form = this.formBuilder.group(
    {
      name: '',
      age: '',
      address: '',
      phoneNumber: '',
      login: ''
    }
  );

  constructor(private r: ActivatedRoute, private routerrrr: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
    this.router = r;
    this.routerr = routerrrr;
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(
      res => {
        let username = res['login'];
        this.login = username;
        this.form.patchValue({login: this.login});

        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        });
    
        let body = JSON.stringify({ 'login': username });
    
        this.http.post<[any]>('http://localhost:8080/students/', body, { headers: headers }).subscribe(
          res => {
            this.students = res;
          },
          err => alert("error"),
        );
      }
    );
  }

  deleteRow(id: number): void {
    let body = JSON.stringify({'login': this.login, 'id': id});

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    this.http.post<HttpStatusCode>('http://localhost:8080/students/delete/', body, {headers: headers}).subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  submit(): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    
    let body = JSON.stringify(this.form.getRawValue());

    this.http.post<HttpStatusCode>('http://localhost:8080/students/add/', body, { headers: headers }).subscribe(
      res => {
        this.ngOnInit();
      },
      err => alert(err.error),
      () => {}
    );
  }
}
