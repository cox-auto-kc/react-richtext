import React, {Component, PropTypes} from 'react';

import { MASTER_EDITOR } from '../lib/EditorToolbarConfig';
import { getFuncName, getEntity, togglePopover, toggleColorsTrigger, toggleInlineColorsStyle, toggleFillColorsStyle, toggleshowColorInput } from '../functions/editorMethods';

import Button from './Button';

import styles from '../../assets/styles';


class ColorsButtonPopover extends Component {

    constructor(props){
        super(props);

        this.state ={
            showPopover: false,
            popoverKey: -1,
        };

        this.getFuncName = getFuncName.bind(this);
        this.getEntityAtCursor = getEntity.bind(this);
        this.togglePopover = togglePopover.bind(this);
        this.toggleColorsTrigger = toggleColorsTrigger.bind(this);
        this.toggleFillColorsStyle = toggleFillColorsStyle.bind(this);
        this.toggleInlineColorsStyle = toggleInlineColorsStyle.bind(this);
    }

    renderPopover(){
        let {
            popoverKey,
        } = this.state;
        let {
            popoverColorsSrc,
            popoverColorsStyles,
            customColor
        } = this.props;

        let popoverConfig = popoverColorsSrc[popoverKey];
        let renderColorsButtons = this.renderColorsButtons();
        let renderDisplayLabel = (popoverConfig.displayLabel != null) ?
                                <div style={popoverColorsStyles.basePopoverLabel}>
                                    {popoverConfig.displayLabel}
                                </div> :
                                null;

        return (
            <div>
                <div style={Object.assign({}, {borderColor: customColor}, popoverColorsStyles.popoverContainer)}>
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
                title={type.label}
                isActive={false}
                styles={type.style}
                onToggle={selectMethod}
                buttonStyles={Object.assign({}, {background: type.hex}, popoverColorsStyles.popoverColorButtons)}
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
            customColor
        } = this.props;

        let triggerButtons = popoverColorsSrc.map(function(v, key){
            let toggleMethod = self.getFuncName(v.changeMethod).bind(this, key);
            let renderPopover = (showPopover && popoverKey == key) ? self.renderPopover(): null;

            return(
                <div key={key} style={{position: 'relative', display: 'inline-block'}}>
                    <Button
                        label={v.label}
                        onToggle={toggleMethod}
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
    popoverColorsStyles: Object.assign({}, styles.baseStyles, styles.popoverColorsStyles),
};

export default ColorsButtonPopover;