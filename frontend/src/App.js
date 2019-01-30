import React from 'react';

import Home from './Home';
import Screen from './Screen';
import Header from './Header';
import Footer from './Footer';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

const App = (() => {

  return (

    <Router>
      <div className="App">

        <Header />

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/series"
              render={() => <Screen name="Series" type="series" />}
            />
            <Route
              path="/movies"
              render={() => <Screen name="Movies" type="movie" />}
            />
            {/* when none of the above match, <NoMatch> will be rendered */}
            <Route component={Home} />
          </Switch>

        </main>

        <Footer />

      </div>
    </Router>

  );

});

export default App;
