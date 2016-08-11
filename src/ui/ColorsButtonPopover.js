import React, {Component, PropTypes} from 'react';

import { MASTER_EDITOR } from '../lib/EditorToolbarConfig';
import {
    getFuncName,
    toggleColorsTrigger,
    toggleInlineColorsStyle,
    toggleFillColorsStyle,
    togglePopover,
    closePopoverOnResize
} from '../functions/editorMethods';

import Button from './Button';

import styles from '../../assets/styles';


class ColorsButtonPopover extends Component {

    constructor(props){
        super(props);

        this.state ={
            showPopover: false,
            popoverBasis: {'left': 0},
            popoverKey: -1,
        };

        this.getFuncName = getFuncName.bind(this);
        this.togglePopover = togglePopover.bind(this);


        this.toggleColorsTrigger = toggleColorsTrigger.bind(this);
        this.toggleFillColorsStyle = toggleFillColorsStyle.bind(this);
        this.toggleInlineColorsStyle = toggleInlineColorsStyle.bind(this);

        this.closePopoverOnResize = closePopoverOnResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.closePopoverOnResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closePopoverOnResize);
    }

    renderPopover(){
        let {
            popoverColorsSrc,
            popoverColorsStyles,
            customColor
        } = this.props;

        let {
            popoverBasis,
            popoverKey,
        } = this.state;

        let popoverConfig = popoverColorsSrc[popoverKey];
        let renderColorsButtons = this.renderColorsButtons();
        let renderDisplayLabel = (popoverConfig.displayLabel != null) ?
            <div style={popoverColorsStyles.basePopoverLabel}>
                {popoverConfig.displayLabel}
            </div> :
            null;

        return (
            <div>
                <div style={Object.assign({}, popoverBasis, {borderColor: customColor}, popoverColorsStyles.popoverContainer, popoverColorsStyles.basePopoverContainer )}>
                    {renderDisplayLabel}
                    <div style={popoverColorsStyles.basePopoverLabel}>
                        {renderColorsButtons }
                    </div>
                </div>
                <div style={popoverColorsStyles.basePopoverBackdrop} onClick={this.togglePopover}></div>
            </div>
        )
    }


    renderColorsButtons(){
        let {
            popoverKey
        } = this.state;
        let {
            popoverColorsSrc,
            popoverColorsStyles,
        } = this.props;

        let popoverConfig = popoverColorsSrc[popoverKey];
        let colorsConfig = popoverConfig.config;
        let selectMethod = this.getFuncName(popoverConfig.selectMethod);


        let colorsButtons = colorsConfig.map((type, index) => (
            <Button
                key={index}
                label={type.label}
                isActive={false}
                styles={type.style}
                onToggle={selectMethod}
                passedButtonStyles={Object.assign({}, {background: type.hex}, popoverColorsStyles.popoverColorButtons)}
            />
        ));
        return colorsButtons;
    }


    renderTriggerButtons(){
        let self = this;
        let {
            showPopover,
            popoverKey,
        } = this.state;
        let {
            popoverColorsSrc,
            popoverColorsStyles,
            customColor
        } = this.props;

        let triggerButtons = popoverColorsSrc.map(function(v, key){
            let toggleMethod = self.getFuncName(v.changeMethod).bind(this, key);

            let renderPopover = (showPopover && popoverKey == key) ? self.renderPopover(): null;

            return(
                <div key={key} style={popoverColorsStyles.basePopoverTrigger}>
                    <Button
                        label={v.label}
                        onClick={toggleMethod}
                        customColor={customColor}
                    />
                    {renderPopover}
                </div>
            );
        });
        return triggerButtons;
    }

    render(){
        let {
            popoverColorsStyles
        } = this.props;

        let triggerButtons = this.renderTriggerButtons();

        return (
            <div style={popoverColorsStyles.baseContainer}>
                <div>
                    {triggerButtons}
                </div>
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
    popoverColorsStyles: Object.assign({}, styles.popoverColorsStyles, styles.baseStyles),
};

export default ColorsButtonPopover;