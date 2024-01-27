json.extract! join_request, :id, :user_id, :guild_id, :invite_code, :status, :created_at, :updated_at
json.url join_request_url(join_request, format: :json)
