import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './Loader.less';

class Loader extends React.Component {
  render() {
    const content = (this.props.level0==undefined)?
      <h1>体验上科大 <Icon type='right' /></h1> :
      <h1>{this.props.data.children[this.props.level0].__children[0].name} <Icon type='right' /></h1>
    const path = (this.props.level0==undefined)?
      '/' + this.props.data.__children[0].name :
      '/' + this.props.data.children[this.props.level0].name + '/' + this.props.data.children[this.props.level0].__children[0].name;
    return (
      <QueueAnim className='demo-content'
          delay={[500, 0]}
          type={['right', 'right']}
          ease={['easeOutQuart', 'easeInQuart']}>
        <Link to={path} key={'L_'+this.props.level0}>
          <div className={styles.container}>
            {content}
          </div>
        </Link>
      </QueueAnim>
    );
  }
};

export default Loader;
