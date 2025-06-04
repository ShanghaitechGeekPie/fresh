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

  componentDidMount() {
    this.loadMarkdown();
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.level0 !== prevProps.params.level0 || this.props.params.level1 !== prevProps.params.level1) {
      this.loadMarkdown();
    }
  }

  loadMarkdown() {
    this.setState({ loading: true, error: null });
    const markdownUrl = '/markdown/上海科技大学2025新生手册.md';

    fetch(markdownUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(markdownText => {
        const parseMdt = new parseMd(markdownText);
        const parsedData = parseMdt.render();
        this.setState({ data: parsedData, loading: false });
      })
      .catch(error => {
        console.error("Error fetching or parsing markdown:", error);
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
