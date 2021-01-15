import { IResolvers } from 'apollo-server-express';
import { listings } from '../listings';

export const resolvers: IResolvers = {
  Query: {
    listings: () => listings,
  },

  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i <= listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error('Failed to delete listing');
    },
  },
};
