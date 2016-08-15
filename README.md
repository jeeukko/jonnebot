# JonneBot
Simple IRC-bot framework

## Features
* Plugin based system (see wiki)
* More to come

## Todo
* This Todo
* Documentation & examples
* More plugins
* Plugin & config hot-reload

## Plugins (see the wiki)
* Chat (Says hello to joiner)
* Linkcheck (Get title from linked page)
* Mailchimp (Notifies of subscribers)
* Notification (Notifications via GET url)
* Reddit (Post links to Reddit)
* Rss (RSS-feed parser & poster)

## Installing
1. `git clone https://github.com/jeeukko/jonnebot`
2. `cd jonnebot`
3. `npm install`
4. Rename `config-template.json` to `config.json` and edit
5. If you want use plugins, add them to `config.json` file (and edit `plugins/<plugin name>/config.json` file if needed)
6. `node index.js` or `nodejs index.js` or PM2 etc...
