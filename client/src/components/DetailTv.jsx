import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { FIND_ONE_TV, DELETE_TVSERIES, FETCH_TVSERIES} from '../graphql/schemaTv'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Container, Col, Row, Button } from 'react-bootstrap'
import EditTv from './EditTv'

function DetailTv() {
  const { id } = useParams()
  const history = useHistory()
  const { loading, error, data } = useQuery(FIND_ONE_TV, { variables: { _id: id } })
  const[deletetvSeries] = useMutation(DELETE_TVSERIES,{
    refetchQueries: [{query: FETCH_TVSERIES}]
  })

  if (loading) return <p>loading</p>
  if (error) return <p>error</p>

  const deleteTv = (id)=>{
    console.log(id)
    deletetvSeries({variables: {_id: id}})
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


            }} src={data.findOnetvSeries.poster_path} />
            </div>
          </Col>
          <Col sm={8}>
            <div style={{
              marginTop: '30px',
              marginBottom: '30px'
            }}>
              <h2>{data.findOnetvSeries.title}</h2>
              <ul>
                {
                  data.findOnetvSeries.tags.map((el,idx) => <li key={idx}>{el}</li>)
                }
              </ul>
            </div>
            <div>
              <p>{data.findOnetvSeries.overview}</p>
            </div>
            <div style={{
              position:'absolute',
              bottom:0,
              right:0,
              marginRight:'30px',
              marginBottom:'30px'
            }}>
              <Button variant='danger' style={{ marginRight:'40px'}} onClick={()=> deleteTv(data.findOnetvSeries._id)}>Delete</Button>
              <EditTv data={data.findOnetvSeries}/>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}

export default DetailTv