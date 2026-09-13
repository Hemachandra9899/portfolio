import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { ProjectPage } from './pages/ProjectPage';
import { projects } from './data/portfolio';

export function render(location = '/') {
  if (location === '/ask') return '';
  const project = projects.find(item => location === `/projects/${item.slug}`);
  const page = project ? createElement(ProjectPage, { project }) : createElement(Portfolio);
  return renderToString(createElement(StaticRouter, { location }, page));
}
