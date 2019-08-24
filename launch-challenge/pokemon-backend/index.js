const express = require("express");
const api = require("./api");
const redis = require("redis");

const app = express();

const baseUrl = "https://pokeapi.co/api/v2/";

const cacheClient = redis.createClient(6379);
cacheClient.on("error", err => {
  console.log("Redis error: " + err);
});

const pokemonList = [
  "lapras",
  "chansey",
  "mewtwo",
  "mew",
  "gengar",
  "machamp",
  "rhydon",
  "dragonite",
  "gyarados",
  "jolteon",
  "flareon",
  "vaporeon",
  "articuno",
  "moltres",
  "zapdos",
  "golem",
  "onix",
  "jynx",
  "magmar",
  "electabuzz",
  "pidgeot",
  "nidoking",
  "nidoqueen",
  "charizard",
  "venusaur",
  "blastoise"
];

var cache = duration => {
  return (req, res, next) => {
    let key = "express:url:" + req.originalUrl || req.url;
    cacheClient.get(key, (cacheErr, cacheRes) => {
      if (cacheRes) {
        return res.json({
          source: "cache",
          data: JSON.parse(cacheRes)
        });
      } else {
        res.sendResponse = res.send;
        res.send = body => {
          cacheClient.setex(key, duration * 1000, body);
          res.sendResponse(body);
        };
        next();
      }
    });
  };
};

app.use(express.urlencoded({ extended: false }));

app.get("/:pokemonName", cache(10), (req, res) => {
  api
    .API_CALL(baseUrl + "pokemon/" + req.params.pokemonName)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error.toString());
    });
});

app.listen(9000, () => console.log("App running on port 9000"));
