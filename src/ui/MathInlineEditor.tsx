import CustomButton from './CustomButton'
import CustomEditorView from './CustomEditorView'
import MathEditor from './MathEditor'
import * as React from 'react'
import createPopUp from './createPopUp'
import {prefixed} from '../util'

const MathAlignValues = {
    NONE: {
        value: null,
        text: 'Inline',
    },
    CENTER: {
        value: 'center',
        text: 'Break text',
    },
}

export type MathInlineEditorValue = {
    align: string | null | undefined
    math: string
}

class MathInlineEditor extends React.Component<any, any> {
    props: {
        onEditEnd: () => void
        onEditStart: () => void
        onSelect: (val: any) => void
        value: MathInlineEditorValue | null | undefined
        editorView: CustomEditorView | null | undefined
    }

    _popUp = null

    componentWillUnmount(): void {
        this._popUp && this._popUp.close()
    }

    render() {
        const {align, math} = this.props.value || {}
        const onClick = this._onClick
        const buttons = Object.keys(MathAlignValues).map(key => {
            const {value, text} = MathAlignValues[key]
            return (
                <CustomButton
                    active={align === value}
                    key={key}
                    label={text}
                    onClick={onClick}
                    value={value}
                />
            )
        })

        return (
            <div className={prefixed('inline-editor')}>
                {buttons}
                <CustomButton
                    key="edit"
                    label="Edit"
                    onClick={this._editMath}
                    value={math || ''}
                />
            </div>
        )
    }

    _onClick = (align: string | null | undefined): void => {
        const value = this.props.value || {}
        this.props.onSelect({...value, align})
    }

    _editMath = (math: string): void => {
        if (this._popUp) {
            return
        }
        const {editorView, value} = this.props
        const props = {
            runtime: editorView ? editorView.runtime : null,
            initialValue: (value && value.math) || '',
        }
        this._popUp = createPopUp(MathEditor, props, {
            autoDismiss: false,
            modal: true,
            onClose: math => {
                if (this._popUp) {
                    this._popUp = null
                    if (math !== undefined) {
                        const value = this.props.value || {}
                        this.props.onSelect({...value, math})
                    }
                    this.props.onEditEnd()
                }
            },
        })
        this.props.onEditStart()
    }
}

export default MathInlineEditor
