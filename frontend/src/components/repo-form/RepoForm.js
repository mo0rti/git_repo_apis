import React, { useEffect, useState } from 'react'

const RepoSummery = ({ submitErrorMessage, onFormSubmit }) => {
    const [errorMessage, setErrorMessage] = useState(submitErrorMessage)
    const [formState, setFormState] = useState({
        repoName: "",
        repoOwner: ""
    })

    useEffect(() => {
        setErrorMessage(submitErrorMessage)
    }, [submitErrorMessage])

    const _onChnageText = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormState({ ...formState, [name]: value })
    }

    const _validate = () => {
        let totalErrors = 0
        if (!formState.repoName) {
            setErrorMessage("Repo Name is required");
            totalErrors++
        }
        if (!formState.repoOwner) {
            setErrorMessage("Repo Owner is required");
            totalErrors++
        }
        return totalErrors === 0
    }

    const _submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (!_validate()) return;

        onFormSubmit(formState)
    }

    return (
        <form onSubmit={_submitForm}>
            <div className="form-group">
                <label htmlFor="repo_owner">Repo Owner</label>
                <input
                    className="form-control"
                    id="repo_owner"
                    placeholder="Repo Owner"
                    name="repoOwner"
                    onChange={_onChnageText}
                />
            </div>
            <div className="form-group">
                <label htmlFor="repo_name">Repo Name</label>
                <input
                    className="form-control"
                    id="repo_name"
                    placeholder="Repo Name"
                    name="repoName"
                    onChange={_onChnageText}
                />
            </div>
            {
                errorMessage && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            }
            <button type="submit" className="btn btn-primary" >Get Details</button>
        </form>
    )
}

export default RepoSummery
