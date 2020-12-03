var express = require('express');
const GitService = require('../services/GitService');
var router = express.Router();

const gitService = new GitService();
   
router.get('/', function (req, res, next) {
   res.send("")
   next()
});

router.get('/getRepoDetails', async (request, response, next) => {
   let { owner, repoName } = request.query;
   let result = await gitService.details(owner, repoName);
   console.log(result)
   return response.json(result)
})

module.exports = router;
