# JonneBot
Simple IRC-bot framework

## Features
* Plugin based system (see plugins dir)
* Users database
* More to come

## Todo
* This Todo
* Documentation & examples

## Plugins
* Basic (this MUST be enabled)

Handles `!restart` command
* User

Basic user database & auto OP
* Reddit link poster

Post every link to reddit

## Installing
1. `git clone https://github.com/jeeukko/jonnebot`
2. `npm install`
3. Rename `jonnebot-template.db` to `jonnebot.db` and add users
4. Rename `config-template.json` to `config.json` and edit to wanted
5. If you want use plugins, add them to `config.json` file (and edit `plugins/<plugin name>/config.json` file if needed)
6. `node index.js` or `nodejs index.js` or PM2 etc...
