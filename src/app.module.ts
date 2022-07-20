import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TuitsModule } from './modules/tuits/tuits.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const configPostgre: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true
};

@Module({ imports: [ConfigModule.forRoot(), TuitsModule, PaymentsModule, TypeOrmModule.forRoot({ ...configPostgre })] })
export class AppModule { }
