import React, {Component, PropTypes} from 'react';
//import { MASTER_EDITOR } from '../lib/EditorToolbarConfig'; //not currently needed as this is not controlled by config
import {ENTITY_TYPE} from 'draft-js-utils';
import {
    setLink,
    togglePopover,
    toggleLink,
    removeLink,
    updateLinkInputValue,
    handleOnKeyPress,
    getEntity,
} from '../functions/editorMethods';

import Button from './Button';
import styles from '../../assets/styles';

class LinkInputPopover extends Component {
    constructor(props) {
        super(props, ...arguments);

        this.state ={
            showPopover: false,
            inputRef: '',
        };

        this.togglePopover = togglePopover.bind(this);
        this.setLink = setLink.bind(this);
        this.toggleLink = toggleLink.bind(this);
        this.removeLink = removeLink.bind(this);
        this.updateLinkInputValue = updateLinkInputValue.bind(this);

        this.getEntity = getEntity.bind(this);
        this.handleOnKeyPress = handleOnKeyPress.bind(this, this.setLink);
    }

    renderPopover() {
        let { popoverLinkStyles } = this.props;

        return (
            <div>
                <form
                    style={Object.assign({},{border: '1px solid '+ this.props.customColor},popoverLinkStyles.popoverContainer)}

                >
                    <div style={popoverLinkStyles.inner}>
                        <input
                            type="text"
                            placeholder="https://example.com/"
                            style={Object.assign({},{border: '1px solid'+ this.props.customColor},popoverLinkStyles.input)}
                            value={this.state.inputRef}
                            onChange={this.updateLinkInputValue}
                            onKeyPress={this.handleOnKeyPress}
                        />

                       <span style={popoverLinkStyles.buttonGroup}>
                            <Button
                                label="Cancel"
                                iconName="cancel"
                                onClick={this.toggleLink}
                                buttonStyles={popoverLinkStyles.formButtons}
                            />
                            <Button
                                label="Submit"
                                iconName="accept"
                                type='submit'
                                onClick={this.setLink}
                                buttonStyles={popoverLinkStyles.formButtons}
                            />
                        </span>
                    </div>
                </form>
                <div style={popoverLinkStyles.basePopoverBackdrop} onClick={this.toggleLink}></div>
            </div>
        );
    }

    render() {
        let {
            popoverLinkStyles,
            label,
            entityLink
        } = this.props;

        let selection = this.props.editorState.getSelection();
        let hasSelection = !selection.isCollapsed();
        let entity = this.getEntity();
        let isCursorOnLink = (entity != null && entity.type === entityLink.LINK);
        let shouldShowLinkButton = hasSelection || isCursorOnLink;

        let renderPopover = (this.state.showPopover) ? this.renderPopover(): null;

        return (
            <div style={popoverLinkStyles.baseContainer}>

                <div style={popoverLinkStyles.popoverButtonsWrap}>
                    <Button
                        label={label}
                        isDisabled={!shouldShowLinkButton}
                        onClick={this.toggleLink}
                    >
                        {renderPopover}
                    </Button>
                </div>
                <div style={popoverLinkStyles.popoverButtonsWrap}>
                    <Button
                        label="Remove Link"
                        isDisabled={!isCursorOnLink}
                        onClick={this.removeLink}
                    />
                </div>
            </div>
        );
    }
}

LinkInputPopover.propTypes = {
    popoverLinkStyles: PropTypes.object,
    editorState: PropTypes.object,
    label: PropTypes.string,
    entityLink: PropTypes.object,
};

LinkInputPopover.defaultProps = {
    popoverLinkStyles: Object.assign({}, styles.baseStyles, styles.popoverLinkStyles),
    entityLink: ENTITY_TYPE,
};

export default LinkInputPopover;