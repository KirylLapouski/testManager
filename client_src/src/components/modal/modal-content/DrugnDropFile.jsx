import React from "react";
import Files from 'react-files'
import Button from 'material-ui/Button'
import PropTypes from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';
class DrugnDropFile extends React.Component {
    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    onFilesError = (error) => {
        this.filesRemoveAll()
        this.props.onFilesError(error)
    }

    render() {
        var { onFilesChange} = this.props
        return <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
            <Files ref='files' onChange={onFilesChange} multiple onError={this.onFilesError} style={{ cursor: 'pointer', width: '100%', height: '168px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed grey', textAlign: 'center' }} accepts={['text/plain']} clickable>
                Перетащите файлы сюда<br />
                или<br />
                Выберите файл на компьютере
            </Files>
            {this.props.files.length > 0
                ? <div style={{ minHeight: '215px', maxHeight: '215px', display: 'flex', overflow: 'scroll' }} className='files-list'>
                    <ul style={{ listStyle: 'none', width: '700px', display: 'flex', flexDirection: 'column', textAlign: 'center', minHeight: '215px', maxHeight: '215px' }}>
                        {this.props.files.map((file) =>
                            <li className='files-list-item' key={file.id}>
                                <div className='files-list-item-preview'>
                                    <div className='files-list-item-preview-extension'>{file.extension}</div>
                                </div>
                                <div className='files-list-item-content'>
                                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                    <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                : <div style={{ maxHeight: '215px' }}></div>
            }
            <Button onClick={this.filesRemoveAll}><DeleteIcon/>Удалить все файлы</Button>
        </div>
    }
}

DrugnDropFile.propTypes = {
    files: PropTypes.array,
    onFilesChange: PropTypes.func,
    onFilesError: PropTypes.func,
}
export default DrugnDropFile
