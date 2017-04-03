import React, { Component } from 'react';
import PathMapContainer from './PathMapContainer/PathMapContainer';
import '../App.css';

export default class Map extends Component {
  render() {
    return (
      <article className="map">
        <PathMapContainer paths={this.props.paths} />
      </article>
    );
  }
}
