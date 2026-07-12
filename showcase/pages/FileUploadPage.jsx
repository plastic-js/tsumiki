import { createSignal } from '@plastic-js/plastic'
import FileUpload, { FileUploadItemGroup, FileUploadItem, FileUploadClearTrigger } from '../../src/components/FileUpload.jsx'

function FileUploadPage(){
  const files = createSignal([])

  return () => (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>FileUpload</h1>
        <p className='hero-copy'>
          A drag-and-drop file upload zone with file list, delete
          triggers, and a clear button for batch operations.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Dropzone</p>
        <FileUpload onFilesChange={files} maxFiles={5} accept="image/*">
          <FileUploadItemGroup>
            {files().map(file => (
              <FileUploadItem file={file} key={file.name} />
            ))}
          </FileUploadItemGroup>
          <FileUploadClearTrigger />
        </FileUpload>
      </div>
    </div>
  )
}

export default FileUploadPage
