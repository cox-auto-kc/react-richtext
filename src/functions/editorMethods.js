import React from 'react';
import ReactDOM from 'react-dom';
import {EditorState, Entity, RichUtils, Modifier, AtomicBlockUtils, Editor, ContentState} from 'draft-js';
import getEntityAtCursor from '../lib/getEntityAtCursor';
import clearEntityForRange from '../lib/clearEntityForRange';
import {ENTITY_TYPE} from 'draft-js-utils';
import {hasCommandModifier} from 'draft-js/lib/KeyBindingUtil';

export function getFuncName(fn) {
    let functionName = this[fn];
    return functionName;
}

export function getCurrentBlockType() {
    let {editorState} = this.props;
    let selection = editorState.getSelection();
    return editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
}

export function toggleInlineStyle(inlineStyle) {
    this.props.onChange(
        RichUtils.toggleInlineStyle(
            this.props.editorState,
            inlineStyle
        )
    );
}

export function toggleBlockType(blockType) {
    this.props.onChange(
        RichUtils.toggleBlockType(
            this.props.editorState,
            blockType
        )
    );
}

export function focusEditor() {
    // Hacky: Wait to focus the editor so we don't lose selection.
    /*
    setTimeout(() => {
        this.props.focusEditor();
    }, 50);*/
}

export function onKeypress(event, eventFlags) {
    // Catch cmd+k for use with link insertion.
    if (hasCommandModifier(event) && event.keyCode === 75) {
        // TODO: Ensure there is some text selected.
        this.setState({showLinkInput: true});
        this.setState({showColorInput: true});
        this.setState({showImageInput: true});
        eventFlags.wasHandled = true;
    }
}


export function setLink(url: string) {
    let {editorState} = this.props;
    let selection = editorState.getSelection();
    let entityKey = Entity.create(ENTITY_TYPE.LINK, 'MUTABLE', {url});
    this.setState({showLinkInput: false});
    this.props.onChange(
        RichUtils.toggleLink(editorState, selection, entityKey)
    );
    this._focusEditor();
}

export function removeLink() {
    let {editorState} = this.props;
    let entity = getEntityAtCursor(editorState);
    if (entity != null) {
        let {blockKey, startOffset, endOffset} = entity;
        this.props.onChange(
            clearEntityForRange(editorState, blockKey, startOffset, endOffset)
        );
    }
}

export function getEntity() {
    let {editorState} = this.props;
    let entity = getEntityAtCursor(editorState);
    return (entity == null) ? null : Entity.get(entity.entityKey);
}


export function toggleInlineColorsStyle(inlineStyle: string) {
    let {editorState} = this.props;
    this.setState({showColorInput: false});
    this.props.onChange( RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
        )
    );
    this._focusEditor();
}

export function undo() {
    let {editorState} = this.props;
    this.props.onChange(
        EditorState.undo(editorState)
    );
}

export function redo() {
    let {editorState} = this.props;
    this.props.onChange(
        EditorState.redo(editorState)
    );
}

export function addMedia(url: string) {
    let {editorState} = this.props;
    this.setState({showImageInput: false});
    const entityKey = Entity.create('atomic', 'IMMUTABLE', {src:url});
    this.props.onChange(AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    ));
}

export function toggleShowPopover(event: ?Object){
    console.log(this);
    let isShowing = this.state.showLinkInput;
    // If this is a hide request, decide if we should focus the editor.
    if (isShowing) {
        let shouldFocusEditor = true;
        if (event && event.type === 'click') {
            // TODO: Use a better way to get the editor root node.
            let editorRoot = ReactDOM.findDOMNode(this).parentNode;
            let {activeElement} = document;
            let wasClickAway = (activeElement == null || activeElement === document.body);
            if (!wasClickAway && !editorRoot.contains(activeElement)) {
                shouldFocusEditor = false;
            }
        }
        if (shouldFocusEditor) {
            this.props.focusEditor();
        }
    }
    this.setState({showLinkInput: !isShowing});
}









export function toggleshowColorInput(event: ?Object){
    let isShowing = this.state.showColorInput;
    if (isShowing) {
        let shouldFocusEditor = true;
        if (event && event.type === 'click') {
            // TODO: Use a better way to get the editor root node.
            let editorRoot = ReactDOM.findDOMNode(this).parentNode;
            let {activeElement} = document;
            let wasClickAway = (activeElement == null || activeElement === document.body);
            if (!wasClickAway && !editorRoot.contains(activeElement)) {
                shouldFocusEditor = false;
            }
        }
        if (shouldFocusEditor) {
            this.props.focusEditor();
        }
    }
    this.setState({showColorInput: !isShowing});
}

export function toggleshowImageInput(event: ?Object){
    let isShowing = this.state.showImageInput;
    if (isShowing) {
        let shouldFocusEditor = true;
        if (event && event.type === 'click') {
            // TODO: Use a better way to get the editor root node.
            let editorRoot = ReactDOM.findDOMNode(this).parentNode;
            let {activeElement} = document;
            let wasClickAway = (activeElement == null || activeElement === document.body);
            if (!wasClickAway && !editorRoot.contains(activeElement)) {
                shouldFocusEditor = false;
            }
        }
        if (shouldFocusEditor) {
            this.props.focusEditor();
        }
    }
    this.setState({showImageInput: !isShowing});
}

export function toggleShowLinkInput(event: ?Object) {
    let isShowing = this.state.showLinkInput;
    // If this is a hide request, decide if we should focus the editor.
    if (isShowing) {
        let shouldFocusEditor = true;
        if (event && event.type === 'click') {
            // TODO: Use a better way to get the editor root node.
            let editorRoot = ReactDOM.findDOMNode(this).parentNode;
            let {activeElement} = document;
            let wasClickAway = (activeElement == null || activeElement === document.body);
            if (!wasClickAway && !editorRoot.contains(activeElement)) {
                shouldFocusEditor = false;
            }
        }
        if (shouldFocusEditor) {
            this.props.focusEditor();
        }
    }
    this.setState({showLinkInput: !isShowing});
}


export function uploadImage(){
    this.refs.fileInput.click();
}

export function fileInput(e){
    const fileList = e.target.files;
    const file = fileList[0];
    this._insertImage(file);
}


export function insertImage(file) {
    let {editorState} = this.props;
    const entityKey = Entity.create('atomic', 'IMMUTABLE', {src: URL.createObjectURL(file)});
    this.props.onChange(AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    ));
}

