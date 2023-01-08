const PROD_URL = "https://movies-app-marko2407.koyeb.app/graphql";

const GET_MOVIES_QUERY = `query GetAllMoviesQuery {
  movies {
    _id
    title
    description
    img
    url
    duration
    releaseDate
    rating
    category
  }
}`;
