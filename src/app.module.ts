import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import appConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
        connectionFactory: (connection: Connection) => {
          connection.on('connected', () => {
            console.log('🟢 MongoDB connected');
          });

          connection.on('error', (error) => {
            console.error('🔴 MongoDB connection failed:', error);
          });

          connection.on('disconnected', () => {
            console.log('🟡 MongoDB disconnected');
          });

          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    NotesModule,
    AuthModule,
  ],
})
export class AppModule {}
