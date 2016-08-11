import React, {Component, PropTypes} from 'react';

//import { MASTER_EDITOR } from '../lib/EditorToolbarConfig'; //not currently needed as this is not controlled by config
import {
    toggleLink,
    addImageLink,
    updateLinkInputValue,
    togglePopover,
    closePopoverOnResize,
    handleOnKeyPress,
} from '../functions/editorMethods';

import Button from './Button';
import styles from '../../assets/styles';

class LinkImagePopover extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showPopover: false,
            popoverBasis: {},
            inputRef: '',
        };

        this.toggleLink = toggleLink.bind(this);
        this.addImageLink = addImageLink.bind(this);
        this.updateLinkInputValue = updateLinkInputValue.bind(this);
        this.togglePopover = togglePopover.bind(this);

        this.closePopoverOnResize = closePopoverOnResize.bind(this);
        this.handleOnKeyPress = handleOnKeyPress.bind(this, this.addImageLink);
    }

    componentDidMount() {
        window.addEventListener('resize', this.closePopoverOnResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closePopoverOnResize);
    }

    renderPopover() {
        let {
            popoverLinkStyles,
            } = this.props;

        let {
            popoverBasis
            } = this.state;

        return (
            <div >
                <form
                    style={Object.assign({}, popoverBasis, popoverLinkStyles.popoverContainer, popoverLinkStyles.basePopoverContainer)}
                >
                    <div style={popoverLinkStyles.inner}>
                        <input
                            type="text"
                            placeholder="https://example.com/"
                            style={popoverLinkStyles.input}
                            value={this.state.inputRef}
                            onChange={this.updateLinkInputValue}
                            onKeyPress={this.handleOnKeyPress}
                        />

                        <span style={popoverLinkStyles.buttonGroup}>
                            <Button
                                label="Cancel"
                                iconName="cancel"
                                onClick={this.toggleLink}
                                passedButtonStyles={popoverLinkStyles.formButtons}
                            />
                            <Button
                                label="Submit"
                                iconName="accept"
                                type='submit'
                                onClick={this.addImageLink}
                                passedButtonStyles={popoverLinkStyles.formButtons}
                            />
                        </span>
                    </div>
                </form>
                <div style={popoverLinkStyles.basePopoverBackdrop} onClick={this.toggleLink}></div>
            </div>
        );
    }


    render() {
        let {label,popoverLinkStyles } = this.props;
        let renderPopover = (this.state.showPopover) ? this.renderPopover(): null;

        return (
                <div style={popoverLinkStyles.baseContainer}>

                    <div style={popoverLinkStyles.basePopoverTrigger}>
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
    popoverLinkStyles: Object.assign({}, styles.popoverLinkStyles, styles.baseStyles),
};

export default LinkImagePopover;
