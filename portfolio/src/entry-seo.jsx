import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';

export function render() {
  return renderToString(createElement(StaticRouter, { location: '/' }, createElement(Portfolio)));
}
