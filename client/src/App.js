import React from 'react';
import './App.css';

import client from '../src/graphql/graphql'
import { ApolloProvider} from "@apollo/react-hooks";

import Home from './pages/Home'
import Navbar from './components/NavbarComp'
import DetailTv from './components/DetailTv'
import DetailMovie from './components/DetailMovie'

import 'bootstrap/dist/css/bootstrap.min.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Movie from './pages/Movie';
import TvSeries from './pages/TvSeries'



function App() {
  return (
    <ApolloProvider client={client}>
     <Router>
      <Navbar/>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movies">
          <Movie/>
        </Route>
        <Route path="/tvseries">
          <TvSeries/>
        </Route>
          <Route path="/detailtv/:id">
          <DetailTv />
        </Route>
        <Route path="/detailmovie/:id">
          <DetailMovie />
        </Route>
        </Switch>
     </Router>
    </ApolloProvider>
  );
}

export default App;
