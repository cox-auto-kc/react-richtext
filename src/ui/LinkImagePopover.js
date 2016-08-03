import React, {Component, PropTypes} from 'react';

import { MASTER_EDITOR } from '../lib/EditorToolbarConfig';
import {
    togglePopover,
    addImageLink,
    toggleLink,
    removeLink,
    updateLinkInputValue,
    handleOnKeyPress,
    getEntity,
} from '../functions/editorMethods';
import styles from '../../assets/styles';
import Button from './Button';

class LinkImagePopover extends Component {
    constructor(props) {
        super(props, ...arguments);

        this.state ={
            showPopover: false,
            inputRef: '',
        };

        this.togglePopover = togglePopover.bind(this);
        this.addImageLink = addImageLink.bind(this);
        this.toggleLink = toggleLink.bind(this);
        this.updateLinkInputValue = updateLinkInputValue.bind(this);

        this.getEntity = getEntity.bind(this);
        this.handleOnKeyPress = handleOnKeyPress.bind(this);
    }

    renderPopover() {
        let { popoverLinkStyles } = this.props;

        return (
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
                            onClick={this.addImageLink}
                            buttonStyles={popoverLinkStyles.formButtons}
                        />
                    </span>
                </div>
            </form>
        );
    }

    render() {
        let {label,popoverLinkStyles } = this.props;
        let renderPopover = (this.state.showPopover) ? this.renderPopover(): null;

        let popoverBackdrop = (this.state.showPopover) ?
            <div style={popoverLinkStyles.basePopoverBackdrop} onClick={this.toggleLink}></div>:
            null;

        return (
            <div style={popoverLinkStyles.baseContainer}>
                <div style={popoverLinkStyles.popoverButtonsWrap}>
                    {popoverBackdrop}

                    <Button
                        label={label}
                        onClick={this.toggleLink}
                    >
                        {renderPopover}
                    </Button>
                </div>
                </div>
                );
             }
        }

                LinkImagePopover.propTypes = {
                popoverLinkStyles: PropTypes.object,
                editorState: PropTypes.object,
                label: PropTypes.string,
            };

                LinkImagePopover.defaultProps = {
                popoverLinkStyles: Object.assign({}, styles.baseStyles, styles.popoverLinkStyles),
            };

                export default LinkImagePopover;
