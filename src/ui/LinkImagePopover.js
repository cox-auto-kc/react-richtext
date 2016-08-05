import React, {Component, PropTypes} from 'react';

//import { MASTER_EDITOR } from '../lib/EditorToolbarConfig'; //not currently needed as this is not controlled by config
import {
    togglePopover,
    addImageLink,
    toggleLink,
    updateLinkInputValue,
    handleOnKeyPress,
    getEntity,
} from '../functions/editorMethods';
import Button from './Button';
import styles from '../../assets/styles';

class LinkImagePopover extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showPopover: false,
            inputRef: '',
        };

        this.getEntity = getEntity.bind(this);
        this.togglePopover = togglePopover.bind(this);
        this.toggleLink = toggleLink.bind(this);
        this.addImageLink = addImageLink.bind(this);
        this.updateLinkInputValue = updateLinkInputValue.bind(this);
        this.handleOnKeyPress = handleOnKeyPress.bind(this, this.addImageLink);
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
                                onClick={this.addImageLink}
                                buttonStyles={popoverLinkStyles.formButtons}
                            />
                        </span>
                    </div>
                    <div style={popoverLinkStyles.basePopoverBackdrop} onClick={this.toggleLink}></div>
                </form>

            </div>
        );
    }

    render() {
        let {label,popoverLinkStyles } = this.props;
        let renderPopover = (this.state.showPopover) ? this.renderPopover(): null;

        return (
            <div style={popoverLinkStyles.baseContainer}>
                <div style={popoverLinkStyles.popoverButtonsWrap}>
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
