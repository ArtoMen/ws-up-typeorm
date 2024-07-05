import { Module } from "ws-up";
import { DataSource, DataSourceOptions } from "typeorm";
import { InjectionToken } from "ws-up/DI";
import { ModuleWithProviders } from "ws-up/core/types";

const typeormConfigToken = new InjectionToken('TypeORMConfigToken');

@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async (config: DataSourceOptions) => {
        const dataSource = new DataSource(config);
        return dataSource.initialize().then((res) => {
          console.log('Database connected');
          return res;
        }).catch(err => {
          console.log('Error connection to database!');
          console.error(err);
        });
      },
      deps: [typeormConfigToken]
    }
  ],
  exports: [DataSource]
})
export class TypeOrmModule {
  static forRoot(config: DataSourceOptions): ModuleWithProviders {
    return {
      wsupModule: TypeOrmModule,
      providers: [
        {
          provide: typeormConfigToken,
          useValue: config
        }
      ]
    }
  }
}