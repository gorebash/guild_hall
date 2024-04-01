
namespace 'test' do                                                                  
    task 'add_friendly_slugs' do                                                          
        Guild.find_each(&:save)                                                                            
    end                                                                                
end

# Rake::Task['test:add_friendly_slugs'].invoke