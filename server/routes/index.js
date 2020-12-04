var express = require('express');
const NotFound = require('../models/NotFound');
const Ok = require('../models/Ok');
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
   if (result instanceof Ok) {
      response.status(200);
   } else if (result instanceof NotFound) {
      response.status(404);
   } else {
      response.status(500);
   }
   return response.json(result)   
})

module.exports = router;
