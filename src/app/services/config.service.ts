import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

interface Config {
  loginUrl: string;
  clientId: string;
  clientSecret: string;
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
      loginUrl: 'http://localhost:8080/oauth/token',
      clientId: 'xuanchuongdp',
      clientSecret: 'secret'
    };
    return of().toPromise();
  }
}
