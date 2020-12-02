const https = require('https');
const { API_BASE_URL } = require('../git-api-config.json')
const ResponseDTO = require("../models/ResponseDTO")

class GitRepository {
    constructor(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName
    }

    getAverageCommitsPerWeek() {
        let headers = {
            "Content-Type": 'application/vnd.github.v3+json',
            'user-agent': this.owner
        }
        return new Promise((resolve, reject) => {
            try {
                https.get(`${API_BASE_URL}/repos/${this.owner}/${this.repoName}/stats/commit_activity`, { headers }, res => {
                    let body = "";
                    res.setEncoding("utf8")
                        .on("data", data => {
                            body += data;
                        })
                        .on("end", () => {
                            let sum = 0;
                            let averageCommitsPerWeek = 0
                            body = JSON.parse(body);

                            if (!Array.isArray(body)) {
                                return reject(new ResponseDTO().notFound())
                            }

                            let hasCommitValues = body.filter(item => item.total !== 0);
                            hasCommitValues.map(commit => sum += commit.total);
                            averageCommitsPerWeek = sum / 52;
                            
                            return resolve(new ResponseDTO(res.statusCode, res.statusMessage, { averageCommitsPerWeek }, null).create())
                        });
                });
            }
            catch (error) {
                return reject(new ResponseDTO().internalError())
            }
        })
    }

    getCommitTitles() {
        let numberOfLastCommits = 3
        let headers = {
            "Content-Type": 'application/vnd.github.v3+json',
            'user-agent': this.owner
        }
        return new Promise((resolve, reject) => {

            try {
                https.get(`${API_BASE_URL}/repos/${this.owner}/${this.repoName}/commits`, { headers }, res => {
                    let body = "";
                    res.setEncoding("utf8")
                        .on("data", data => {
                            body += data;
                        })
                        .on("end", () => {
                            let lastCommitsTitles = []
                            body = JSON.parse(body);

                            if (!Array.isArray(body)) {
                                return reject(new ResponseDTO().notFound())
                            }

                            let filteredCommits = body.filter((commit, index) => index < numberOfLastCommits);
                            lastCommitsTitles = filteredCommits.map(item => item.commit.message);

                            return resolve(new ResponseDTO(res.statusCode, res.statusMessage, { lastCommitsTitles }, null).create())
                        });
                });
            }
            catch (error) {
                return reject(new ResponseDTO().internalError())
            }
        })
    }

    getStars() {
        let headers = {
            "Content-Type": 'application/vnd.github.v3+json',
            'user-agent': this.owner
        }
        return new Promise((resolve, reject) => {
            try {
                https.get(`${API_BASE_URL}/repos/${this.owner}/${this.repoName}`, { headers }, res => {
                    let body = "";
                    res.setEncoding("utf8")
                        .on("data", data => {
                            body += data;
                        })
                        .on("end", () => {
                            body = JSON.parse(body)                            
                            return resolve(new ResponseDTO(res.statusCode, res.statusMessage, { numberOfStars: body.stargazers_count }, null).create())
                        });
                });
            }
            catch (error) {
                return reject(new ResponseDTO().internalError())
            }
        })
    }
}

module.exports = GitRepository