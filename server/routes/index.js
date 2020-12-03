var express = require('express');
const GitService = require('../services/GitService');
var router = express.Router();

router.get('/', function (req, res, next) {
   res.send("")
   next()
});

router.get('/getRepoDetails', async (request, response, next) => {
   let { owner, repoName } = request.query;
   let gitService = new GitService();
   let result = await gitService.details(owner, repoName);
   return response.json(result)
})

// router.get('/average_commits_per_week', async (request, response, next) => {
//    let { owner, repoName } = request.query;
//    await new GitService(owner, repoName).repository().getAverageCommitsPerWeek()
//       .then(result => {
//          response.send(result);
//       })
//       .catch(err => {
//          response.send(err);
//       })
// })

// router.get('/last_commits_titles', async (request, response, next) => {
//    let { owner, repoName } = request.query;
//    await new GitService(owner, repoName).repository().getCommitTitles()
//       .then(result => {
//          response.send(result);
//       })
//       .catch(err => {
//          response.send(err);
//       })
// })

// router.get('/stars', async (request, response, next) => {
//    let { owner, repoName } = request.query;
//    await new GitService(owner, repoName).repository().getStars()
//       .then(result => {
//          response.send(result);
//       })
//       .catch(err => {
//          response.send(err);
//       })
// })

module.exports = router;
