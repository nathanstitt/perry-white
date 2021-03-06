import renderLaTeXAsHTML from '../renderLaTeXAsHTML'
import CustomButton from '../CustomButton'
import * as React from 'react'

import {prefixed} from '../../util'
import {MathQuillEditorSymbol} from './MathQuillEditorSymbols'

class MathQuillEditorSymbolsPanel extends React.Component<any, any> {
    props: {
        onSelect: (symbol: MathQuillEditorSymbol) => void
        symbols: {
            title: string
            symbols: Array<MathQuillEditorSymbol>
        }
        title?: string
    }

    render() {
        const {title, symbols} = this.props.symbols
        const buttons = symbols.map(this._renderButton)
        return (
            <div className={prefixed('mathquill-editor-symbols-panel')}>
                <div className={prefixed('mathquill-editor-symbols-panel-title')}>
                    {title}
                </div>
                <div className={prefixed('mathquill-editor-symbols-panel-body')}>
                    {buttons}
                </div>
            </div>
        )
    }

    _renderButton = (
        symbol: MathQuillEditorSymbol,
    ): React.ReactElement<any> => {
        const {label, latex, description} = symbol
        const html = renderLaTeXAsHTML(label)
        const icon = <span dangerouslySetInnerHTML={{__html: html}} />
        return (
            <CustomButton
                className={prefixed('mathquill-editor-symbols-panel-button')}
                icon={icon}
                key={label + latex}
                onClick={this.props.onSelect}
                title={description}
                value={symbol}
            />
        )
    }
}

export default MathQuillEditorSymbolsPanel
