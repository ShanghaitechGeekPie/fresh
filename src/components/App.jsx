import React, { Component, PropTypes } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import parseMd from '../parseMd/parseMd';
import NotFound from './NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  // 添加静态缓存，避免重复加载相同的Markdown文件
  static markdownCache = {
    data: null,
    loading: false,
    promise: null
  };

  componentDidMount() {
    this.loadMarkdown();
  }

  componentDidUpdate(prevProps) {
    // 只有在路由参数变化且需要显示不同内容时才重新加载
    if ((this.props.params.level0 !== prevProps.params.level0 || this.props.params.level1 !== prevProps.params.level1) && 
        !App.markdownCache.data) {
      this.loadMarkdown();
    }
  }

  loadMarkdown() {
    // 如果已经有缓存数据，直接使用
    if (App.markdownCache.data) {
      this.setState({ 
        data: App.markdownCache.data, 
        loading: false,
        error: null 
      });
      return;
    }

    // 如果正在加载，等待加载完成
    if (App.markdownCache.loading && App.markdownCache.promise) {
      App.markdownCache.promise.then(() => {
        this.setState({ 
          data: App.markdownCache.data, 
          loading: false,
          error: null 
        });
      }).catch(error => {
        this.setState({ error, loading: false });
      });
      return;
    }

    // 开始新的加载
    this.setState({ loading: true, error: null });
    const markdownUrl = '/markdown/上海科技大学2025新生手册.md';

    App.markdownCache.loading = true;
    App.markdownCache.promise = fetch(markdownUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(markdownText => {
        const parseMdt = new parseMd(markdownText);
        const parsedData = parseMdt.render();
        App.markdownCache.data = parsedData;
        App.markdownCache.loading = false;
        this.setState({ data: parsedData, loading: false });
      })
      .catch(error => {
        console.error("Error fetching or parsing markdown:", error);
        App.markdownCache.loading = false;
        this.setState({ error, loading: false });
      });
  }
  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Or a more sophisticated loader component
    }

    if (error) {
      return <div>Error loading content: {error.message}</div>;
    }

    if (!data) {
      return <NotFound />;
    }

    if (this.props.params.level0 && !(this.props.params.level0 in data.children)) {
      return <NotFound />;
    }

    if (this.props.params.level1 && 
        (!(this.props.params.level0 in data.children) || 
         !(this.props.params.level1 in data.children[this.props.params.level0].children))) {
      return <NotFound />;
    }

    return (
      <MainLayout data={data} level0={this.props.params.level0} level1={this.props.params.level1} />
    );
  }
};

export default App;
