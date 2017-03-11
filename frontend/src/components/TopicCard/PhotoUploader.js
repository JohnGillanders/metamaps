import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'

class PhotoUploader extends Component {
  handleFileUpload = (acceptedFiles, rejectedFiles) => {
    console.log("unimplemented")
    this.props.cancel()
  }

  render() {
    return (
      <div className="upload-photo">
        <Dropzone className="upload-photo-dropzone"
          onDrop={this.handleFileUpload}
        >
          Drag photo here <br />
          or click to upload
        </Dropzone>
        <div className="attachment-cancel" onClick={this.props.cancel} />
      </div>
    )
  }
}

PhotoUploader.propTypes = {
  updateTopic: PropTypes.func,
  cancel: PropTypes.func
}

export default PhotoUploader
