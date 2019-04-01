import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Confirmacao } from './components/Confirmacao';
import { Landing } from './components/Landing'
import { Conferencia } from './components/Conferencia'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Layout>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route path='/conferencia' component={Conferencia} />
        <Route path='/confirmacao' component={Confirmacao} />
      </Layout>
    );
  }
}
