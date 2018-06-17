var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
        name: "Granite Hill",
        image: "http://www.americansouthwest.net/new_mexico/photographs700/aguirre-hill.jpg",
        description: "This is a huge granite hill, no bathrooms. no water, beautiful granite"
     },
     function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log("new created campground");
            console.log(campground);
        }
   });
*/


        
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res){
     // get all campgrounds from db
     Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
             res.render("index", {campgrounds:allCampgrounds});
         }
     }); 
});


//CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campground
           res.render("show.ejs", {campground: foundCampground})
       }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp has Started!!");
});