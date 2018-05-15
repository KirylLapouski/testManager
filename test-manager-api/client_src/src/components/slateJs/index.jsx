import { Editor, getEventRange, getEventTransfer } from 'slate-react'
import { Block, Value } from 'slate'
import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations'
import { isKeyHotkey } from 'is-hotkey'
import React from 'react'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import ImageIcon from '@material-ui/icons/InsertPhoto'
import FormatBold from '@material-ui/icons/FormatBold'
import FormatItalic from '@material-ui/icons/FormatItalic'
import FormatUnderlined from '@material-ui/icons/FormatUnderlined'
import CodeIcon from '@material-ui/icons/Code'
import LooksOneIcon from '@material-ui/icons/LooksOne'
import LooksTwoIcon from '@material-ui/icons/LooksTwo'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted'
import FormatBulletedListIcon from '@material-ui/icons/FormatListBulleted'
var initialValue = {
    "document": {
      "nodes": [
        {
          "object": "block",
          "type": "paragraph",
          "nodes": [
            {
              "object": "text",
              "leaves": [
                {
                  "text":
                    "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos."
                }
              ]
            }
          ]
        },
        {
          "object": "block",
          "type": "image",
          "isVoid": true,
          "data": {
            "src":
              "https://img.washingtonpost.com/wp-apps/imrs.php?src=https://img.washingtonpost.com/news/speaking-of-science/wp-content/uploads/sites/36/2015/10/as12-49-7278-1024x1024.jpg&w=1484"
          }
        },
        {
          "object": "block",
          "type": "paragraph",
          "nodes": [
            {
              "object": "text",
              "leaves": [
                {
                  "text":
                    "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your keyboard and paste it anywhere in the editor!"
                }
              ]
            }
          ]
        }
      ]
    }
  }
//ritch text editor

const DEFAULT_NODE = 'paragraph'
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

//image extension
/*
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */


function isImage(url) {
  return !!imageExtensions.find(url.endsWith)
}

/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */

function insertImage(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src },
  })
}

/**
 * A schema to enforce that there's always a paragraph as the last block.
 *
 * @type {Object}
 */

const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create('paragraph')
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
}

/**
 * The images example.
 *
 * @type {Component}
 */

class Images extends React.Component {
  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(initialValue),
  }
  //ritch text editor

     /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */
  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type == type)
  }
 /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type == type)
  }
 /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return
    }

    event.preventDefault()
    change.toggleMark(mark)
    return true
  }
   /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(
            type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    }

    this.onChange(change)
  }

//image extension
  /**
   * Render the app.
   *
   * @return {Element} element
   */

  render() {
    return (
      <div style={{boxShadow:' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'}}>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }

  /**
   * Render the toolbar.
   *
   * @return {Element} element
   */

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu" style={{ color:'#B0BEC5', padding:'30px',paddingRight:'65%', display:'flex', justifyContent:'space-between',  borderBottom:'2px solid #B0BEC5'}}>
        <span className="button" onMouseDown={this.onClickImage} style={{cursor:'pointer'}}>
            <ImageIcon style={{width:'25px', height:'25px'}}/>
        </span>
        {this.renderMarkButton('bold', <FormatBold style={{width:'25px', height:'25px'}}/>)}
        {this.renderMarkButton('italic', <FormatItalic style={{width:'25px', height:'25px'}}/>)}
        {this.renderMarkButton('underlined', <FormatUnderlined style={{width:'25px', height:'25px'}}/>)}
        {this.renderMarkButton('code', <CodeIcon style={{width:'25px', height:'25px'}}/>)}
        {this.renderBlockButton('heading-one', <LooksOneIcon style={{width:'25px', height:'25px'}}/>)}
        {this.renderBlockButton('heading-two', <LooksTwoIcon style={{width:'25px', height:'25px'}} />)}
        {this.renderBlockButton('block-quote', <FormatQuoteIcon style={{width:'25px', height:'25px'}} />)}
        {this.renderBlockButton('numbered-list', <FormatListNumberedIcon style={{width:'25px', height:'25px'}} />)}
        {this.renderBlockButton('bulleted-list', <FormatBulletedListIcon style={{width:'25px', height:'25px'}} />)}
      </div>
    )
  }

   /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, iconNode) => {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive} style={{cursor:'pointer'}}>
        {iconNode}
      </span>
    )
  }
   /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, iconNode) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state
      const parent = value.document.getParent(value.blocks.first().key)
      isActive = this.hasBlock('list-item') && parent && parent.type === type
    }
    const onMouseDown = event => this.onClickBlock(event, type)

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive} style={{cursor:'pointer'}}>
        {iconNode}
      </span>
    )
  }
  /**
   * Render the editor.
   *
   * @return {Element} element
   */

  renderEditor = () => {
    return (
      <div className="editor" style={{marginTop:'50px'}}>
        <Editor
          placeholder="Enter some text..."
          value={this.state.value}
          schema={schema}
          onChange={this.onChange}
          onDrop={this.onDropOrPaste}
          onPaste={this.onDropOrPaste}
          renderNode={this.renderNode}
        />
      </div>
    )
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = props => {
    const { attributes, node, isSelected } = props
    switch (node.type) {
      case 'image': {
        const src = node.data.get('src')
        const className = isSelected ? 'active' : null
        const style = { display: 'block', width:'60%', margin:'auto'}
        return (
          <img src={src} className={className} style={style} {...attributes} />
        )
      }
    }
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * On clicking the image button, prompt for an image and insert it.
   *
   * @param {Event} event
   */

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return

    const change = this.state.value.change().call(insertImage, src)

    this.onChange(change)
  }

  /**
   * On drop, insert the image wherever it is dropped.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  onDropOrPaste = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type == 'drop') return

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type == 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime != 'image') continue

        reader.addEventListener('load', () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }

    if (type == 'text') {
      if (!isUrl(text)) return
      if (!isImage(text)) return
      change.call(insertImage, text, target)
    }
  }
}

/**
 * Export.
 */

export default Images