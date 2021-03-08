import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SessionDashboard from './components/SessionDashboard';
import Navbar from './components/Navbar';
import Session from './components/Session';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <hr />

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/session/:code?">
                    <Session />
                </Route>
                <Route exact path="/session-dashboard">
                    <SessionDashboard />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
