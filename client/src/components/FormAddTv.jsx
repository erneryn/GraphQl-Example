import React, { useState } from 'react'
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import { useMutation} from '@apollo/react-hooks'
import { ADD_TVSERIES, FETCH_TVSERIES } from '../graphql/schemaTv'


function FormAddTv(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setTags([])
  };
  const handleShow = () => setShow(true);
  
  const[title,setTitle]=useState('')
  const[popularity,setPopular]=useState('')
  const[poster_path,setUrl]=useState('')
  const[overview,setOverview]=useState('')
  const[tags,setTags]=useState([])
  const[tag,setTag]=useState('')
  
  const[checked,setcheck]=useState({
    action: false,
    sciFi:false,
    comedy:false,
    horor:false
  })


  const [addtvSeries] = useMutation(ADD_TVSERIES,{
    refetchQueries: [{query:FETCH_TVSERIES }]
  })


  const handleSubmit = () =>{
    addtvSeries({variables: {title,popularity: +popularity,poster_path,overview,tags}})
    setTags([])
    setShow(false)
  }

  const handleTag = () =>{

    if(tag.length > 1){
      if(tags){
        if(!tags.find(el => el == tag )){
          setTags(tags.concat(tag))
        }
      } else {
        setTags([tag])
      }
    }
    setTag('')
  }

  const deleteTag = (name) => {
    const newTags = tags.filter(el => el !== name)
    setTags(newTags)
  }

  return (
    <>
      <Button style={{
        marginLeft:'10px'
      }} variant="primary" onClick={handleShow}>
        ADD TV SERIES
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tv Series </Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control 
            placeholder="movie title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Popularity</Form.Label>
            <Form.Control placeholder="Popularity" 
            value={popularity}
            onChange={e => setPopular(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Poster Url</Form.Label>
            <Form.Control placeholder="Poster Url" 
            value={poster_path}
            onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Overview</Form.Label>
            <Form.Control placeholder="movie title"
            value={overview}
            onChange={e => setOverview(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Row>
            <Col>
            <div style={{
              display:'flex',
              flexDirection:'row'
            }}>
            <Form.Control placeholder="tag" value={tag}
            onChange={e=> setTag(e.target.value)}
            />
            <Button className="mr-1"
            onClick={()=> handleTag() }
            >></Button>
            </div>
            
            </Col>
            <Col>
              <ul>
              {
                tags && tags.map((el,ix)=> <li key={ix}>{el} <Button className='ml-2' variant="outline-danger" 
                onClick={()=> deleteTag(el)}
                > x </Button></li>)
              }
              </ul>
              </Col>
              </Row>
          </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FormAddTv