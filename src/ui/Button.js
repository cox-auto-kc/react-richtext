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
    IconAttachment,
    IconColorPallete} from './rte-icons/icons'

import styles from '../assets/styles';

class Button extends Component{

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {

        this.props.onToggle(this.props.styles);
    }

    getStyles(){
        let styles={
            button: {
                background: this.props.isActive? 'none #d8d8d8': '#F3F3F3',
                cursor: this.props.isDisabled ? 'not-allowed':'pointer',
            },
            icon: {
                opacity:this.props.isDisabled ? 0.5:'',
            },
        };
        return styles;
    }

    renderIcons(){
        let {buttonStyles} = this.props;
        let thisStyle=this.getStyles();
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
                                                                                this.props.label ==='LocalImage'? <IconAttachment /> :
                                                                                    this.props.label ==='ColorFill'? <IconColorPallete />:
                                                                                        '';




        return(
            <span style={Object.assign({}, thisStyle.icon, buttonStyles.icon)}>{displayIcon}</span>
        );
    }

    render(){
        let{label, passedButtonStyles, buttonStyles,isActive,isDisabled,onClick,children}=this.props;

        let OnClick = isDisabled ?
            null: !onClick ? this.onClick :
            onClick;

        let type = this.props.formSubmit ? 'submit' : 'button';
        let thisStyle=this.getStyles();

        return (
            <span>
              <button
                  title={label}
                  type={type}
                  customColor={this.props.customColor}
                  onClick={OnClick}
                  style={Object.assign({}, thisStyle.button, buttonStyles.button, passedButtonStyles )}
              >
                  {this.renderIcons()}
              </button>
                {children}
          </span>
        );
    }
};

Button.propTypes ={
    iconName: PropTypes.string,
    passedButtonStyles: PropTypes.object,
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
    formSubmit: PropTypes.bool,
};

Button.defaultProps ={
    buttonStyles: styles.buttonStyles,
    isDisabled: false,
};

export default Button;

