import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleModule } from './api/article/article.module';

@Module({
  imports: [
    ArticleModule,
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRESQL_HOST') as string,
        port: configService.get('POSTGRESQL_PORT') as number,
        user: configService.get('POSTGRESQL_USER') as string,
        password: configService.get('POSTGRESQL_PASSWORD') as string,
        database: configService.get('POSTGRESQL_DATABASE') as string,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
