import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmEW3kK8SYQp1g4vJUI7xXC6WwwpxXS_o",
  authDomain: "frikitrader-78a99.firebaseapp.com",
  projectId: "frikitrader-78a99",
  storageBucket: "frikitrader-78a99.firebasestorage.app",
  messagingSenderId: "561456214378",
  appId: "1:561456214378:web:c19e09a34d29ecdef7f513",
  measurementId: "G-72Y4V0CD8F"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
  ]
};
