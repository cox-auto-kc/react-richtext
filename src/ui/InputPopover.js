import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';



const styles={

  root: {
    position: 'relative',
    top: 'calc(100% + 5px)',
    left: 0,
    width: '287px',
    height: '45px',
    background: 'none #fdfdfd',
    background:'linear-gradient(to bottom, #fdfdfd 0%,#f6f7f8 100%)',
    border: '1px solid #0585c8',
    borderRadius:'3px',
    boxSizing: 'border-box',
    paddingTop: '6px',
//paddingRight:0,

  },

  inner:{
    display:'flex',
  },

  input: {
    display: 'block',
    flex: '1 0 auto',
    height: '30px',
    background: 'none white',
    border: '1px solid #999',
    borderRadius: '3px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: '24px',
    marginLeft: '10px',
    marginBottom: 0,
    marginRight: 8,

  },

  btngroup:{
    flex:'0 1 auto',
    marginLeft: '10px',
    marginBottom: 0,
    paddingRight: 0,
  },
};


class InputPopover extends Component {
  constructor() {
    super(...arguments);

  }

    componentDidMount() {
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('keydown', this._onDocumentKeydown);
    if (this.props._inputRef) {
      this.props._inputRef.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }

  render(): React.Element {
    let {props} = this;

    return (
        <form style={Object.assign({},styles.root,{border: '1px solid'+ this.props.customColor})} onSubmit={this.onSubmit}>
          <div style={styles.inner}>
            <input
                ref={this._setInputRef}
                type="text"
                placeholder="https://example.com/"
                style={styles.input}
            />
          <span style={styles.btngroup}>
            <Button
                label="Cancel"
                iconName="cancel"
                onClick={props.onCancel}
                customColor={this.props.customColor}
            />
           <Button
               label="Submit"
               iconName="accept"
               formSubmit={true}
               customColor={this.props.customColor}
           />
          </span>
          </div>
        </form>
    );
  }

  _setInputRef(inputElement: Object) {
    this.props._inputRef = inputElement;
  }

  _onSubmit(event: Object) {
    event.preventDefault();
    event.stopPropagation();
    let value = this.props._inputRef ? this.props._inputRef.value : '';
    this.props.onSubmit(value);
  }

  _onDocumentClick(event: Object) {
    let rootNode = ReactDOM.findDOMNode(this);
    if (!rootNode.contains(event.target)) {
      // Here we pass the event so the parent can manage focus.
      this.props.onCancel(event);
    }
  }

  _onDocumentKeydown(event: Object) {
    if (event.keyCode === 27) {
      this.props.onCancel();
    }
  }
}

InputPopover.propTypes = {

  className: PropTypes.string,
  showPopover: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  customColor: PropTypes.string,
  _inputRef:  PropTypes.object,

};


export default InputPopover;