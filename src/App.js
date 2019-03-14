import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Router, Route } from "react-router-dom";
import LoginComponent from './Components/LoginComponent'
import HomeComponent from './Components/HomeComponent'
import PollsComponent from './Components/PollsComponent'
import NavigationBar from './Components/NavigationBar'
import PollDetailsComponent from './Components/PollDetailsComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from './utils/history'

class App extends Component {

  render() {
    const { firebase } = this.props
    const { auth } = firebase
    const { isLoaded } = auth

    return (
        <Router history={history}>
          <div className="App">
            <ToastContainer />
            <NavigationBar />
            { (isLoaded && auth.uid) &&
              <div className="h-100 container">
                <Route path="/" exact component={HomeComponent} />
                <Route path="/polls" component={PollsComponent} />
                <Route path="/poll/:id" component={PollDetailsComponent} />
                <Route path="/login" component={LoginComponent} />
              </div> }
            { (isLoaded && !auth.uid) && <LoginComponent /> }
            { !isLoaded &&
              <div className="h-100 row align-items-center justify-content-center">
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          </div>
        </Router>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    firebase: state.firebase
  }
}

export default connect(mapStateToProps)(App)
