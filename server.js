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
    squads: squadResponseJSON.data,
  });
});

app.post("/", async function (request, response) {
  await fetch("https://fdnd.directus.app/items/messages/", {
    method: "POST",
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  response.redirect(303, "/");
});

app.set("port", process.env.PORT || 8000);
{
  app.listen(app.get("port"), function () {
    console.log(`Application started on http://localhost:${app.get("port")}`);
  });
}
