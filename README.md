# Squad Page
## Design concept 

![Group 140](https://github.com/user-attachments/assets/ced0dcf7-0388-4f51-a8b3-e77fbef24ee3)


## Kenmerken

### NodeJS
Met Node kan je server-side applicaties bouwen met JavaScript. In dit project wordt Node.js gebruikt om een webserver te draaien die de applicatie bedient.

### Express
Express is een framework voor Node.js dat functies biedt voor het bouwen van sites. In dit project wordt Express gebruikt om routes te definiëren en HTTP-verzoeken(post en get) af te handelen.

### Liquid
Liquid is een template engine voor JavaScript en Ruby. Het wordt gebruikt om HTML te genereren met dynamische data. In dit project wordt Liquid gebruikt om de HTML-pagina's te renderen met data die wordt opgehaald van de whois FDND API.

### Projectstructuur
Het project heeft de volgende structuur:
- server.js: Dit is het hoofdbestand van de server. Hier worden de Express-applicatie en routes gedefinieerd.
- views: Bevat de Liquid templates voor de HTML-pagina's.
- public: Bevat de statische bestanden zoals CSS, JavaScript en afbeeldingen.

### Routes
De routes worden gedefinieerd in server.js. Hier zijn enkele belangrijke routes:

- `GET /`: Haalt een lijst van personen op van de API en rendert de hoofdpagina met deze data.
- `GET /student/:id`: Haalt de details van een specifieke persoon op en rendert de detailpagina.
- `POST /student/:id`: Verzendt een nieuwe quote voor een specifieke persoon naar de API.
- `GET /most_energy/:most_energy`: Filtert de personen op basis van hun energieniveau en rendert de hoofdpagina met de gefilterde data.

### Data ophalen en posten
De data wordt opgehaald van de Directus API met behulp van `fetch`. Bijvoorbeeld, in de route `GET /` wordt de lijst van personen opgehaald met de volgende code:
https://github.com/halie404/connect-your-tribe-team-squad-page/blob/b9e69e0349ecfe795a16168affb88a333e4560f6/server.js#L12-L19

Voor het posten van een persoonlijke quote wordt ook `fetch` gebruikt, zoals in de route `POST /student/:id`:

https://github.com/halie404/connect-your-tribe-team-squad-page/blob/b9e69e0349ecfe795a16168affb88a333e4560f6/server.js#L45-L60

### HTML renderen met data
De HTML wordt gerenderd met Liquid templates. Bijvoorbeeld, in de route `GET /student/:id` wordt de detailpagina gerenderd met de volgende code:

https://github.com/halie404/connect-your-tribe-team-squad-page/blob/b9e69e0349ecfe795a16168affb88a333e4560f6/server.js#L22-L39

De Liquid template student.liquid gebruikt de data om dynamisch HTML te genereren:

https://github.com/halie404/connect-your-tribe-team-squad-page/blob/b9e69e0349ecfe795a16168affb88a333e4560f6/views/student.liquid#L22-L25
