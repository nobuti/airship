import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import {
  Grid,
  Jumbo,
  Display,
  Title,
  Subheader,
  Text,
  Caption
} from '../src/components';

import css from '../styleguide/styles.css';

const pages = [
  { path: '/', title: 'Introduction', component: require('./introduction.md') },
  {
    title: 'Typography',
    pages: [
      {
        path: '/typography',
        title: 'How to',
        component: require('./typography.md')
      },
      {
        imports: {
          Jumbo: require('../src/components/Typography/jumbo.js')
        },
        path: '/components/jumbo',
        title: 'Jumbo',
        component: require('./components/jumbo.md')
      },
      {
        imports: {
          Display: require('../src/components/Typography/display.js')
        },
        path: '/components/display',
        title: 'Display',
        component: require('./components/display.md')
      },
      {
        imports: {
          Title: require('../src/components/Typography/title.js')
        },
        path: '/components/title',
        title: 'Title',
        component: require('./components/title.md')
      },
      {
        imports: {
          Subheader: require('../src/components/Typography/subheader.js')
        },
        path: '/components/subheader',
        title: 'SubHeader',
        component: require('./components/subheader.md')
      },
      {
        imports: {
          Text: require('../src/components/Typography/text.js')
        },
        path: '/components/text',
        title: 'Text',
        component: require('./components/text.md')
      },
      {
        imports: {
          Caption: require('../src/components/Typography/caption.js')
        },
        path: '/components/caption',
        title: 'Caption',
        component: require('./components/caption.md')
      }
    ]
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components',
        title: 'Introduction',
        component: require('./components.md')
      },
      {
        imports: {
          Grid: require('../src/components/Grid/grid.js')
        },
        path: '/components/grid',
        title: 'Grid',
        component: require('./components/grid.md')
      }
    ]
  }
];

ReactDOM.render(
  <Catalog title="Airship" pages={pages} />,
  document.getElementById('catalog')
);