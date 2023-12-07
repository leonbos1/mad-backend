# Inleiding

Dit document beschrijft de minimale stappen die nodig zijn om het backend deel woor de course *Mobile Application Development* draaiend te krijgen.

## Algemene aantekeningen voor de student

De backend kan te allen tijde opnieuw gegenereerd worden op basis van de `application.jdl` en de `model.jdl`. Onderstaande gaat ervan uit dat JHipster is geïnstalleerd (zie [JHipster installatie](https://www.jhipster.tech/installation/)). In dit voorbeeld wordt gebruik gemaakt van een lokaal (projectdomein) installatie en wordt `npx` gebruikt om de generator aan te roepen. Je kunt zelf bepalen hoe je JHipster installeert.

Installeer JHipster (in dit voorbeeld lokaal: https://www.npmjs.com/package/generator-jhipster). Navigeer naar je lege projectmap en typ:

```bash
npm install generator-jhipster
```

LET OP! In versie 8.0.0 zit een bug die foutieve testclasses genereert. Gebruik (indien nog geen nieuwe release is geweest) de `main` versie:

```bash
npm install jhipster/generator-jhipster#main
```

Alternatieve oplossing:

adding the following to the created: com.***.service.UserServiceIT located in /src/test/java/

``` java
import static org.mockito.Mockito.when;
```

### Alternatieve oplossing:

adding the following to the created: com.***.service.UserServiceIT located in /src/test/java/

``` java
import static org.mockito.Mockito.when;
```

- Kopieer de bestanden `application.jdl` en `model.jdl` naar je projectmap.

- Genereer daarna eerst de applicatie zelf:

```bash
npx jhipster jdl application.jdl
```

- Daarna genereer je het model en alle verwante (al gegenereerde) objecten.

```bash
npx jhipster jdl model.jdl
```

- Vervang de gegenereerde seed-data met de data uit de zip. Kopieer de `.csv`-bestanden uit de directory `seeddata` naar `src/main/resources/config/liquibase/fake-data/`. Als alles goed is gegaan kun je nu de applicatie starten:

```
./mvnw
```

Om met een https-verbinding te werken kun je de applicatie achter een ngrok tunnel laten draaien. Bovenstaand commando start de server in development mode, luisterend op poort 8080. [Installeer ngrok](https://ngrok.com/docs/getting-started/) en start de tunnel:

```bash
ngrok http 8080
```


*Let op:* Het is de bedoeling dat iedereen met dezelfde backend werkt. Mocht je ideeën, aanvullingen of verbeteringen hebben voor deze backend, start dan een discussie op github of doe een pull request.