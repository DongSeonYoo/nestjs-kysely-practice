import * as path from 'path';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

async function migrateToLatest() {
  const database = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: configService.get('POSTGRESQL_HOST') as string,
        port: configService.get('POSTGRESQL_PORT') as number,
        user: configService.get('POSTGRESQL_USER') as string,
        password: configService.get('POSTGRESQL_PASSWORD') as string,
        database: configService.get('POSTGRESQL_DATABASE') as string,
      }),
    }),
  });

  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();
  results?.forEach((migrationResult) => {
    if (migrationResult.status === 'Success') {
      console.log(
        `migration "${migrationResult.migrationName}" was executed successfully`,
      );
    } else if (migrationResult.status === 'Error') {
      console.error(
        `failed to execute migration "${migrationResult.migrationName}"`,
      );
    }
  });

  if (error) {
    console.error('Failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await database.destroy();
}

migrateToLatest();
