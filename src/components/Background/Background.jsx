import React, { Component, PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames';
import styles from './Background.less';

class Background extends React.Component {
  render() {
    var img = require('./image/' + this.props.level0 + '.jpg');
    const backgroundCls = classnames({
      [styles.container]: !this.props.blur,
      [styles.container_blur]: this.props.blur,
    });
    return (
      <QueueAnim type={['right', 'left']}>
        <div
          className={backgroundCls}
          style={{
            background: "url("+img+")"
          }}
          key={this.props.level0} />
      </QueueAnim>
    );
  }
};

export default Background;
