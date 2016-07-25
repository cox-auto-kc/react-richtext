import React, {Component, PropTypes} from 'react';
import {IconExpandMore} from './rte-icons/icons';
import styles from '../../assets/styles';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let value: string = event.target.value;
    this.props.onChange(value);
  }

  renderChoices(){
    let {choices} = this.props;
    let entries = Array.from(choices.entries());
    return entries.map(([key, text]) => (
      <option
        key={key}
        value={key}
       >
            {text}
       </option>
    ));
  }

  render(){
    let {
        selectedKey,
        className,
        dropdownTitle,
        dropdownStyles,
    } = this.props;

    let renderChoices = this.renderChoices();

    return (
        <span className='dropdown' style={dropdownStyles.root} >
          <select
            value={selectedKey}
            onChange={this.onChange}
            style={dropdownStyles.select}
          >
            {renderChoices}
          </select>

          <span style={dropdownStyles.value} >
            {dropdownTitle}
            <span style={dropdownStyles.icon}>
              <IconExpandMore />
            </span>
          </span>
        </span>
  );
  }
}

Dropdown.propTypes = {
  choices: PropTypes.object,
  selectedKey: PropTypes.string,
  className: PropTypes.string,
  dropdownTitle: PropTypes.string,
  dropdownStyles: PropTypes.object,
};

Dropdown.defaultProps = {
  dropdownStyles: styles.dropdownStyles,
};

export default Dropdown;