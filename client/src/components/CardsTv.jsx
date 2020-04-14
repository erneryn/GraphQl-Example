import React, { useEffect } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import {Col, Row, Card, ListGroup, ListGroupItem, Container, Button} from 'react-bootstrap'
import { FETCH_TVSERIES } from '../graphql/schemaTv'

import './css/card.css'
import { Link } from 'react-router-dom';

function Cards(){

  const { loading, error, data } =useQuery(FETCH_TVSERIES)



  if(loading) return <p>loading</p>
  if(error) return <p>error</p>
  
  return(
    <div >
      <Row className="mx-1">
        {
          data.tvseries.map((el, idx) =>
            <div key={idx} className="card m-2">
              <div className="poster"><img style={{ height: '100%' }} src={el.poster_path} />
              </div>
              <div className="details">
                <h2>{el.title}<br /></h2>

                <div className="rating my-2">
                <span>Ratings: <b style={{color:'yellow'}}>{el.popularity} </b></span>
                </div>

                <div className="tags">
                 {
                    el.tags && el.tags.map((ele,ix) => <span key={ix} className={ele}>{ele}</span>)
                  }
                </div>

                <div className="info">
                  <p>{el.overview.slice(0,170)}</p>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    marginBottom: '20px'
                  }}
                >
                  <Link to={`/detailtv/${el._id}`}>
                    <Button className="ml-0" variant="outline-info">Detail</Button>
                  </Link>

                </div>

              </div>
            </div>
          )
        }
      </Row>
    </div>
        )
  
}

export default Cards

{/*   
        <div className="star">
          <h4>Cast</h4>
          <ul>
            <li><img src="https://www.famousbirthdays.com/headshots/robert-downey-jr-2.jpg"></li>
            <li><img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU1MTM0NzA2NzQ3MTg4NDQw/chris-evans-arrives-at-the-los-angeles-premiere-of-captain-america-the-winter-soldier-held-at-the-el-capitan-theatre-on-march-13-2014-in-hollywood-california-photo-by-michael-tran_filmmagicjpg-square.jpg"></li>
            <li><img src="https://www.india-forums.com/images/celebrity/l_12804.jpg"></li>
            <li><img src="https://imageresizer.static9.net.au/LYRtJfSVUFCURsyAlx6qdMXJzwI=/400x0/http%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2Favengers300616Scarjo.jpg"></li>
            <li><img src="https://www.famousbirthdays.com/faces/boseman-chadwick-image.jpg"></li>
          </ul>
        </div> */}