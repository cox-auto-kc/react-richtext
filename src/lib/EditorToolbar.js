/* @flow */
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
    addMedia,
    toggleshowColorInput,
    toggleshowImageInput,
    uploadImage,
    fileInput,
    insertImage
} from '../functions/editorMethods';

import PopoverIconButton from '../ui/PopoverIconButton';
import PopoverColors from '../ui/ColorsPopover';

import BasicDropdowns from '../ui/BasicDropdowns';
import ToolbarButtons from './../ui/ToolbarButtons';
import Button from '../ui/Button';

//import getEntityAtCursor from './getEntityAtCursor';
//import clearEntityForRange from './clearEntityForRange';
import autobind from 'class-autobind';


// $FlowIssue - Flow doesn't understand CSS Modules

import type {EventEmitter} from 'events';

import styles from '../../assets/styles';
let editorToolbarStyles = styles.editorToolbarStyles;

type ChangeHandler = (state: EditorState) => any;

type Props = {
    editorState: EditorState;
keyEmitter: EventEmitter;
onChange: ChangeHandler;
focusEditor: Function;
customColor: string;
};

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
        this._addMedia = addMedia.bind(this);
        this._toggleshowColorInput = toggleshowColorInput.bind(this);
        this._toggleshowImageInput = toggleshowImageInput.bind(this);
        this._uploadImage = uploadImage.bind(this);
        this._fileInput = fileInput.bind(this);
        this._insertImage = insertImage.bind(this);
    }

    componentWillMount() {
        // Technically, we should also attach/detach event listeners when the
        // `keyEmitter` prop changes.
        // console.log(this.props.toolbarColor);
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
                {this._renderUndoRedo()}

                {this._renderlocalImages()}

            </div>
        );
    }

    _renderImages():React.Element {
        let blockType = this._getCurrentBlockType();
        return (
            <span>
                <PopoverIconButton
                    label="Image"
                    iconName="image"
                    showPopover={this.state.showImageInput}
                    onTogglePopover={this._toggleshowImageInput}
                    onSubmit={this._addMedia}
                    customColor={this.props.customColor}
                />
            </span>
        );
    }

    _renderlocalImages():React.Element {
        let blockType = this._getCurrentBlockType();
        return (
            <span>
                <input type="file" ref="fileInput" style={{display: 'none'}}
                       onChange={this._fileInput} />
                <Button
                    label="LocalImage"
                    iconName="localimage"
                    selected ={blockType}
                    onClick={this._uploadImage}
                    customColor={this.props.customColor}
                />
            </span>
        );
    }

    _renderColorButtons(): React.Element {
        let {editorState} = this.props;
        let selection = editorState.getSelection();
        let entity = this._getEntityAtCursor();
        let hasSelection = !selection.isCollapsed();
        let currentStyle = editorState.getCurrentInlineStyle();
        let buttons = INLINE_TYPE_COLORDROPDOWN.map((type, index) => (
            <Button
                key={String(index)}
                isActive={currentStyle.has(type.style)}
                label={type.label}
                onToggle={this._toggleInlineColorsStyle}
                styles={type.style}
                colors={true}
                customColor={this.props.customColor}
            />
        ));

        return (
            <span>
                <PopoverColors
                    label="Color"
                    iconName="color"
                    showPopover={this.state.showColorInput}
                    buttons={buttons}
                    onTogglePopover={this._toggleshowColorInput}
                    customColor={this.props.customColor}
                />
            </span>
        );
    }

    _renderLinkButtons(): React.Element {
        let {editorState} = this.props;
        let selection = editorState.getSelection();
        let entity = this._getEntityAtCursor();
        let hasSelection = !selection.isCollapsed();
        let isCursorOnLink = (entity != null && entity.type === ENTITY_TYPE.LINK);
        let shouldShowLinkButton = hasSelection || isCursorOnLink;
        return (
            <span>
                <PopoverIconButton
                    label="Link"
                    iconName="link"
                    isDisabled={!shouldShowLinkButton}
                    showPopover={this.state.showLinkInput}
                    onTogglePopover={this._toggleShowLinkInput}
                    onSubmit={this._setLink}
                    customColor={this.props.customColor}
                />
                <Button
                    label="Remove Link"
                    iconName="remove-link"
                    isDisabled={!isCursorOnLink}
                    onClick={this._removeLink}
                    focusOnClick={false}
                    customColor={this.props.customColor}
                />
            </span>
        );
    }

    _renderUndoRedo(): React.Element {
        let {editorState} = this.props;
        let canUndo = editorState.getUndoStack().size !== 0;
        let canRedo = editorState.getRedoStack().size !== 0;
        return (
            <span>
                <Button
                    label="Undo"
                    iconName="undo"
                    isDisabled={!canUndo}
                    onClick={this._undo}
                    focusOnClick={false}
                    customColor={this.props.customColor}
                />
                <Button
                    label="Redo"
                    iconName="redo"
                    isDisabled={!canRedo}
                    onClick={this._redo}
                    focusOnClick={false}
                    customColor={this.props.customColor}
                />
            </span>
        );
    }

}
