import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import { MainLayout, Level0Layout, Level1Layout } from '../layouts/MainLayout/MainLayout';
import parseMd from '../parseMd/parseMd';
import NotFound from './NotFound';

const markdown = require('../markdown/上海科技大学2016新生手册.md')

var parseMdt = new parseMd(markdown);
var data = parseMdt.render();
console.log(data);

class App extends React.Component {
  render() {
    return (
      <MainLayout data={data} />
    );
  }
};

class Level0App extends React.Component {
  render() {
    if (this.props.params.level0 in data.children)
      return (
        <Level0Layout data={data} level0={this.props.params.level0} />
      );
    else
      return (
        <NotFound />
      );
  }
};

class Level1App extends React.Component {
  render() {
    if ((this.props.params.level0 in data.children) && (this.props.params.level1 in data.children[this.props.params.level0].children))
      return (
        <Level1Layout data={data} level0={this.props.params.level0} level1={this.props.params.level1} />
      );
    else
      return (
        <NotFound />
      );
  }
};

export default {
  'App': App,
  'Level0App': Level0App,
  'Level1App': Level1App,
};
