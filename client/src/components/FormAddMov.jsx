import React, { useState } from 'react'
import { Button, Modal, Form, Row,Col } from 'react-bootstrap'
import { useMutation} from '@apollo/react-hooks'
import { ADD_MOVIE ,FETCH_MOVIES} from '../graphql/shemaMovies'


function FormAddMov(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setTags([])
  }
    ;
  const handleShow = () => setShow(true);
  
  const[title,setTitle]=useState('')
  const[popularity,setPopular]=useState('')
  const[poster_path,setUrl]=useState('')
  const[overview,setOverview]=useState('')
  const[tags,setTags]=useState([])
  const[tag,setTag]=useState('')
  
 


  const [addMovie] = useMutation(ADD_MOVIE,{
    refetchQueries: [{query:FETCH_MOVIES }]
  })


  const handleSubmit = () =>{
    addMovie({variables: {title,popularity: +popularity,poster_path,overview,tags: tags.toLowerCase()}})
    setTags([])
    setShow(false)
    
  }

  const handleTag = () => {
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
      <Button variant="primary" onClick={handleShow}>
        ADD MOVIE
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie </Modal.Title>
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

export default FormAddMov