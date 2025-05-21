import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = signal(false);

  public start() {
    this.loading.set(true);
  }

  public stop() {
    this.loading.set(false);
  }
}
