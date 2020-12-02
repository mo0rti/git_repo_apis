import React, { useState } from 'react'
import { getRepositoryDetails } from "./api-calls/Git"
import { RepoDetails, RepoForm, Loading } from "./components"
import './App.css';

function App() {
   const [repoDetails, setRepoDetails] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [submitErrorMessage, setSubmitErrorMessage] = useState("")

   const _onFormSubmit = (formState) => {
      setIsLoading(true)
      getRepositoryDetails(formState)
         .then(data => {
            setIsLoading(false)
            setRepoDetails(data)
         })
         .catch(e => {
            setIsLoading(false)
            setSubmitErrorMessage(e?.message)
         })

   }

   const _reset = () => {
      setRepoDetails(null)
   }

   return (
      <div className="App">
         <h4>{"Find Repository"}</h4>
         {
            isLoading ?
               <Loading />
               :
               repoDetails !== null ?
                  <RepoDetails
                     repoDetails={repoDetails}
                     reset={_reset}
                  />
                  :
                  <RepoForm
                     submitErrorMessage={submitErrorMessage}
                     onFormSubmit={_onFormSubmit}
                  />
         }
      </div>
   );
}

export default App;
