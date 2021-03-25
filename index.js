const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs'); 
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); //parser middleware
app.use(express.static('assets'));

// //middleware1
// app.use(function(req,res,next){
// //   console.log('middleware 1 called');
//   next();
// });

// //middleware2
// app.use(function(req,res,next){
//     //  console.log('middleware 2 called');
//     next();
//   });

var contactList=[
    {
        name:"arpan",
        phone:"1111111111"
    },
    {
        name:"rahul",
        phone:"222222222" 
    },
    {
        name:"boooh",
        phone:"33333333"
    }
]

app.get('/',function(req,res){
    // console.log(__dirname );
    //console.log(req);
    // res.send('Cool, it is running! or is it?');
   // res.send('<h1>Cool, it is running! or is it?</h1>');

   Contact.find({},function(err,contacts){
         if(err){
             console.log('error int fetching the contacts from db');
             return;
         }

         return res.render('home',{
            title:"Contacts List",
            contact_list:contacts
         });

   });


});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let us play with EJS"
    });
});

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });




    //contactList.push(req.body);

      //push in database
      Contact.create({
          name:req.body.name,
          phone:req.body.phone
      },function(err,newContact){
          if(err){
              console.log('error in creating a contact');
              return;
          }

          console.log('********',newContact);
          return res.redirect('back');
      });


    // return res.redirect('back');
    
});

//for deleteing a contact
app.get('/delete-contact',function(req,res){
    // console.log(req.params); 
    // let phone=req.params.phone;

    //console.log(req.query);
    //get the id from query in the  url
    let id=req.query.id;

    // let contactIndex=contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }


     //find the contact int the database using id and delete
     Contact.findByIdAndDelete(id,function(err){
         if(err){
             console.log('error in deleting an object from database');
             return;
         }
         return res.redirect('back');
     });

});


app.listen(port,function(err){
   if(err){
       console.log('Error in running the server',err);
   }
   console.log('Yup! My Express Server is running on Port:',port);
});