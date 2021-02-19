import React, {Component} from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import PostPage from './pages/PostPage/PostPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/posts/:id" component={PostPage} />
              <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
