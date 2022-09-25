
import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { DefaultBodyType, PathParams, rest } from 'msw';
import { Movie } from '../types';


export const Genres = [
  'Horror',
  'Comedy',
  'Action',
  'Drama',
  'SciFi',
  'Documentary'
];

//capitalize string
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export function createRandomMovie() {
  return {
    genre: faker.helpers.shuffle(Genres)[0],
    rating: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
    director: `${faker.name.firstName()} ${faker.name.lastName()}`,
    title: `${capitalize(faker.hacker.noun().toString())} ${capitalize(faker.hacker.verb())}`,
    year: faker.date.past().getFullYear(),
    description: faker.lorem.paragraphs(2)  };
}


const modelDictionary = {
  movie: {
    id: primaryKey(faker.datatype.uuid),
    genre: () => faker.datatype.string(),
    rating: () => faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    director: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
    title: () => `${faker.hacker.noun()} ${faker.hacker.verb()}`,
    description: ()=> faker.lorem.paragraphs(2),
    year: () => faker.datatype.number({ min: 1950, max: 2022 }),
  },
};

const db = factory(modelDictionary);
export function seedDb() {
  for (var i = 0; i < 10; i++) {
    db.movie.create(createRandomMovie());
  }
}

export const handlers = [
  rest.get<DefaultBodyType, PathParams, Movie[]>(
    '/api/movies',
    (_req, res, ctx) => {
      return res(ctx.json(db.movie.getAll()));
    }
  ),
  rest.get<DefaultBodyType, PathParams, Movie | undefined>(
    '/api/movies/:id',
    (_req, res, ctx) => {
      const result = (db.movie.getAll().find(movie => movie.id === _req.params.id))
      return res(ctx.json(result));
    }
  ),
  rest.put<Omit<Movie, 'id'>, { id: string }, Movie>(
    '/api/movies/:id',
    (req, res, ctx) => {
      const updated = db.movie.update({
        where: { id: { equals: req.params.id } },
        data: req.body,
      });
      return res(ctx.delay(3000), ctx.json(updated!));
    }
  ),
]