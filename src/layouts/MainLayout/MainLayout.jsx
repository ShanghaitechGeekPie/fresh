import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Row, Col, Card, Icon } from 'antd';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import Loader from '../../components/Loader/Loader';
import Footer from '../../components/Footer/Footer';
import Background from '../../components/Background/Background';
import styles from './MainLayout.less';

class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <Header data={this.props.data} level0={this.props.level0} />
        <Loader data={this.props.data} />
        <Background />
        <Footer />
      </div>
    );
  }
};

class Level0Layout extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <Header data={this.props.data} level0={this.props.level0} />
        <Loader data={this.props.data} level0={this.props.level0} />
        <Background />
        <Footer />
      </div>
    );
  }
};

class Level1Layout extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <Header data={this.props.data} level0={this.props.level0} level1={this.props.level1}/>
        <Content data={this.props.data} level0={this.props.level0} level1={this.props.level1} />
        <Background />
        <Footer />
      </div>
    );
  }
};

export default {
  'MainLayout': MainLayout,
  'Level0Layout': Level0Layout,
  'Level1Layout': Level1Layout,
};
