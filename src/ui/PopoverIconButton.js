/* @flow */

import React, {Component} from 'react';
import InputPopover from './InputPopover';
import autobind from 'class-autobind';

type Props = {
  iconName: string;
showPopover: boolean,
    onTogglePopover: Function,
    onSubmit: Function;
};

export default class PopoverIconButton extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render(): React.Element {
    let {props} = this;
    console.log(this.props);
    return (
        <IconButton {...props} onClick={this.props.onTogglePopover}>
          {this._renderPopover()}
        </IconButton>
    );
  }

  _renderPopover() {

    if (!this.props.showPopover) {
      return null;
    }
    return (
        <InputPopover
            onSubmit={this._onSubmit}
            onCancel={this._hidePopover}
        />
    );
  }

  _onSubmit() {
    this.props.onSubmit(...arguments);
  }

  _hidePopover() {
    if (this.props.showPopover) {
      this.props.onTogglePopover(...arguments);
    }
  }
}
