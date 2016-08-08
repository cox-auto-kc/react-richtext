import React, {Component, PropTypes} from 'react';
import {EditorState, Entity, RichUtils, Modifier, AtomicBlockUtils, Editor, ContentState} from 'draft-js';
import {
    MASTER_EDITOR,
} from './EditorToolbarConfig';

import LinkImagePopover from '../ui/LinkImagePopover';
import LinkInputPopover from '../ui/LinkInputPopover';
import ToolbarButtons from '../ui/ToolbarButtons';
import ColorsButtonPopover from '../ui/ColorsButtonPopover';
import BasicDropdowns from '../ui/BasicDropdowns';
import UndoRedo from '../ui/UndoRedo';
import LocalImageUpload from '../ui/LocalImageUpload';

import styles from '../../assets/styles';

export default class EditorToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let {editorToolbarStyles} = this.props;
        return (
            <div style={editorToolbarStyles.toolbarContainer}>
                <BasicDropdowns
                    basicDropdownSrc={MASTER_EDITOR.basicDropdowns}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
                <ColorsButtonPopover
                    popoverColorsSrc={MASTER_EDITOR.popoverColors}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
                <ToolbarButtons
                    buttonsSrc={MASTER_EDITOR.basicButtons}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
                <LinkInputPopover
                    label={"Link"}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
                <UndoRedo
                    label={"Undo"}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
                <LinkImagePopover
                    label={"Image"}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
                <LocalImageUpload
                    label={"LocalImage"}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

EditorToolbar.propTypes = {
    editorToolbarStyles: PropTypes.object,
    editorState: PropTypes.object,
    onChange: PropTypes.func,
};
EditorToolbar.defaultProps = {
    editorToolbarStyles: styles.editorToolbarStyles,
}