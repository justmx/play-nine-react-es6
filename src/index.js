// Code goes here
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Game from './components/Game';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

render(
  <Game />,
  document.getElementById('app')
);
