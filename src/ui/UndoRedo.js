import React, {Component,PropTypes} from 'react';
import Button from './Button';
import {undo,redo,} from '../functions/editorMethods';
import styles from '../assets/styles';

class UndoRedo extends Component {
    constructor(props) {
        super(props, ...arguments);

        this.undo = undo.bind(this);
        this.redo = redo.bind(this);
    }

    render() {
        let {label} = this.props;
        let canUndo = this.props.editorState.getUndoStack().size !== 0;
        let canRedo = this.props.editorState.getRedoStack().size !== 0;
        return (
            <div style={styles.buttongroup}>
                <Button label={label} isDisabled={!canUndo} onClick={this.undo} focusOnClick={false} />

                <Button label="Redo" isDisabled={!canRedo} onClick={this.redo} focusOnClick={false}/>

            </div>
        );
    }
}

UndoRedo.propTypes = {
    editorState: PropTypes.object,
    label: PropTypes.string,
   };

export default UndoRedo;


