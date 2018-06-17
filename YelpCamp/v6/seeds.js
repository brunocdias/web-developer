var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   
        name: "Cloud's Rest", 
        image:"http://www.bigbearlake.net/Summer/images/Holcomb-Valley-Campground.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis aliquet diam. Suspendisse potenti. Aliquam sed nulla at orci venenatis suscipit. Vestibulum feugiat augue quis orci fringilla condimentum sit amet nec mauris. Suspendisse pharetra auctor nibh non fringilla. Morbi luctus vehicula tortor, sit amet feugiat nunc pretium quis."
    },
    {   
        name: "Desert Mesa", 
        image:"https://savannahwaydrive.files.wordpress.com/2012/11/northern-territory-camping.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis aliquet diam. Suspendisse potenti. Aliquam sed nulla at orci venenatis suscipit. Vestibulum feugiat augue quis orci fringilla condimentum sit amet nec mauris. Suspendisse pharetra auctor nibh non fringilla. Morbi luctus vehicula tortor, sit amet feugiat nunc pretium quis."
    },
    {   
        name: "Canyon Floor", 
        image:"http://battenkillriversports.com/wp-content/uploads/2016/02/18f63e24-1637-4897-a973-b0b80f6bbc24.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis aliquet diam. Suspendisse potenti. Aliquam sed nulla at orci venenatis suscipit. Vestibulum feugiat augue quis orci fringilla condimentum sit amet nec mauris. Suspendisse pharetra auctor nibh non fringilla. Morbi luctus vehicula tortor, sit amet feugiat nunc pretium quis."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err)
                } else {
                    console.log("Added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is greate, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            }); 
        });
    });
    
    
    
    //add a few comments
}

module.exports = seedDB;