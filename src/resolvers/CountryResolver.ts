import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Country } from '../entities/Country';

@Resolver()
export class CountryResolver {
    @Mutation(() => Country)
    async createCountry(
        @Arg('code') code: string,
        @Arg('name') name: string,
        @Arg('emoji') emoji: string,
        @Arg('continent') continent: string,
    ): Promise<Country> {
        const country = Country.create({ code, name, emoji, continent });
        await country.save();
        return country;
    }

    @Query(() => [Country])
    countries() {
        return Country.find();
    }

    @Query(() => Country, { nullable: true })
    country(@Arg('code') code: string) {
        return Country.findOneBy({ code });
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg('continent') continent: string) {
        return Country.find({ where: { continent } });
    }
}