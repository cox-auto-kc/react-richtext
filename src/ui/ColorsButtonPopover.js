import React, {Component, PropTypes} from 'react';

import { INLINE_TYPE_COLORDROPDOWN, MASTER_EDITOR } from '../lib/EditorToolbarConfig';
import { getFuncName, getEntity, togglePopover, toggleInlineColorsStyle, toggleshowColorInput } from '../functions/editorMethods';

import Button from './Button';

import styles from '../../assets/styles';


class ColorsButtonPopover extends Component {

    constructor(props){
        super(props);

        this.state ={
            showPopover: false
        };

        this.getFuncName = getFuncName.bind(this);
        this.getEntityAtCursor = getEntity.bind(this);
        this.togglePopover = togglePopover.bind(this);
        this.toggleInlineColorsStyle = toggleInlineColorsStyle.bind(this);
    }

    renderPopover(){
        let { popoverColorsStyles, customColor } = this.props;
        let renderColorsButtons = this.renderColorsButtons();

        return (
            <div style={Object.assign({}, {borderColor: customColor}, popoverColorsStyles.popoverContainer)}>
                <div style={popoverColorsStyles.popoverButtonWrap} >
                    {renderColorsButtons }
                </div>
            </div>
        )
    }

    renderColorsButtons(){
        let {
            popoverColorsSrc,
            popoverColorsStyles,
            editorState
            } = this.props;
        let colorsConfig = popoverColorsSrc[0].config;
        let selectMethod = this.getFuncName(popoverColorsSrc[0].selectMethod);

        let colorsButtons = colorsConfig.map((type, index) => (
            <Button
                key={index}
                title={type.label}
                isActive={false}
                styles={type.style}
                onToggle={selectMethod}
                buttonStyles={Object.assign({}, {background: type.hex}, popoverColorsStyles.popoverColorButtons)}
            />
        ));

        return colorsButtons;
    }

    render(){
        let {popoverColorsSrc, popoverColorsStyles, customColor} = this.props;

        let renderPopover = (this.state.showPopover)? this.renderPopover(): null;
        let toggleMethod = this.getFuncName(popoverColorsSrc[0].changeMethod);

        let popoverBackdrop = (this.state.showPopover) ?
            <div style={popoverColorsStyles.basePopoverBackdrop} onClick={this.togglePopover}></div>:
            null;


        return (
            <div style={popoverColorsStyles.baseContainer}>
                {popoverBackdrop}
                <Button
                    label={popoverColorsSrc[0].label}
                    iconName={popoverColorsSrc[0].iconName}
                    onToggle={toggleMethod}
                    customColor={customColor}
                >
                    {renderPopover}
                </Button>
            </div>
        );
    }
};

ColorsButtonPopover.PropTypes ={
    popoverColorsSrc: PropTypes.array,
    popoverColorsStyles: PropTypes.object,
    editorState: PropTypes.object,
    onChange: PropTypes.object,
    customColor: PropTypes.string,
};

ColorsButtonPopover.defaultProps = {
    //popoverColorsStyles: styles.popoverColorsStyles,
    popoverColorsStyles: Object.assign({}, styles.baseStyles, styles.popoverColorsStyles),
};

export default ColorsButtonPopover;