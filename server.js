const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
//env is a variable that stores all environment variables in key=value-pairs.
//PORT is the one that heroku sets.
var app = express();
hbs.registerPartials(__dirname + '/views/partials'); // BYGGA PARTER AV EN WEBBSIDA
app.set('view engine', 'hbs');//key=grejen du vill "settar en viewengine", "hbs" <-viewengine
//en view engine är en mix mellan HTML och annan kod. och underlättar dynamiskt kodande.
//ändrar troligen en json.config-fil.
//(sätter du filnamnet till index kommer datorn välja den oavsett vad du specificerar)

app.use((req, res, next) => {
  //Kod som exekveras vid varje request!
  let now = new Date().toString();
  let log = `Date: ${now}| requested URL: ${req.url} | method: ${req.method}` ;
  console.log(log);
  fs.appendFile('server.log', log + '\n',(err) => {
    if(err){
      console.log('Unable to append bruh');
    }
    next();
    });
  })

// app.use((req,res,next) => { //maintenance-mode ((middleware))
//
//   res.render('loading.hbs');
// });
app.use(express.static(__dirname + '/public'));//säger vart browsern ska leta efter HTMLkod

//SKILLNAD MELLAN APP.USE((MIDDLEWARE CONTROL.)) och APP.GET???
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});//Hbs helper-funktion.

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
      pTitle: 'Lyckades',
      footer:  'Daz some gd shit!',
      pTag: 'lowercase'
  })
});

app.get('/about',(req, res) => {
//  res.send('aboutPage')
res.render('about.hbs') //Tillåter mig att rendera in sidor och uppdatera dynamiskt från server. (render är express obviously);
//Det här filtypen fungerar eftersom att jag har specificerat view-engine hbs
//render tillåter mig att kommai in i filer i "views"-mappen (man kan ändra namnet på den);
})

app.get('/bad', (req, res) => {

  res.send({
    message: 'ERRRR! seems like your in the wrong place pal'
  });
})
app.listen(port, () => {

  console.log(`Server is up on ${port}`)
});
