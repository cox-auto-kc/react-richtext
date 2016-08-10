import React, {Component, PropTypes} from 'react';
import {CompositeDecorator, Editor, EditorState, Modifier, RichUtils, AtomicBlockUtils, ContentState} from 'draft-js';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import changeBlockDepth from '../lib/changeBlockDepth';
import changeBlockType from '../lib/changeBlockType';
import insertBlockAfter from '../lib/insertBlockAfter';
import isListItem from '../lib/isListItem';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import {BLOCK_TYPE} from 'draft-js-utils';
import styles from '../../assets/styles';
import styleMap from '../../assets/styleMap';
import {ContentBlock} from 'draft-js';
let richTextEditorStyles = styles.richTextEditorStyles;

export function shouldHidePlaceholder():boolean {
    let editorState = this.props.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            return true;
        }
    }
    return false;
}

export function handleReturn(event:Object):boolean {
    if (this._handleReturnSoftNewline(event)) {
        return true;
    }
    if (this._handleReturnEmptyListItem()) {
        return true;
    }
    if (this._handleReturnSpecialBlock()) {
        return true;
    }
    return false;
}

export function handleReturnSoftNewline(event:Object):boolean {
    let editorState = this.props.value.getEditorState();
    if (isSoftNewlineEvent(event)) {
        let selection = editorState.getSelection();
        if (selection.isCollapsed()) {
            onChange(RichUtils.insertSoftNewline(editorState));
        } else {
            let content = editorState.getCurrentContent();
            let newContent = Modifier.removeRange(content, selection, 'forward');
            let newSelection = newContent.getSelectionAfter();
            let block = newContent.getBlockForKey(newSelection.getStartKey());
            newContent = Modifier.insertText(
                newContent,
                newSelection,
                '\n',
                block.getInlineStyleAt(newSelection.getStartOffset()),
                null
            );
            onChange(
                EditorState.push(editorState, newContent, 'insert-fragment')
            );
        }
        return true;
    }
    return false;
}

// If the cursor is in an empty list item when return is pressed, then the
// block type should change to normal (end the list).
export function handleReturnEmptyListItem():boolean {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
        let contentState = editorState.getCurrentContent();
        let blockKey = selection.getStartKey();
        let block = contentState.getBlockForKey(blockKey);
        if (isListItem(block) && block.getLength() === 0) {
            let depth = block.getDepth();
            let newState = (depth === 0) ?
                changeBlockType(editorState, blockKey, BLOCK_TYPE.UNSTYLED) :
                changeBlockDepth(editorState, blockKey, depth - 1);
           onChange(newState);
            return true;
        }
    }
    return false;
}

// If the cursor is at the end of a special block (any block type other than
// normal or list item) when return is pressed, new block should be normal.
export function handleReturnSpecialBlock():boolean {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
        let contentState = editorState.getCurrentContent();
        let blockKey = selection.getStartKey();
        let block = contentState.getBlockForKey(blockKey);
        if (!isListItem(block) && block.getType() !== BLOCK_TYPE.UNSTYLED) {
            // If cursor is at end.
            if (block.getLength() === selection.getStartOffset()) {
                let newEditorState = insertBlockAfter(
                    editorState,
                    blockKey,
                    BLOCK_TYPE.UNSTYLED
                );
                onChange(newEditorState);
                return true;
            }
        }
    }
    return false;
}

export function onTab(event:Object) {
    let editorState = this.props.value.getEditorState.bind(this);
    let newEditorState = RichUtils.onTab(event, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
        onChange(newEditorState);
    }
}

export function customKeyHandler(event:Object):string {
    // Allow toolbar to catch key combinations.
    let eventFlags = {};
    this._keyEmitter.emit('keypress', event, eventFlags);
    if (eventFlags.wasHandled) {
        return null;
    } else {
        return getDefaultKeyBinding(event);
    }
}

export function handleKeyCommand(command:string):boolean {
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
       onChange(newEditorState);
        return true;
    } else {
        return false;
    }
}

export function onChange(editorState:EditorState) {
    let {onChange,value } = this.props;
    if (onChange != null) {
        let newValue = value.setEditorState(editorState);
        onChange(newValue);
    }
}

export function focus() {
    this.refs.editor.focus();
}

export function getBlockStyle(block: ContentBlock): string {
    let result = richTextEditorStyles.block;
    switch (block.getType()) {
        case 'unstyled':
            return (result, richTextEditorStyles.paragraph);
        case 'blockquote':
            return (result, richTextEditorStyles.blockquote);
        case 'code-block':
            return (result, richTextEditorStyles.codeBlock);
        default:
            return result;
    }
}


