import React from 'react'

const DataField = ({ caption, value }) => {
    return (
        <section className="data_field_section">
            <h6>{caption}</h6>
            <span>{value}</span>
        </section>
    )
}

export default DataField
