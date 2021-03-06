module.exports = [
  {
    type: 'sqlite',
    database: 'data/dev.sqlite',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/**/*.js'],
    cli: {
      entitiesDir: 'src/**/*.entity.ts',
      migrationsDir: 'migrations',
    },
    synchronize: false,
  }
]