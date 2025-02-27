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
  const personDetailResponse = await fetch(
    "https://fdnd.directus.app/items/person/" + request.params.id
  );
  const personDetailResponseJSON = await personDetailResponse.json();
  response.render("student.liquid", {
    person: personDetailResponseJSON.data,
  });
});

// app.post("/", async function (request, response) {
//   await fetch("https://fdnd.directus.app/items/messages/", {
//     method: "POST",
//     body: JSON.stringify({
//       for: `Team Epic / Quote / `,
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
  response.render("index.liquid", { persons: personResponseJSON.data });
});

// Maak een GET route voor een detailpagina met een route parameter, id
// Zie de documentatie van Express voor meer info: https://expressjs.com/en/guide/routing.html#route-parameters
app.get("/student/:id", async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const personDetailResponse = await fetch(
    "https://fdnd.directus.app/items/person/" + request.params.id
  );
  // En haal daarvan de JSON op
  const personDetailResponseJSON = await personDetailResponse.json();

  // Render student.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render("student.liquid", { person: personDetailResponseJSON.data });
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
    response.render("index.liquid", { persons: filteredResponseJSON.data, most_energy: request.params.most_energy });
  }
  // Gebruik de mensen die flexibel zijn (null waarde bij most energy)
  else {
    const filteredResponse = await fetch(
      'https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}},{"most_energy":{"_null":"true"}}]}'
    );
    const filteredResponseJSON = await filteredResponse.json();
    response.render("index.liquid", { persons: filteredResponseJSON.data });
  }
});

//Route voor detailpagina
app.get("/detailpage", async function (request, response) {
  const personDetailResponse = await fetch(
    "https://fdnd.directus.app/items/person/?filter=%7B%22fav_country%22:%7B%22_nnull%22:%22true%22%7D%7D&fields=name,bio,most_energy,fav_kitchen" + request.params.id
  );
  const personDetailResponseJSON = await personDetailResponse.json();
  response.render("detail.liquid", { person: personDetailResponseJSON.data });
});



app.set("port", process.env.PORT || 8000);
{
  app.listen(app.get("port"), function () {
    console.log(`Application started on http://localhost:${app.get("port")}`);
  });
}
