import React from 'react';
import { useFormik } from 'formik';
import { useLazyQuery, gql } from '@apollo/client';

import styles from './search.module.css';

const MOVIE_SEARCH = gql`
  query movieSearch($query: String!) {
    movies(query: $query) {
      id
      popularity
      image_url
    }
  }
`;

const SearchForm = () => {
  const [getMovies, { loading, data }] = useLazyQuery(MOVIE_SEARCH);

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: async ({ query }, actions) => {
      getMovies({ variables: { query } });
      
      actions.resetForm({ query: '' });
    }
  });

  if (loading) return <p>Searching...</p>;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='query'>Search query</label>
        <input
          id='query'
          name='query'
          type='text'
          placeholder='Search for a movie'
          onChange={formik.handleChange}
          value={formik.values.query}
        />
        <button type='submit'>Search</button>
      </form>

      <ul className={styles.movies}>
        {
          data?.movies.map(movie => {
            return (
              <li key={movie.id} className={styles.movies__item}>
                <div>
                  <img src={movie.image_url} />
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default SearchForm;
