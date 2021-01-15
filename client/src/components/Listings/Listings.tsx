import React from 'react';
import { server } from '../../lib/api/server';

import { DeleteListing, DeleteListingVariable, ListingsData } from './types';

const LISTINGS_QUERY = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING_MUTATION = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

const Listings = ({ title }: Props) => {
  const handleFetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: LISTINGS_QUERY,
    });

    console.log(data);
  };

  const handleDeleteListing = async () => {
    const { data } = await server.fetch<DeleteListing, DeleteListingVariable>({
      query: DELETE_LISTING_MUTATION,
      variables: {
        id: '6001b7af0cccb64321c6c753',
      },
    });

    console.log(data);
  };

  return (
    <div>
      <h2>{title}</h2>

      <button onClick={handleFetchListings}>Fetch Listings</button>
      <button onClick={handleDeleteListing}>Delete Listings</button>
    </div>
  );
};

export default Listings;
