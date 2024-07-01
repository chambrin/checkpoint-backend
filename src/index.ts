import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { Country } from './entities/Country';
import { CountryResolver } from './resolvers/CountryResolver';

const dataSource = new DataSource({
    type: 'sqlite',
    database: join(__dirname, '..', 'data', 'database.sqlite'),
    synchronize: true,
    logging: true,
    entities: [Country],
});

const initializeDatabase = async () => {
    await dataSource.initialize();
};

const startServer = async () => {
    await initializeDatabase();

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`Server ready at ${url}`);
};

startServer().then(r => r);