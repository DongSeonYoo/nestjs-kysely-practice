import { Global, Module } from '@nestjs/common';
import { Database } from './table';
import {
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
} from './database-definition';
import { DatabaseOptions } from './database-options';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      provide: Database,
      inject: [DATABASE_OPTIONS],
      useFactory: (dbOptions: DatabaseOptions) => {
        const dialect = new PostgresDialect({
          pool: new Pool({
            host: dbOptions.host,
            port: dbOptions.port,
            user: dbOptions.user,
            password: dbOptions.password,
            database: dbOptions.database,
          }),
        });

        return new Database({
          dialect,
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
