const express = require('express');
const router = express.Router();
const request = require('request');

var stats;
var mods;
var sponsors;
var vid_tuts;
var sub_projects;
var bugs;

var task_social;
var task_documentation;
var task_graphics;
var task_translations;
var task_development;
var task_ideas;

var task_count;


var stats_url = "https://utopian-report.herokuapp.com/stats/";
var mods_url = "https://utopian-report.herokuapp.com/moderators/";
var sponsors_url = "https://utopian-report.herokuapp.com/sponsors/";

request(stats_url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    stats               = body;
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
    console.log(task_count);
});



request(mods_url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    mods = body;
   // console.log(body);
});


request(sponsors_url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    sponsors = body;
   // console.log(body);
});


/* GET home page. */
router.get('/', function(req, res, next) {

      res.render('index', { title: 'Express', 'stats':stats, 'tasks': task_count, 'sub_projects': sub_projects.total_posts, 'bugs': bugs.total_posts });
});

module.exports = router;
