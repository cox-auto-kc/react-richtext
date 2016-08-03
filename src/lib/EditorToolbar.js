import {hasCommandModifier} from 'draft-js/lib/KeyBindingUtil';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {EditorState, Entity, RichUtils, Modifier, AtomicBlockUtils, Editor, ContentState} from 'draft-js';
import {ENTITY_TYPE} from 'draft-js-utils';
import {
    INLINE_STYLE_BUTTONS,
    BLOCK_TYPE_BUTTONS,
    INLINE_TYPE_COLORDROPDOWN,
    MASTER_EDITOR,
} from './EditorToolbarConfig';

import {
    getFuncName,
    togglePopover,
    getCurrentBlockType,
    toggleBlockType,
    toggleInlineStyle,
    focusEditor,
    onKeypress,
    toggleShowLinkInput,
    setLink,
    removeLink,
    getEntity,
    toggleInlineColorsStyle,
    undo,
    redo,
    addImageLink,
    toggleshowColorInput,
    toggleshowImageInput,
    uploadImage,
    fileInput,
    insertImage
} from '../functions/editorMethods';

import LinkImagePopover from '../ui/LinkImagePopover';
import LinkInputPopover from '../ui/LinkInputPopover';
import ToolbarButtons from '../ui/ToolbarButtons';
import ColorsButtonPopover from '../ui/ColorsButtonPopover';
import BasicDropdowns from '../ui/BasicDropdowns';
import Button from '../ui/Button';
import UndoRedo from '../ui/UndoRedo';
import LocalImageUpload from '../ui/LocalImageUpload';
import autobind from 'class-autobind';
import {EventEmitter} from 'events';
import styles from '../../assets/styles';

let editorToolbarStyles = styles.editorToolbarStyles;


export default class EditorToolbar extends Component {
    props: Props;

    constructor() {
        super(...arguments);
        autobind(this);
        this.state = {
            showLinkInput: false,
            showColorInput: false,
            showImageInput: false,
        };
        this.fileInput = (e) => this._fileInput(e);
        this._getFuncName = getFuncName.bind(this);
        this._togglePopover = togglePopover.bind(this);
        this._getCurrentBlockType = getCurrentBlockType.bind(this);
        this._toggleBlockType = toggleBlockType.bind(this);
        this._toggleInlineStyle = toggleInlineStyle.bind(this);
        this._focusEditor = focusEditor.bind(this);
        this._onKeypress = onKeypress.bind(this);
        this._toggleShowLinkInput = toggleShowLinkInput.bind(this);
        this._setLink = setLink.bind(this);
        this._removeLink = removeLink.bind(this);
        this._getEntityAtCursor = getEntity.bind(this);
        this._toggleInlineColorsStyle = toggleInlineColorsStyle.bind(this);
        this._undo = undo.bind(this);
        this._redo = redo.bind(this);
        this._addImageLink = addImageLink.bind(this);
        this._toggleshowColorInput = toggleshowColorInput.bind(this);
        this._toggleshowImageInput = toggleshowImageInput.bind(this);
        this._uploadImage = uploadImage.bind(this);
        this._fileInput = fileInput.bind(this);
        this._insertImage = insertImage.bind(this);
    }

    componentWillMount() {
        // Technically, we should also attach/detach event listeners when the
        // `keyEmitter` prop changes.
       this.props.keyEmitter.on('keypress', this._onKeypress);
    }

    componentWillUnmount() {
        this.props.keyEmitter.removeListener('keypress', this._onKeypress);
    }

    render(): React.Element {
        return (
            <div style={editorToolbarStyles.toolbarContainer}>

                <BasicDropdowns
                    basicDropdownSrc={MASTER_EDITOR.basicDropdowns}
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
                    entityLink = {ENTITY_TYPE}
                    onChange={this.props.onChange}
                />

                <ColorsButtonPopover
                    popoverColorsSrc={MASTER_EDITOR.popoverColors}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />

                <LinkImagePopover
                    label={"Image"}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                />

                <UndoRedo
                    label={"Undo"}
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
    keyEmitter : PropTypes.object,
    onChange: PropTypes.func,
    focusEditor: PropTypes.func,
};