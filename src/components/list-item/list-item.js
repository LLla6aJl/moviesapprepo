import React, { Component } from 'react';

// eslint-disable-next-line import/no-cycle
import Item from '../item/item';

import './list-item.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class ListItem extends Component {
  render() {
    return (
      <ul className="item-list">
        <Item />
      </ul>
    );
  }
}
