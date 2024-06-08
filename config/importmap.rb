# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'

# pin 'jquery', to: 'https://code.jquery.com/jquery-3.6.0.min.js'
# pin 'semantic-ui', to: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js'
pin '@rails/actioncable', to: 'actioncable.esm.js'
pin "@rails/actiontext", to: "actiontext.js"
pin_all_from 'app/javascript/channels', under: 'channels'

pin 'bootstrap', to: 'https://ga.jspm.io/npm:bootstrap@5.3.2/dist/js/bootstrap.esm.js'
pin '@popperjs/core', to: 'https://ga.jspm.io/npm:@popperjs/core@2.11.8/lib/index.js'
pin "trix"

# ./bin/importmap pin firebase/messaging
pin "@firebase/app", to: "@firebase--app.js" # @0.10.5
pin "@firebase/component", to: "@firebase--component.js" # @0.6.7
pin "@firebase/installations", to: "@firebase--installations.js" # @0.6.7
pin "@firebase/logger", to: "@firebase--logger.js" # @0.4.2
pin "@firebase/messaging", to: "@firebase--messaging.js" # @0.12.9
pin "@firebase/util", to: "@firebase--util.js" # @1.9.6
pin "idb" # @8.0.0
pin "firebase/messaging/sw", to: "firebase--messaging--sw.js" # @10.12.2
pin "@firebase/messaging/sw", to: "@firebase--messaging--sw.js" # @0.12.9
