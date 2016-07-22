import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Row, Col, Button, Icon } from 'antd';
import styles from './Header.less';

const logo = require('./logo.png');

class Header extends React.Component {
  render() {
    var menu = [];
    var menu1 = [];

    for (var i in this.props.data.children)
      menu.push(
        <Link to={'/'+this.props.data.children[i].name}
          activeClassName={styles.active}>
          <li dangerouslySetInnerHTML={{__html:this.props.data.children[i].name}} />
        </Link>
      )
    if (this.props.level0!=undefined) {
        const dataSet = this.props.data.children[this.props.level0].children;
        for (var i in dataSet)
          menu1.push(
            <Link to={'/'+this.props.level0+'/'+dataSet[i].name}
              activeClassName={styles.active}>
              <li dangerouslySetInnerHTML={{__html:dataSet[i].name}} />
            </Link>)
    }

    const level0ContainerCls = classnames({
      [styles.level0_container]: true,
      [styles.level0_container_thin]: (this.props.level0!=undefined),
    });

    const headerContent = (this.props.level0==undefined)?
      <div>上海科技大学<br /><b>新 生 手 册</b><br />- 2016 -<br /></div> :
      <div><b>新<br />生<br />手<br />册</b></div>;

    const level1ContainerCls = classnames({
      [styles.level1_container]: (this.props.level0!=undefined),
    });

    const level1Container = (this.props.level0!=undefined)?
      <Row className={level1ContainerCls}>
        <Col span={24} className={styles.logo_container}>
          <Link to={'/'+this.props.level0}>
            {this.props.level0}
          </Link>
        </Col>
        <Col span={24} className={styles.menu_container}>
          <ul>
            {menu1}
          </ul>
        </Col>
      </Row> : undefined;

    return (
      <div>
        <Row className={level0ContainerCls}>
          <Col span={24} className={styles.logo_container}>
            <Link to='/'>
              <img src={logo} /><br />
              {headerContent}
            </Link>
          </Col>
          <Col span={24} className={styles.menu_container}>
            <ul>
              {menu}
            </ul>
          </Col>
          <Col span={24} className={styles.info_container}>
            © 上海科技大学 迎新网<br />
            All Rights Reserved · 2016<br />
          </Col>
        </Row>
        {level1Container}
      </div>
    );
  }
};

export default Header;
