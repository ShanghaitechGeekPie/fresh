# fresh
上海科技大学新生生存手册

## Deploy

this project is using docker.

please read Dockerfile before you try to deploy it.

the most important script is 

```
cd fresh 
	&& npm install
	&& npm run build 
	&& mv dist/assets/index.html dist/ 
	&& rm -rf node_modules
```

## Node

### Environment

```
node >= 4
```

is needed and we suggest

```
node >= 6
```

### Code Style

https://github.com/airbnb/javascript

### Develop

make sure you have run `npm install` before developing. 

```
npm start
```

访问 http://127.0.0.1:8001

please remove line 52 ~ 57 in webpack.config.js and change path to relative path in src/entries/index.html before you start server.

### Build

```
npm run build
```

### Markdown

using markdown-it and parseMd

file is located at src/markdown

### How to update yearly 
- `src/entries/index.html` to change title
- `src/components/App.jsx` to change source file 
- `src/components/Header/Header.jsx` to change ` <div>上海科技大学<br /><b>新 生 手 册</b><br />- 2018 -<br /></div> ` and  `  All Rights Reserved · 2019<br />`
- **Remember** to pack a new branch named with 
