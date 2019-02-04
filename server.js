const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
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
app.listen(3000, () => {

  console.log('server is up on port 3000 ')
});


/*
Tror jag löste koden. Genom att skriva såhär i express
så kan man skicka request via javascripten. till
sin egen sida för att requesta. tex. om jag gör en knapp
så görs en get till en sida som uppdaterar innehållet.
///////////////////////app.get

///////////////////////app.use
finns för att hantera request till adresser i programmet

exekverar kod för varje request, app.use(PATH//EVENTUELT CALLBACK ELLER BÅDA):
----metoder
  next(); <--- säger till att fortsätta programmet

////////////////////////HANDLERS
Handlers är det som hanterar requests till min sida.

////////////////////////STATIC DIRECTORY
Static assets.
////////////////////////__dirname
  - dirname (är en av parametrana i wrappern som skickar in sökvägen)
////////////////////////app.listen(3000 <---- lyssnar på port 3000, FUNKTION (VAD SKA SIDAN GÖRA I CMD  MEDANS DEN LADDAR IN SAKER))

///////////////////////Handlebars///////////////////////
- view-engine
//används tillsammans med express för att göra
det enklare att ladda in skit på sidan dynamiskt.
är en "view-engine" som använd tsm:ans med express
för att rendera html.

hbs är starkt för att man kan använda partials
med partials kan jag återanvända kod på ett enkelt sätt.
////////////////////////Views///////////////////////
views är default-mappen för html-templat i express
som t.ex. /about <--- /home renderas in i browsern från den mappen.

/////////////////////////--save-dev///////////////////////

dev gör så att ett specifikt paket inte körs på servern.


/////////////////////////request.res !!!!!!!!!!!!!!!!!!!!
request.res
I den finns all information om anslutningen.
Man kan t.ex. ta ut URLEN som användaren vill koppla upp sig te eller
óm det är en mobil eller vad det är för metod.
precis som $todoObj = Pdo(localhostblabla) i php.

/////////////////////////VERSION CONTROL //////////////////////////////


*/
