const request = require("request")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { urlencoded } = require("body-parser")

const app=express()

app.set("view engine","ejs")
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.static(__dirname))
//Creating a database
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
})

//Creating Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email:String

})
// Creating itemsSchema Model
const userModel = mongoose.model("user", userSchema)


app.get("/add",function(request,response)
{
      response.render("home")
})

// For Adding the user
app.post("/add",function(request,response)
{
      const username=request.body.user;
      const useremail=request.body.email;
      const newusername=new userModel({
            name:username,
            email:useremail
      })
      newusername.save()

      response.redirect("/add");
      
})

// for deleting the user.
app.post("/delete",function(request,response)
{
      const deleteusername=request.body.username;
      userModel.deleteOne({ name: deleteusername }, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully deleted the account")
        }
      })
      response.redirect("/add")
})

app.listen(3000, function () {
  console.log("Server has started successfully.")
})

/*
For Adding User:

I am justing writing a code for route. 
If the html form submit with action="/add", and taking input from  form like username and email, then 
post(/add) add that username and email in mongoDB server.
*/

/*
For Deleting User:

If the html form submit with action="/delete", and taking input from  form like username, then
find the username in the mongoDB server and delete the username and email from the database.
post(/add) add that username and email in mongoDB server.
*/