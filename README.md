# README

## Guild Hall

### Come for the friends, stay for the friends

Guild Hall is a place to build your local community online.

It is **safe for kids**, and parents have **full visibility** of their children's activities.
There's no private messaging, only the ability to post to your guild.
Even better, there are **no likes and followers** here! Just friends and fun!

# Setup

- Ruby version 3.2.2
- Rails version 7.0.8
- PostgreSql

### To create the rpush apps run:
`$ bundle exec rake rpush:android_app`
`$ bundle exec rake rpush:ios_app`

Useful checks with rails console:
`Rpush::Gcm::App.all`
`Rpush::Notification.all`

# Local Startup

- `bundle install`
- `rails db:migrate`
- `rails s`

# linux local dev setup (optional)

- sudo apt install libvips
