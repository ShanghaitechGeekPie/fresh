import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Row, Col, Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './Content.less';
const $ = require('jQuery');

const img = require('./bg.jpg');
class Content extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    global.duoshuoQuery = {short_name:"shanghaitechzone"};
    $.getScript('http://static.duoshuo.com/embed.js',function(){
      el = React.findDOMNode(this.refs.myTextInput);
      DUOSHUO.EmbedThread(el);
    });
  }
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
      <div ref="myTextInput" className="ds-thread" data-thread-key="0" data-title="上海科技大学 新生手册" data-url="zone.geekpie.org"></div> :
        undefined;

    return (
      <div className={styles.container}>
        <QueueAnim
          delay={[500, 0]}
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
