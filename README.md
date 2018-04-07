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
  currId: 0,
  cheat: false
  lines: [
    {
      id: 1,
      title: "presentation",
      nextId: 2,
      prevId:"0",
      mdp: ""
    },
    {
      id: 2,
      title: "map",
      nextId: 0,
      prevId:"1",
      mdp: "silence"
    },
    ...
  ]
}
```

## Display

L'affichage se fera avec une simple page web dynamique, les infrmations seront obtenue par un appel

The display will consist in a simple dynamic page, getting information through a REST call.
The routes will be :
```
index             -- index -- .
get_page          -- GET   -- /id?mdp=[password]
get_page          -- GET   -- /information
envois une ligne  -- GET   -- /manage
envois une ligne  -- POST  -- /manage [title|nextId|prevId|mdp]
```


## Special Setup

I have only one VPS to host several website (espacialy SilenceMap and my future CVs) so O used a node module called "http-multi-site" and modified the file
/usr/lib/node_modules/http-multi-site/proxy.json with this :
```
{
  "hostnameOnly": "true",
  "domains": {
    "silencemap.xyz": {
       "hostport": "localhost:3000",
       "dir": "/root/server/SilenceMap
    },
    "cetassez.fr": {
       "hostport": "localhost:3001",
       "dir": "/root/cetassez"
    }
  }
}
```

And I should be good to go !
