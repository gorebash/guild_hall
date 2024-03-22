
# namespace 'test' do                                                                  
#     task 'add_friendly_slugs' do                                                          
#         Guild.find_each(&:save)                                                                            
#     end                                                                                
# end

# Rake::Task['test'].enhance ['test:add_friendly_slugs'] 