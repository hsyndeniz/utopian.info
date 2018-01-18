const express = require('express');
const router = express.Router();
const request = require('request');

var stats;
var vid_tuts;
var sub_projects;
var bugs;

var unreviewed;

var task_social;
var task_documentation;
var task_graphics;
var task_translations;
var task_development;
var task_ideas;

var task_count;


var stats_url = "https://api.utopian.io/api/stats";
var pending = "https://utopian.plus/pendingPosts.json";

request(stats_url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    stats               = body.stats;
    console.log(stats);
    vid_tuts            = stats.categories["video-tutorials"];
    sub_projects        = stats.categories["sub-projects"];
    bugs                = stats.categories["bug-hunting"];
    task_social         = stats.categories["task-social"];
    task_documentation  = stats.categories["task-documentation"].total_posts;
    task_graphics       = stats.categories["task-graphics"];
    task_translations   = stats.categories["task-translations"];
    task_development    = stats.categories["task-development"];
    task_ideas          = stats.categories["task-ideas"];

    task_count = task_social.total_posts + task_documentation + task_graphics.total_posts + task_translations.total_posts + task_development.total_posts + task_ideas.total_posts;
   // console.log(task_count);
});

request(pending, {json:true}, (err, res, body) => {
    if (err) {return console.log(err); }
    unreviewed = body.posts.pending;
    console.log(unreviewed);
})

/* GET home page. */
router.get('/', function(req, res, next) {

      res.render('index', { title: 'Express', 'stats':stats, 'tasks': task_count, 'sub_projects': sub_projects.total_posts, 'bugs': bugs.total_posts, 'unreviewed':unreviewed });
});

module.exports = router;
