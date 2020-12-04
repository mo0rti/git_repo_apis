const GitRepository = require("../repositories/GitRepository");
const Ok = require("../models/Ok");

class GitService {

    async details(owner, repoName) {
        const gitRepository = new GitRepository(owner, repoName);
        
        let averageResult = {}
        let commitTitles = {}
        let stars = {}

        try {
            averageResult = await gitRepository.getAverageCommitsPerWeek();
            commitTitles = await gitRepository.getCommitTitles();
            stars = await gitRepository.getStars();
            return new Ok({
                repoName,
                owner,
                ...averageResult,
                ...commitTitles,
                ...stars
            });
        } catch(error) {
            return error
        }
    }
}

module.exports = GitService