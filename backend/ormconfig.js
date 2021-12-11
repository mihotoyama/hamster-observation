module.exports = [
  {
    type: 'sqlite',
    database: 'data/dev.sqlite',
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/**/*.entity{.ts,.js}'],
    cli: {
      entitiesDir: 'src/**/*.entity.ts',
      migrationsDir: 'migrations',
    },
    synchronize: false,
  }
]