import React, {Component,PropTypes} from 'react';
import Button from './Button';
import {getCurrentBlockType,uploadImage,fileInput,insertImage,} from '../functions/editorMethods';


class LocalImageUpload extends Component {
    constructor(props) {
        super(props, ...arguments);
        this.state={
            fileInput : ''
        },

        this.getCurrentBlockType = getCurrentBlockType.bind(this);
        this.uploadImage = uploadImage.bind(this);
        this.fileInput = fileInput.bind(this);
        this.insertImage = insertImage.bind(this);
    }

    render() {
        let {label,editorState} = this.props;
        let blockType = this.getCurrentBlockType()

        return (
            <span>
                <input type="file" ref="fileInput" style={{display: 'none'}}
                       onChange={this.fileInput} />
                <Button
                    label= {label}
                    selected ={blockType}
                    onClick={this.uploadImage}
                />
            </span>
        );
    }
}

LocalImageUpload.propTypes = {
    editorState: PropTypes.object,
    label: PropTypes.string,
};

export default LocalImageUpload;


