import React, {Component, PropTypes} from 'react';
import {IconAccept,
    IconBlockquote,
    IconBold,
    IconCancel,
    IconCode,
    IconItalic,
    IconLeftIndent,
    IconLink,
    IconOrderedList,
    IconRedo,
    IconRemoveLink,
    IconRightIndent,
    IconStrikethrough,
    IconUnderline,
    IconUndo,
    IconUnorderedList,
    IconColorFill,
    IconImage,
    IconLocalImage} from './rte-icons/icons'

import styles from '../../assets/styles';

class Button extends Component{

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

   onClick(event: Event) {
       event.preventDefault();
       this.props.onToggle(this.props.styles);
   }

   getStyles(){
       let styles={
           btnStyles: {
               display: 'inline-block',
               margin: '5px 5px 0 0',
               padding: '3px 8px',
               height: 30,
               lineHeight: 1.5,
               boxSizing: 'border-box',
               background: this.props.isActive? 'none #d8d8d8': '#ffffff',
               border: '1px solid #0585c8',
               borderRadius: 3,
               color: '#0585c8',
               textDecoration: 'none',
               fontSize: 13,
               fontFamily: '"Roboto Condensed",sans-serif',
               whiteSpace: ' nowrap',
               cursor: this.props.isDisabled ? 'not-allowed':'pointer',
               fontWeight: 400,
           },
           icon: {
               fill: '#0585c8',
               paddingRight: 5,
               paddingLeft: 5,
               opacity:this.props.isDisabled ? 0.5:'',
           },
        };
        return styles;
   }

   renderIcons(){
      let style=this.getStyles();
      let displayIcon= this.props.label ==='Bold'? <IconBold /> :
                      this.props.label ==='Monospace'? <IconCode /> :
                      this.props.label ==='Italic'? <IconItalic /> :
                      this.props.label ==='underline'? <IconUnderline /> :
                      this.props.label ==='Strikethrough'? <IconStrikethrough /> : 
                      this.props.label ==='LeftIndent'? <IconLeftIndent /> :
                      this.props.label ==='RightIndent'? <IconRightIndent /> :
                      this.props.label ==='OL'? <IconOrderedList /> : 
                      this.props.label==='UL'? <IconUnorderedList /> : 
                      this.props.label ==='Link'? <IconLink /> :
                      this.props.label ==='Remove Link'? <IconRemoveLink /> : 
                      this.props.label ==='Undo'? <IconUndo /> : 
                      this.props.label ==='Redo'? <IconRedo /> : 
                      this.props.label ==='Blockquote'? <IconBlockquote /> :
                      this.props.label ==='Color'? <IconColorFill /> : 
                      this.props.label ==='Cancel'? <IconCancel /> : 
                      this.props.label ==='Submit'? <IconAccept /> : 
                      this.props.label ==='Image'? <IconImage /> :
                      this.props.label ==='LocalImage'? <IconLocalImage /> :
                      '';

      return(
          <span style={style.icon}>{displayIcon}</span>
      );
   }

  render(){
      let{label,isActive,isDisabled,onClick,children}=this.props;
      let OnClick = !onClick ? this.onClick : onClick;
      let type = this.props.formSubmit ? 'submit' : 'button';
      let style=this.getStyles();

      return (
          <span>
              <button  title={label} type={type} customColor={this.props.customColor}  onClick={OnClick} style={style.btnStyles}>
                  {this.renderIcons()}
              </button>
              {children}
          </span>
      );
  }
};

Button.propTypes ={
  iconName: PropTypes.string,
  buttonStyles: PropTypes.object,
  styles: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  customColor: PropTypes.string,
  onToggle: PropTypes.func,
  focusOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps ={
    buttonStyles: styles.buttonStyles,
    isDisabled: false,
};

export default Button;