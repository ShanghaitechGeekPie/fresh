import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Row, Col, Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './Content.less';

const img = require('./bg.jpg');

class Content extends React.Component {
  render() {
    function getContent(data, prefix) {
      var temp = "";
      var node = data.node;
      node.setAttribute('key', prefix + '_N');
      temp += node.outerHTML;
      for (var i in data.content) {
        var node = data.content[i];
        node.setAttribute('key', prefix + '_C_' + i);
        temp += node.outerHTML;
      }
      for (var i in data.__children)
        temp += getContent(data.__children[i], prefix + '_' + i);
      return temp;
    }
    const content = getContent(
      this.props.data.children[this.props.level0].children[this.props.level1],
      this.props.level0 + '_' + this.props.level1
    );

    const content2 = (this.props.level1 == '问答')?
      <iframe src="/comment.html" allowtransparency="true" className={styles.duoshuo} /> :
        undefined;

    return (
      <div className={styles.container}>
        <QueueAnim
          duration={[450, 200]}
          interval={[0, 0]}
          delay={[250, 0]}
          type={['bottom', 'bottom']}
          ease={['easeOutQuart', 'easeInOutQuart']}>
            <div
              className={styles.paper}
              style={{
                background: "url("+img+") repeat",
              }}
              key={this.props.level0 + '_' + this.props.level1}>
              <div
              dangerouslySetInnerHTML={{__html:content}} />
              {content2}
            </div>
        </QueueAnim>
      </div>
    );
  }
};

export default Content;
