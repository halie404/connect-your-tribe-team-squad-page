import express from "express";
import { Liquid } from "liquidjs";

const app = express();
app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {
  const personResponse = await fetch(
    'https://fdnd.directus.app/items/person/?sort=name&fields=id,name,squads.squad_id.name,most_energy&filter={"squads":{"squad_id":{"name":"1G"}}}'
  );
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", { persons: personResponseJSON.data });
});


app.get("/student/:id", async function (request, response) {

  let quoteResponse = await fetch("https://fdnd.directus.app/items/messages/?filter={\"for\":\"Team Epic / QuoteFor /" + request.params.id + "\"}&fields=from,text&limit=1&sort=-created");
  let quoteResponseJSON = await quoteResponse.json();
  let oneQuote;
  if(quoteResponseJSON.data.length > 0) {
    oneQuote = quoteResponseJSON.data[0].text;
  } else {
    oneQuote = false;
  }


  const personDetailResponse = await fetch(
    "https://fdnd.directus.app/items/person/" + request.params.id + "?fields=name,bio,most_energy,fav_kitchen,id"
  );
  const personDetailResponseJSON = await personDetailResponse.json();
  response.render("student.liquid", { person: personDetailResponseJSON.data, personalQuote: oneQuote });
});

// POST
let messages = [] 


app.post("/student/:id", async function (request, response) {

    await fetch("https://fdnd.directus.app/items/messages/", {
    method: "POST",
    body: JSON.stringify({
      for: `Team Epic / QuoteFor /` + request.params.id,
      from: request.body.person_name,
      text: request.body.message,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  response.redirect(303, "/student/"  + request.params.id);
})


// app.post("/", async function (request, response) {
//   await fetch("https://fdnd.directus.app/items/messages/", {
//     method: "POST",
//     body: JSON.stringify({
//       for: `Team ${teamName}`,
//       from: request.body.from,
//       text: request.body.text,
//     }),
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });

//   response.redirect(303, "/");
// });


app.get("/", async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch(
    'https://fdnd.directus.app/items/person/?sort=name&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}}]}&fields=id,name,avatar,nickname,fav_color,squads,most_energy'
  );

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render("index.liquid", { persons: personResponseJSON.data, filtered: false });
});



// Maak een GET route voor een detailpagina met een route parameter, id
// Zie de documentatie van Express voor meer info: https://expressjs.com/en/guide/routing.html#route-parameters
app.get("/most_energy/:most_energy", async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  if (request.params.most_energy != "flexible") {
    console.log(
      'https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}},{"most_energy":{"_icontains":"' + request.params.most_energy + '"}}]}'
    );
    const filteredResponse = await fetch(
      'https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}},{"most_energy":{"_icontains":"' + request.params.most_energy + '"}}]}'
    );
    const filteredResponseJSON = await filteredResponse.json();
    response.render("index.liquid", { persons: filteredResponseJSON.data, most_energy: request.params.most_energy, filtered: true});
  }
  // Gebruik de mensen die flexibel zijn (null waarde bij most energy)
  else {
    const filteredResponse = await fetch(
      'https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}},{"most_energy":{"_null":"true"}}]}'
    );
    const filteredResponseJSON = await filteredResponse.json();
    response.render("index.liquid", { persons: filteredResponseJSON.data, filtered: true });
  }
});



app.set("port", process.env.PORT || 8000);
{
  app.listen(app.get("port"), function () {
    console.log(`Application started on http://localhost:${app.get("port")}`);
  });
}
