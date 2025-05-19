import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwnedPasswordCheckerService {
  constructor(private http: HttpClient) {}

  //generate SHA-1 hash of the password
  sha1Hash(password: string): string {
    return CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
  }

  // Extract the first 5 characters of the hash
  getHashPrefix(hash: string): string {
    return hash.slice(0, 5);
  }

  // Extract the remaining characters of the hash
  getHashSuffix(hash: string): string {
    return hash.slice(5);
  }

  // Check if suffix exists in the response
  queryPwnedPassword(hashPrefix: string): Observable<string> {
    const url = `https://api.pwnedpasswords.com/range/${hashPrefix}`;
    return this.http.get(url, { responseType: 'text' });
  }

  // Check if the password is pwned
  isPasswordPwned(hashSuffix: string, response: string): boolean {
    const hashes = response.split('\n');
    return hashes.some((hash) => hash.startsWith(hashSuffix));
  }

  checkPassword(password: string): Observable<boolean | 'error'> {
    if (!password) return of(false);
    const hash = this.sha1Hash(password);
    const hashPrefix = this.getHashPrefix(hash);
    const hashSuffix = this.getHashSuffix(hash);
    return this.queryPwnedPassword(hashPrefix).pipe(
      map((response) => this.isPasswordPwned(hashSuffix, response)),
      catchError(() => of<'error'>('error')),
    );
  }
}
