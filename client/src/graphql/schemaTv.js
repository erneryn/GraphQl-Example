import gql from "graphql-tag";

export const ALL_TVSERIES= gql`
{
  tvseries @client {
  _id
  title
  overview
  popularity
  poster_path
  tags
  }
}`


export const FETCH_TVSERIES=gql`
query {
    tvseries {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
}`

export const FIND_ONE_TV =gql`
 query findOnetvSeries($_id: ID){
       findOnetvSeries(tvId: $_id){
         _id
        title
        popularity
        poster_path
        overview
        tags
       }
     }	
   `

export const ADD_TVSERIES = gql`
  mutation addtvSeries(
    $title: String
    $popularity: Float
    $poster_path: String
    $overview: String
    $tags: [String]
    ) {
    addtvSeries(title: $title,popularity: $popularity, poster_path: $poster_path, overview: $overview, tags:$tags){
      title
      popularity
      poster_path
      overview
      tags
    } 
  }`

  export const DELETE_TVSERIES = gql`
  mutation deletetvSeries($_id: ID) {
    deletetvSeries (tvId: $_id){
      title
    }
  }`

  export const UPDATE_TVSERIES = gql`
  mutation updatetvSeries(
    $_id: ID
    $title: String
    $popularity: Float
    $poster_path: String
    $overview: String
    $tags: [String]
    ) {
    updatetvSeries(tvId:$_id,title: $title,popularity: $popularity, poster_path: $poster_path, overview: $overview, tags:$tags){
      
      title
      popularity
      poster_path
      overview
      tags
    } 
  }`
