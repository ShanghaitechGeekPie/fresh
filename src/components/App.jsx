import React, { Component, PropTypes } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import parseMd from '../parseMd/parseMd';
import NotFound from './NotFound';

const markdown = require('../markdown/上海科技大学2025新生手册.md')

var parseMdt = new parseMd(markdown);
var data = parseMdt.render();
console.log(data);
console.log("https://www.wjx.cn/vm/rtb6DmO.aspx");

class App extends React.Component {
  render() {
    if (this.props.level1)
      if (!((this.props.params.level0 in data.children) &&
        (this.props.params.level1 in data.children[this.props.params.level0].children)))
      return (
        <NotFound />
      );

    if (this.props.level0)
      if (!(this.props.params.level0 in data.children))
        return (
          <NotFound />
        );

    return (
        <MainLayout data={data} level0={this.props.params.level0} level1={this.props.params.level1} />
    );
  }
};

export default App;
