import MarkdownIt from 'markdown-it';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';

class parseMd {
  constructor(markdownText) {
    this.markdownText = markdownText;
    this.md = new MarkdownIt({
      html: true, // Enable HTML tags in source
      xhtmlOut: false, // Use '/' to close single tags (<br />).
      breaks: false, // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-', // CSS language prefix for fenced blocks.
      linkify: true, // Autoconvert URL-like text to links
      typographer: true, // Enable some language-neutral replacement + quotes beautification
    }).use(subscript).use(superscript);
  }

  render() {
    const htmlContent = this.md.render(this.markdownText);
    
    // The following DOM parsing logic needs to be adapted or replaced
    // if it's critical to the application's structure.
    // For now, we'll create a temporary DOM element in memory to parse the HTML.
    // This might not be ideal for server-side rendering or non-browser environments.
    let container;
    if (typeof document !== 'undefined') {
        container = document.createElement("div");
    } else {
        // Basic fallback for non-browser environments (e.g., during build if still used there)
        // This part might need a more robust solution like jsdom if complex DOM manipulation is needed.
        console.warn('document is not defined. DOM parsing in parseMd might not work as expected.');
        // A very simplified container for environments without DOM
        return { name: 'ROOT', children: {}, __children: [], content: [{ outerHTML: htmlContent }] }; 
    }

    container.innerHTML = '<h0>ROOT</h0>' + htmlContent; // Add a root element for parsing

    function parseHeader(index, parentContainer) {
      const headNode = parentContainer.childNodes[index];
      if (!headNode) return { node: null, index: index + 1 }; // Should not happen with proper HTML

      var node = {};
      node['tagName'] = headNode.tagName;
      // Ensure innerHTML exists and is a string, otherwise use textContent or a default
      node['name'] = typeof headNode.innerHTML === 'string' ? headNode.innerHTML.trim() : (headNode.textContent || '').trim();
      node['node'] = headNode; // Storing the actual DOM node might be problematic if this runs in a non-DOM env
      node['content'] = [];
      node['children'] = {};
      node['__children'] = [];
      var i = index + 1;
      const len = parentContainer.childNodes.length;
      const headerRegex = /^H[1-6]$/i;

      while (i < len) {
        const pointNode = parentContainer.childNodes[i];
        if (!pointNode) { i++; continue; } // Skip if undefined

        if (pointNode.nodeType === Node.TEXT_NODE && !pointNode.textContent.trim()) { // Text node, check if whitespace
            i++;
            continue;
        }
        
        if (pointNode.nodeType === Node.ELEMENT_NODE && headerRegex.test(pointNode.tagName)) { // Element node and is a header
          if (parseInt(pointNode.tagName.substring(1)) <= parseInt(headNode.tagName.substring(1))) {
            break; // Current header is higher or same level, so it's a sibling or parent
          }
          var returnData = parseHeader(i, parentContainer);
          i = returnData['index'];
          var tempnode = returnData['node'];
          if (tempnode && tempnode.name) { // Ensure tempnode and its name are valid
            node['children'][tempnode.name] = tempnode;
            node['__children'].push(tempnode);
          }
        } else if (pointNode.nodeType === Node.ELEMENT_NODE || (pointNode.nodeType === Node.TEXT_NODE && pointNode.textContent.trim())) {
          node['content'].push(pointNode);
          i++;
        } else {
          i++; // Skip other node types or empty text nodes
        }
      }
      return {
        'node': node,
        'index': i
      };
    }

    var data = parseHeader(0, container).node;
    return data;
  }
};

export default parseMd;
