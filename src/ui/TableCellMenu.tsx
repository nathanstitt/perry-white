import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import * as React from 'react'

import CommandMenuButton from './CommandMenuButton'
import {TABLE_COMMANDS_GROUP} from './EditorToolbarConfig'
import {prefixed} from '../util'
import Icon from './Icon'

type Props = {
    editorState: EditorState
    editorView: EditorView
}

class TableCellMenu extends React.Component<any, any> {
    _menu = null

    props: Props

    render() {
        const {editorState, editorView} = this.props
        return (
            <CommandMenuButton
                className={prefixed('table-cell-menu')}
                commandGroups={TABLE_COMMANDS_GROUP}
                dispatch={editorView.dispatch}
                editorState={editorState}
                editorView={editorView}
                icon={Icon.get('edit')}
                title="Edit"
            />
        )
    }
}

export default TableCellMenu
