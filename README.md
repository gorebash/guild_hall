# README

## Guild Hall

### Come for the friends, stay for the friends

Guild Hall is a place to build your local community online.

It is **safe for kids**, and parents have **full visibility** of their children's activities.
There's no private messaging, only the ability to post to your guild.
Even better, there are **no likes and followers** here! Just friends and fun!

# Dev Setup

- Ruby version 3.2.2
- Rails version 7.0.8
- PostgreSql

## local startup

- `bundle install`
- `rails db:migrate`
- `rails s`

## local dev setup (optional)

- `sudo apt install libvips`

## local ssl (optional)

- Add an entry to /etc/hosts:

  - `sudo vim /etc/hosts`
  - New entry: `127.0.0.1   guild-hall.local`

- Create a self-signed cert:

  `openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout config/ssl/guild-hall.local.key -out config/ssl/guild-hall.local.crt -config config/ssl/openssl.config`

  (Good for one year, regenerate each year)

- Trust the self-signed cert:

  `sudo cp config/ssl/guild-hall.local.crt /etc/ssl/certs/`

- Toggle SSL (config/development.rb):
  `config.force_ssl = true`
