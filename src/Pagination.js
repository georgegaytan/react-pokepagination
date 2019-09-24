import React from 'react'

export default function Pagination({ toNextPage, toPreviousPage }) {
    return (
        <div>
            { toPreviousPage && <button variant="primary" onClick={toPreviousPage}>Previous</button> }
            { toNextPage && <button variant="primary" onClick={toNextPage}>Next</button> }
        </div>
    )
}
