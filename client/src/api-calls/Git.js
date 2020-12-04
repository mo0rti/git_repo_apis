import HttpClient from "../helpers/HttpClient";

const BASE_URL = 'http://localhost:8000'

export const getRepositoryDetails = async (request) => {
    const result = await HttpClient().getAsync(`${BASE_URL}/getRepoDetails?owner=${request.repoOwner}&repoName=${request.repoName}`);
    if (result.isSucceed) {
        return Promise.resolve(result.data);
    } else {
        return Promise.reject(result)
    }
}
