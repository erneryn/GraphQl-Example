import gql from "graphql-tag";




export const FETCH_MOVIES=gql`
query {
    movies {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
}`

export const FIND_ONE_MOVIE =gql`
 query findOneMovie($_id: ID){
       findOneMovie(movieId: $_id){
         _id
        title
        popularity
        poster_path
        overview
        tags
       }
     }	
   `

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String
    $popularity: Float
    $poster_path: String
    $overview: String
    $tags: [String]
    ) {
    addMovie(title: $title,popularity: $popularity, poster_path: $poster_path, overview: $overview, tags:$tags){
      title
      popularity
      poster_path
      overview
      tags
    } 
  }`

  export const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID) {
    deleteMovie (movieId: $_id){
      title
    }
  }`
 
  export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $_id: ID
    $title: String
    $popularity: Float
    $poster_path: String
    $overview: String
    $tags: [String]
    ) {
    updateMovie(movieId: $_id,title: $title,popularity: $popularity, poster_path: $poster_path, overview: $overview, tags:$tags){
      title
      popularity
      poster_path
      overview
      tags
    } 
  }`
