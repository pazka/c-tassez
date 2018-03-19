# C-étassez project

Le projet est un petit site web sur le principe d'accès très restreint et dirigé par l'artiste d'une page à l'autre.
Le contrôle se fait à l'aide de mot de passe et uniquement depuis une page précédente spécifique. L'artiste
peut ainsi choisir le parcours du spectateur.
Le site continedra également une Interface Utilisateur admin permettant à l'artiste d'ajouter facilement de nouvelle pages.

This project is a small website on the principle that you must know the password of a page to access it.
It also contains an admin UI to easly add new pages to the website.

## Persistance des données

La persistance des information the fera avec un simple fichier JSON stocké sur le serveur.
Ce fichier la forme suivante :

The persistence will be held by the server in a simple persist way. A Json will be stored containing all informations :
the format will be :

```
{
  "currId": 0,
  "cheat": false
  "lines": [
    {
      "id": 1,
      "title": "presentation",
      "nextId": 2,
      "prevId":"0",
      "mdp": ""
    },
    {
      "id": 2,
      "title": "map",
      "nextId": 0,
      "prevId":"1",
      "mdp": "silence"
    },
    ...
  ]
}
```

## Display

The display will consist in a simple dynamic page, getting information through a REST call.
The routes will be :
```
index             -- index -- .
get_page          -- GET   -- /id?mdp=[password]
envois une ligne  -- GET   -- /manage
envois une ligne  -- POST  -- /manage [title|nextId|prevId|mdp]
```
