json.extract! guild_event, :id, :name, :description, :user_id, :starts, :ends, :location, :status, :created_at, :updated_at
json.url guild_event_url(guild_event, format: :json)
