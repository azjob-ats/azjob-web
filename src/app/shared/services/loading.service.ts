import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = signal(false);

  public start(): void {
    this.loading.set(true);
  }

  public stop(): void {
    this.loading.set(false);
  }
}
