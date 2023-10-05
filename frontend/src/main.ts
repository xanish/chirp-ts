import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RefreshTokenInterceptor } from './app/modules/core/interceptors/refresh-token.interceptor';
import { InjectTokenInterceptor } from './app/modules/core/interceptors/inject-token.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule),
		provideHttpClient(
      withInterceptorsFromDi(),
    ),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InjectTokenInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RefreshTokenInterceptor,
			multi: true,
		},
		provideAnimations(),
		provideToastr({
			timeOut: 10000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
		}),
		provideRouter(AppRoutes)
	]
}).catch(err => console.error(err));
