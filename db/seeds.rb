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
  { name: "Bananaramas", description: "We're sorry" },
  { name: "SVCH", description: "Spokane Valley Christian Homeschool Co-op" },
  { name: "Breakfast club", description: "Detention hall mostly" },
])

GuildMember.create([
  { user_id: users[0].id, guild_id: guilds[0].id, role: :owner },
  { user_id: users[0].id, guild_id: guilds[1].id, role: :member },
  { user_id: users[1].id, guild_id: guilds[1].id, role: :owner },
  { user_id: users[1].id, guild_id: guilds[2].id, role: :admin },
])

JoinRequest.create([
  { user_id: users[0].id, guild_id: guilds[2].id, invite_code: guilds[2].invite_code },
  { user_id: users[1].id, guild_id: guilds[0].id, invite_code: guilds[0].invite_code },
])

GuildEvent.create([
  { user_id:2, starts:"2024-04-10", location:"Gorehold", description: "Come and celebrate Ashley", name: "Ashleys Birthday!" },
  { user_id:2, starts:"2024-04-16", location:"Gorehold", description: "Come and celebrate Josh", name: "Joshies Birthday" },
])