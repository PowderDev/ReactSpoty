import React from 'react'
import UploadForm from '../../components/Upload/UploadForm'
import HOC from '../HOC'

function CreateUpdate() {
  return (
    <HOC>
      <UploadForm type='song' />
    </HOC>
  )
}

export default CreateUpdate
