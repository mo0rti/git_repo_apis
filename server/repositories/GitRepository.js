const https = require('https');
const { API_BASE_URL } = require('../git-api-config.json');

const NotFound = require('../models/NotFound');
const InternalError = require('../models/InternalError');

class GitRepository {
    constructor(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName
        this.headers = {
            "Content-Type": 'application/vnd.github.v3+json',
            'user-agent': owner
        }
    }

    getAverageCommitsPerWeek() {
        return new Promise((resolve, reject) => {
            try {
                https.get(`${API_BASE_URL}/repos/${this.owner}/${this.repoName}/stats/commit_activity`, 
                    { headers: this.headers }, 
                    res => {
                        let body = "";
                        res
                            .setEncoding("utf8")
                            .on("data", data => body += data)
                            .on("end", () => {
                                let sum = 0;
                                let averageCommitsPerWeek = 0
                                body = JSON.parse(body);

                                if (!Array.isArray(body)) {
                                    throw new NotFound();
                                }

                                let hasCommitValues = body.filter(item => item.total !== 0);
                                hasCommitValues.map(commit => sum += commit.total);
                                averageCommitsPerWeek = sum / 52.0;
                                
                                return resolve({ averageCommitsPerWeek })
                            });
                });
            }
            catch (error) {
                throw new InternalError(error)
            }
        })
    }

    getCommitTitles() {
        let numberOfLastCommits = 3
        return new Promise((resolve, reject) => {
            try {
                https.get(`${API_BASE_URL}/repos/${this.owner}/${this.repoName}/commits`,
                    { headers: this.headers }, 
                    res => {
                        let body = "";
                        res
                            .setEncoding("utf8")
                            .on("data", data => body += data)
                            .on("end", () => {
                                let lastCommitsTitles = []
                                body = JSON.parse(body);

                                if (!Array.isArray(body)) {
                                    throw new NotFound();
                                }

                                let filteredCommits = body.filter((commit, index) => index < numberOfLastCommits);
                                lastCommitsTitles = filteredCommits.map(item => item.commit.message);

                                return resolve({ lastCommitsTitles })
                            });
                });
            }
            catch (error) {
                throw new InternalError(error)
            }
        })
    }

    getStars() {
        return new Promise((resolve, reject) => {
            try {
                https.get(`${API_BASE_URL}/repos/${this.owner}/${this.repoName}`,
                    { headers: this.headers }, 
                    res => {
                        let body = "";
                        res
                            .setEncoding("utf8")
                            .on("data", data => body += data)
                            .on("end", () => {
                                    body = JSON.parse(body)                            
                                    return resolve({ numberOfStars: body.stargazers_count })
                                });
                });
            }
            catch (error) {
                throw new InternalError(error)
            }
        })
    }
}

module.exports = GitRepository
