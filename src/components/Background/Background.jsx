import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Background.less';

const img = require('./06.jpg');

class Background extends React.Component {
  render() {
    const backgroundCls = classnames({
      [styles.container]: !this.props.blur,
      [styles.container_blur]: this.props.blur,
    });
    return (
      <div
        className={backgroundCls}
        style={{
          background: "url("+img+")",
          backgroundSize: "cover"
        }}>
      </div>
    );
  }
};

export default Background;
