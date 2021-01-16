import React from 'react';

import { useMutation } from '../../lib/api/useMutation';
import { useQuery } from '../../lib/api/useQuery';
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(
    LISTINGS_QUERY
  );

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListing, DeleteListingVariable>(
    DELETE_LISTING_MUTATION
  );

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });

    refetch();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <h2>Something went wrong, please try again later!</h2>;
  }

  return (
    <div>
      <h2>{title}</h2>

      <ul>
        {data?.listings?.map((listing) => (
          <div key={listing.id}>
            <li>
              {listing.title}
              <button onClick={() => handleDeleteListing(listing.id)}>
                Delete
              </button>
            </li>
          </div>
        ))}
      </ul>

      {deleteListingLoading && <h2>Deletion is in progress!</h2>}

      {deleteListingError && (
        <h2>Something went wrong, please try again later!</h2>
      )}
    </div>
  );
};

export default Listings;
