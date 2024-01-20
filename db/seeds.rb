# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


users = User.create([
  { email: "brent.gore@gmail.com", username: "heavymetal", birth_date: "1980-01-01", password: "pass123" },
  { email: "brent1@example.com", username: "brentclone1", birth_date: "2010-01-01", password: "pass123" },
])

guilds = Guild.create([
  { name: "Bananaramas", description: "Its all about bananas" },
  { name: "Coram Deo Co-op", description: "Homeschool coop" },
  { name: "Breakfast club", description: "Detention hall mostly" },
])

GuildMember.create([
  { user_id: users[0].id, guild_id: guilds[0].id },
  { user_id: users[0].id, guild_id: guilds[1].id },
  { user_id: users[1].id, guild_id: guilds[1].id },
  { user_id: users[1].id, guild_id: guilds[2].id },
])