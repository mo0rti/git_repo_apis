import React from 'react'

function CommitList({ caption, listOfCommits }) {
    return (
        <ul className="titles_list">
            <h6>{caption}</h6>
            {listOfCommits.map((commit, index) => {
                return (
                    <li key={index.toString()} >
                        {`${index + 1} -> ${commit}`}
                    </li>
                )
            })}
        </ul>
    )
}

export default CommitList
