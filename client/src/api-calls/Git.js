import HttpClient from "../helpers/HttpClient";
const BASE_URL = 'http://localhost:8000'

export const getRepositoryDetails = async (request) => {
    let result = await HttpClient().getAsync(`${BASE_URL}/getRepoDetails?owner=${request.repoOwner}&repoName=${request.repoName}`)
    if (result.statusCode !== 200) {
        return Promise.reject(result)
    } else {
        return Promise.resolve(result.data)
    }
}