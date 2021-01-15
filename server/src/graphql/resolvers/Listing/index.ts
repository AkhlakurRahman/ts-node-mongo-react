import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';

import { Database, Listing } from '../../../lib/types';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      /**
       * This returns everything from listings collection
       * return a collection
       * which converts to array which is done by .toArray() method
       */
      return await db.listings.find({}).toArray();
    },
  },

  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deletedListing = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deletedListing.value) {
        throw new Error('failed to delete listing');
      }

      return deletedListing.value;
    },
  },

  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
