import { AppDataSource } from './src/app/database/data-source';
import 'reflect-metadata';

async function runMigrations() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
    
    await AppDataSource.runMigrations();
    console.log('Migrations executed successfully');
    
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();
