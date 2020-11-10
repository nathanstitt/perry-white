import "./czi-custom-radio-button.css"
import PointerSurface from "./PointerSurface"
import * as React from "react"
import cx from "classnames"
import uuid from "./uuid"
import preventEventDefault from "./preventEventDefault"

import {PointerSurfaceProps} from "./PointerSurface"

class CustomRadioButton extends React.Component<any, any> {
    props: PointerSurfaceProps & {
        checked?: boolean | null | undefined
        inline?: boolean | null | undefined
        label?: string | null
        title?: string | null
        name?: string | null | undefined
        onSelect?: (
            val: any,
            e: React.SyntheticEvent,
        ) => void | null | undefined
    }

    _name = uuid()

    render() {
        const {
            title,
            className,
            checked,
            label,
            inline,
            name,
            onSelect,
            disabled,
            ...pointerProps
        } = this.props

        const klass = cx(className, "czi-custom-radio-button", {
            checked: checked,
            inline: inline,
        })

        return (
            <PointerSurface
                {...pointerProps}
                className={klass}
                disabled={disabled}
                onClick={onSelect}
                title={title || label}
            >
                <input
                    checked={checked}
                    className="czi-custom-radio-button-input"
                    disabled={disabled}
                    name={name || this._name}
                    onChange={preventEventDefault}
                    tabIndex={disabled ? null : 0}
                    type="radio"
                />
                <span className="czi-custom-radio-button-icon" />
                <span className="czi-custom-radio-button-label">{label}</span>
            </PointerSurface>
        )
    }
}

export default CustomRadioButton
