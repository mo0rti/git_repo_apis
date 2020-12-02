const GitRepository = require("../repositories/GitRepository");
const ResponseDTO = require("../models/ResponseDTO")

class GitService {
    constructor(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName
    }

    repository() {
        return new GitRepository(this.owner, this.repoName)
    }

    async details(owner, repoName) {
        let gitRepository = new GitRepository(owner, repoName);
        let response = new ResponseDTO(null, null, null, null).create();

        await gitRepository.getAverageCommitsPerWeek()
            .then(result => response = Object.assign({}, result, { data: { ...response.data, ...result.data, owner, repoName } }))
            .catch(e => response = Object.assign({}, e, { data: { ...response.data } }))
        await gitRepository.getCommitTitles()
            .then(result => response = Object.assign({}, result, { data: { ...response.data, ...result.data } }))
            .catch(e => response = Object.assign({}, e, { data: { ...response.data } }))
        await gitRepository.getStars()
            .then(result => response = Object.assign({}, result, { data: { ...response.data, ...result.data } }))
            .catch(e => response = Object.assign({}, e, { data: { ...response.data } }))

        return response
    }
}

module.exports = GitService