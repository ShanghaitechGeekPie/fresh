import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import styles from './Footer.less';

class Footer extends React.Component {
  render() {
    return (
      <Row className={styles.container}>
        <Col span={6}>
          <h1>新生注册</h1>
        </Col>
        <Col span={6}>
          <h1>阅读指南</h1>
        </Col>
        <Col span={6}>
          <h1>了解学生会</h1>
        </Col>
        <Col span={6}>
          <h1>关于信息</h1>
        </Col>
      </Row>
    );
  }
};

export default Footer;
