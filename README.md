# Translectra

> Open-source Translation Management System in NodeJS.

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://img.shields.io/travis/Electra-project/translectra.svg?style=flat-square)](https://travis-ci.org/Electra-project/translectra)
[![David](https://img.shields.io/david/Electra-project/translectra.svg?style=flat-square)](https://david-dm.org/Electra-project/translectra)
[![David](https://img.shields.io/david/dev/Electra-project/translectra.svg?style=flat-square)](https://david-dm.org/Electra-project/translectra)

[![NSP Status](https://nodesecurity.io/orgs/ivan-gabriele/projects/9a5931e7-b38c-4e64-9a6f-c832982ab133/badge)](https://nodesecurity.io/orgs/ivan-gabriele/projects/9a5931e7-b38c-4e64-9a6f-c832982ab133)

## Introduction

This TMS is highly inspired by [Attlassian Translations](https://translations.atlassian.com/) which is unfortunately not open-sourced. We all know how translations management can be laborious and we tried to create a tool that can fit multiple kind of projects: software development, documentation, marketing, etc.

We have started implementing a full versionning system (for both translation keys and projects).

## Features

- Ready to deploy: can be automatically integrated with a CI host (Heroku, AWS, Azure, etc)
- Cross-projects translation keys
- Multiple submissions management for each key (per language)
- Voting and approval system for submitted translations
- Keys versionning
- Markdown support

## Roadmap

- Projects versionning (in progress)
- Default language setting
- XLIFF and Gettext PO exports
- JSON, XLIFF and Gettext PO imports
- Comment translation submissions
- Edit translation submissions
- User dashboard

## Demo

We are using this tool to handle all our translations: [https://translations.electraproject.org](https://translations.electraproject.org). You won't be able to see the administrators and managers part but it will give you a good idea of how it works.

## Deploy

Translectra is quite easy to deploy and just require environment variables and a Google developer account to be set in order to work There is no need to touch the code at all if you use modern CI environments like Heroku.

### Setup Google signup/login

Since Translectra is dedicated to crowdsourced translations, we found that the most universal and easiest way to manage the authentication process was only support the signup/login via Google accounts, at least for the current major version.

You thus need to setup a [Google Developer account](https://console.developers.google.com) if you don't already have one.

Once it's done, you'll need to setup your credentials, with `https://www.example.com/auth/callback` as authorized redirect URIs. You can add `https://localhost/auth/callback` if you want to run it locally.

You will also need to enable the **Google+ API**.

### Mandatory environment variables

- **GOOGLE_API_KEY**: your Google API credentials `client_id`.
- **GOOGLE_API_SECRET**: your Google API credentials `client_secret`.
- **MONGODB_URL**: your full MongoDB url.
- **SESSION_SECRET**: a randomly generated, long and complex passphrase.
- **WEBSITE_NAME**: your translation website name.
- **WEBSITE_URL**: your translation website url _(**without** slash at the end)_.

### Heroku

1. Create your heroku app in the dashboard or via the Heroku Toolbelt.
2. Add a MongoDB add-on, **mLab MongoDB** for example.
3. Set up the [mandatory environment variables](#mandatory-environment-variables) in your app settings.
4. Clone the project locally:<br>
   `git clone https://github.com/Electra-project/translectra.git`
5. Enter the directory:<br>
   `cd translectra`
6. Link your Heroku app:<br>
  `heroku git:remote -a translectra` _(Replace "translectra" by the name of your Heroku app)_
7. Push the project to Heroku:<br>
   `git push heroku master`

That's it ! It should automatically build and deploy now ;)

## Contribute

### Getting Started

    git clone https://github.com/Electra-project/translectra.git
    cd translectra
    npm i

### Start developing

Once you're all set up, you can start coding:

    npm run start:dev

will automatically start a "live" watch compiling the backend & frontend JS code (in `build` folder) on file changes.
