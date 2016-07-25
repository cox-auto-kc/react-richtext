/* @flow */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

const colorsPopoverStyle={
    position:'absolute',
    top: 'calc(100% + 5px)',
    left: 0,
    width: '135px',
    height: '135px',
    background: 'none #fdfdfd',
    border: '1px solid #0585c8',
    borderRadius: '2px',
    boxSizing: 'border-box',
    paddingLeft: '6px',
    paddingTop:8,
};

type Props = {
    className?: string;
showPopover: boolean;
onTogglePopover: Function;
onSubmit: Function;
buttons: Object;
customColor: string;
};

export default class PopoverColors extends Component {
    props: Props;
    _inputRef: ?Object;

    constructor() {
        super(...arguments);
        //autobind(this);
    }

    render(): React.Element {
        let {props} = this;

        return (
            <Button {...props} onClick={this.props.onTogglePopover}>
        {this._renderPopover()}
    </Button>
    );
    }

    _renderPopover() {
        if (!this.props.showPopover) {
            return null;
        }
        let {props} = this;
        let {className,buttons,customColor, selectedKey } = props;

        return (
            <form style={Object.assign({},colorsPopoverStyle,{border:'1px solid'+ customColor})}>
    <div >
        <colorbox
        ref={this._setInputRef}
    />
    <span >
        {buttons }
        </span>
        </div>
        </form>
    );
    }
    _setInputRef(inputElement: Object) {
        this._inputRef = inputElement;
    }

    _hidePopover() {
        if (this.props.showPopover) {
            this.props.onTogglePopover(...arguments);
        }
    }
}
