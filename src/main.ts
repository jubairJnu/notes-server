import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // Force port to be a number
  const port = Number(config.get('PORT') || 3001);

  if (isNaN(port)) {
    console.error('❌ Invalid PORT value in .env. Must be a number.');
    process.exit(1);
  }

  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(port);
  console.log(` Server running on http://localhost:${port}`);
}

bootstrap();
