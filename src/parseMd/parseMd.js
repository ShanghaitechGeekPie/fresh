class parseMd {
  constructor(markdownFile) {
    this.markdownFile = markdownFile;
  }
  render() {
    function parseHeader(index) {
      const headNode = container.childNodes[index];
      var node = {};
      node['tagName'] = headNode.tagName;
      node['name'] = headNode.innerHTML;
      node['node'] = headNode;
      node['content'] = [];
      node['children'] = {};
      node['__children'] = [];
      var i = index + 1;

      do{
        const pointNode = container.childNodes[i];
        if (pointNode.nodeName=='#text') i++;
        else if (header.test(pointNode.tagName)) {
          if (pointNode.tagName <= headNode.tagName) break;
          var returnData = parseHeader(i);
          i = returnData['index'];
          var tempnode = returnData['node'];
          node['children'][tempnode.name] = tempnode;
          node['__children'].push(tempnode);
        } else {
          node['content'].push(pointNode);
          i++;
        }
      }
      while (i < len);

      return {
        'node': node,
        'index': i
      };

    }

    var header=new RegExp('H[1-6]');

    var container=document.createElement("div");
    container.innerHTML = '<h0>ROOT</h0>' + this.markdownFile;

    var len = container.childNodes.length;

    var data = parseHeader(0).node;

    return data;
  }
};

export default parseMd;
