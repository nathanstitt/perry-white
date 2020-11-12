import * as React from 'react'

class CustomMenu extends React.Component<any, any> {
    render() {
        const {children} = this.props
        return (
            <div className="czi-custom-menu czi-custom-scrollbar">
                {children}
            </div>
        )
    }
}

export default CustomMenu
