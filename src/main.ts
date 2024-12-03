import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Bỏ qua kiểm tra SSL
