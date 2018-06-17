var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
     // get all campgrounds from db
     Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
             res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
         }
     }); 
});


//CREATE - ADD NEW CAMPGROUND TO DB
router.post("/", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description:desc};
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
   
});

//NEW - SHOW FORM TO CREATE A NEW CAMPGROUND
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground})
       }
    });
    
});

module.exports = router;