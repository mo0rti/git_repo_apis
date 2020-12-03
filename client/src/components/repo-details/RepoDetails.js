import React from 'react'
import { CommitList, DataField } from "../../components"

function RepoDetails({ repoDetails, reset }) {
    return (
        <div className="repo_details">
            <DataField
                caption={"Repository name"}
                value={repoDetails?.repoName}
            />
            <DataField
                caption={"Owned by"}
                value={repoDetails?.owner}
            />
            <DataField
                className
                caption={"Repo Stars"}
                value={repoDetails?.numberOfStars}
            />
            <DataField
                className
                caption={" Average Commits Per Week"}
                value={repoDetails?.averageCommitsPerWeek}
            />
            <CommitList
                caption={"Last commit titles"}
                listOfCommits={repoDetails?.lastCommitsTitles}
            />
            <button onClick={reset} className="btn btn-primary" >Reset</button>
        </div>
    )
}

export default RepoDetails
