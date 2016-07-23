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
    const loader = (this.props.level1)?
      undefined :
      <Loader data={this.props.data} level0={this.props.level0} level1={this.props.level1}/>;
    const content = (this.props.level1)?
      <Content data={this.props.data} level0={this.props.level0} level1={this.props.level1} /> :
      undefined;
    return (
      <div className={styles.normal}>
        <Header data={this.props.data} level0={this.props.level0} level1={this.props.level1}/>
        {loader}
        {content}
        <Background level0={this.props.level0} />
        <Footer />
      </div>
    );
  }
};
export default MainLayout;
