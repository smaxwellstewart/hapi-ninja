Seedbox Test 2
==========

## The Brief:

L'association française de réputation des parisiens émigrés dans le monde a besoin de statistiques sur la réputation de ses membres.
Afin de pouvoir lancer sa campagne de communication 'Un parisien, c'est bien' au budget pantagruellique, vous êtes mandatés pour definir une API REST exposant l'ensemble des sondages effectués à travers le monde. Cette API permet à différentes applications de créer une interface pour tout ces questionnaires et de renvoyer les réponses de chaque participant pour que vous puissiez les stocker.
Il vous faudra donc modéliser l'ensemble des questionnaires dont les templates sont joints dans les fichier attachés (*.txt) dans le système de gestion de donnée de votre choix, avec les language, outil et/ou framework de votre choix, et les exposer au travers de cette API pour consultation et modification. Vous n'aurez pas besoin de dessiner d'interface ou d'afficher autre chose que des réponses HTTP (JSON).

En bonus, vous pourrez proposer une architecture et/ou un outil qui permettrai de connaître en temps réel, les résultats du sondage, et de faire un 'scoring' de la réputation ainsi obtenue en fonction d'une ponderation en point de chaque réponse et de l'importance de chaque question. Cette architecture devra être pensée et dimensionner jusqu'à pouvoir atteindre plus de 1 milliard de répondant dans le monde.

## The Stack:
**Node.js** - Because it's fast, easy to get started, and Javscript is awesome.
[http://nodejs.org/](http://nodejs.org/)

**Hapi** - A very well designed server framework that is easy to understand, easy to create your own plugins, scales very well, cache options built in, and more.
[http://spumko.github.io/](http://spumko.github.io/)

**Mongo** - A great NoSQL database that handles JSON natively, perfect fit for Node.js projects.
[http://www.mongodb.org/](http://www.mongodb.org/)

**Swig** - It looks like HTML, it's very fast, great for template inheritance, and allows you to use HTML syntax with the server and with front-end client Javascript includes.
[http://paularmstrong.github.io/swig/](http://paularmstrong.github.io/swig/docs/#browser)

**CSS Framework** - None. Choose your own CSS preprocessor and CSS framework.

**Gulp** - A task runner for your assets, and can do a lot more. The performance is amazing and it is easy to get started. [http://gulpjs.com/](http://gulpjs.com/)

### Requirements:
Install Node.js by using the big install button on the [http://nodejs.org/](http://nodejs.org/) homepage.

After Node.js is installed, clone this repo, change `cd` to this directory, and run `npm install`

```bash
$ git clone https://github.com/smaxwellstewart/hapi-ninja.git --branch seedbox
$ cd hapi-ninja
$ npm install
```

Start the server by running the command:
```
$ node server
```

To see any changes you can manually just shutdown and restart the node server. This can be a pain so I use PM@ to watch for file changes and restart the server [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

To install run:
```
$ npm install -g pm2
```

To use it run:
```
$ pm2 start server.js -n seedbox --watch
```

Now all of your server html and js files are being watched and on change the node server gets restarted automatically.

#### Production
Before going into production you will want to concatenate and minify your assets. This will increase performance for your user. We will use Gulp for this.

To install run:
```
npm install -g gulp
```

Now you can run `gulp` from the command line and it will run the tasks in the `gulpfile.js`. The current tasks will minify and optimize your CSS, JS, and Images. If you want more tasks you can go to the Gulp Plugin page. [http://gratimax.github.io/search-gulp-plugins/](http://gratimax.github.io/search-gulp-plugins/)

## Plugins
The Hapi plugins that are being used.

### Toothache
A Hapi plugin that removes the toothache from creating CRUD endpoints for MongoDB. This plugin is configured using model files located in server/models/, once configured we have a number of request handlers for performing basic crud from a Hapi server into a MongoDB. [https://github.com/smaxwellstewart/toothache](https://github.com/smaxwellstewart/toothache)

#### Hapi-Named-Routes
Added names to the routes. This allows you to have access to the path in the templates just by using the `path.nameofroute` variable. [https://github.com/poeticninja/hapi-named-routes](https://github.com/poeticninja/hapi-named-routes)

#### Hapi-Assets
Assets are in the `./assets.js` file, and your view layer has access based on the node environment. If you are in `development` (default) you might want to have individual files (js,css). If you are in `production` you would want the assets combined for user performance. [https://github.com/poeticninja/hapi-assets](https://github.com/poeticninja/hapi-assets)

#### Hapi-Cache Buster
Client/browser reloads new assets based on package.json version of your application. [https://github.com/poeticninja/hapi-cache-buster](https://github.com/poeticninja/hapi-cache-buster)

#### Folder Structure
There are two main folders in the stack. The "**public**" folder for front-end (client side) code, and "**server**" folder for server side code.

By having the front-end folder and server side folder be specific, it provides for better consistency when changing projects. This way when you change from a full front-end app (Phonegap), to a front-end and server side app you get to keep the same folder structure. Allowing for better consistency with your stack, projects, and tools.

