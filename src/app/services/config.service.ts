import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

interface Config {
  API_BASE: string,
  serverUrl: string,
  loginUrl: string;
  clientId: string;
  clientSecret: string;
  signinUrl: string;
}

export function configServiceInitializerFactory(config: ConfigService): Function {
  return () => config.load();
}

@Injectable()
export class ConfigService {

  config: Config;

  constructor(private http: HttpClient) { }

  load(): Promise<any> {
    this.config = {
      API_BASE: '/rest/api/v1/match',
      serverUrl: 'http://localhost:8080',
      loginUrl: 'http://localhost:8080/oauth/token',
      clientId: 'xuanchuongdp',
      clientSecret: 'secret',
      signinUrl: 'http://localhost:8080/rest/api/v1/user/create'
    };
    return of().toPromise();
  }
}
