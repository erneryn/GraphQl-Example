import React from 'react'
import { useHistory , useParams } from 'react-router-dom'

import { FIND_ONE_MOVIE, DELETE_MOVIE,FETCH_MOVIES} from '../graphql/shemaMovies'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Container, Col, Row, Button } from 'react-bootstrap'
import EditMov from './EditMov'

function DetailMovie(props) {
  const { id } = useParams()
  const history = useHistory()
  const { loading, error, data } = useQuery(FIND_ONE_MOVIE, { variables: { _id: id } })
  const [deleteMovie] = useMutation(DELETE_MOVIE,{
      refetchQueries: [{query:FETCH_MOVIES }]})

  if (loading) return <p>loading</p>
  if (error) return <p>error</p>
  
  const deleteOne = (id) =>{
    deleteMovie({variables: {_id: id}})
    history.push('/')
  }

  return (
    <Container>
      
      <Row>
        <Row style={{
          width: '70%',
          backgroundColor: 'rgba(160, 160, 160, 0.2)',
          borderRadius:'20px'
        }}
          className="mx-auto"
        >
          <Col sm={4}>
            <div><img style={{
              height: '100%',
              width: '250px',
              position: 'relative',
              marginLeft: '-50px',
              marginTop: '100px',
              marginBottom: '100px'


            }} src={data.findOneMovie.poster_path} />
            </div>
          </Col>
          <Col sm={8}>
            <div style={{
              marginTop: '30px',
              marginBottom: '30px'
            }}>
              <h2>{data.findOneMovie.title}</h2>
              <ul>
                {
                  data.findOneMovie.tags && data.findOneMovie.tags.map((el,idx) => <li key={idx}>{el}</li>)
                }
              </ul>
            </div>
            <div>
              <p>{data.findOneMovie.overview}</p>
            </div>
            <div style={{
              position:'absolute',
              bottom:0,
              right:0,
              marginRight:'30px',
              marginBottom:'30px',
            }}>
              <Button variant='danger' style={{ marginRight:'40px'}}
              onClick={()=> deleteOne(data.findOneMovie._id)}
              >Delete</Button>
              <EditMov data={data.findOneMovie}/>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}

export default DetailMovie