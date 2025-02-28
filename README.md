# Squadpage team Epic

## Beschrijving

## Design concept 

![Group 140](https://github.com/user-attachments/assets/ced0dcf7-0388-4f51-a8b3-e77fbef24ee3)

### Teamleden & bijdragen 

Halima

[Dylan](https://github.com/DivaniNL)

Ik heb me vooral bezig gehouden met de server.js en de POST-Request.
Hieronder een video waarin te zien is dat de quote aanpasbaar is.

https://github.com/user-attachments/assets/10c28269-143a-4c33-8216-9b3f96b31efd



### Karima
Ik ben verantwoordelijk geweest voor de detailpagina. Als je vanuit de homepage klikt op een specifiek persoon kom je op de detailpagina. Hierin staat de naam, bio, meeste energie, en favoriete gerecht. Ook staat er op het laatst een formulier waarin de student een quote kan toevoegen. Na het submitten van de quote wordt de quote opgeslagen in de database. De laatst getypte quote komt onder de foto te staan (feedback, zie hierboven). De detailpagina is responsive. Op een mobiele scherm wordt alle content onder elkaar geplaatst (one-column-layout). Op een grotere scherm verandert de lay-out in een two-column-layout. De foto en quote komen aan de linkerkant te staan, waar de informatie over de student aan de rechterkant staat.

![image](https://github.com/user-attachments/assets/58be9395-452e-4ff2-a329-323d97cedcb3)

Dit is een demonstratie van het invoeren van de quote:

https://github.com/user-attachments/assets/145c00f9-c6bb-4340-8ff6-e7e3aeb4f56e

#### Styling
De styling is gebasseerd op de homepagina. De kleur van de logo heb ik terug laten komen in de 'back' en 'submit' button. Ook is de paarse kleur terug te vinden als box-shadow om de inputveld (law of similarity). Op de buttons is feedforward toegepast door de buttons een label te geven. 

<img width="635" alt="image" src="https://github.com/user-attachments/assets/735512c7-927f-4d28-a255-ccfc40f32a10" />

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

## Installatie

Om dit project lokaal te installeren en te draaien, volg je de onderstaande stappen:

### Vereisten
- Node.js (versie 14 of hoger)
- npm (Node Package Manager, wordt meestal samen met Node.js geïnstalleerd)
- GitHub Desktop (niet per se nodig, maar werkt fijn)

### Stappen

1. **Clone de repository**
    - Ga naar de repository: https://github.com/halie404/connect-your-tribe-team-squad-page
    - Klik op Code (groene knop) -> Open with GitHub Desktop
    - Klik op Clone
    - Selecteer "For my own purposes"

2. **Open het project in je codeeditor**

3. **Installeer de afhankelijkheden**
   - Gebruik npm om de benodigde pakketten te installeren door het volgende commando in de terminal uit te voeren:
   ```bash
   npm install
   ```

4. **Start de ontwikkelserver**
   - Start de server met het volgende commando:
   ```bash
   npm start
   ```

5. **Open de applicatie in je browser**
   - De server draait nu op `http://localhost:8000`. Open deze URL in je webbrowser om de applicatie te bekijken.

Volg deze stappen om de ontwikkelomgeving in te richten en aan de repository te kunnen werken. Als je vragen hebt of tegen problemen aanloopt, neem contact op met de projectbeheerders (Halima, Karima, Dylan).

