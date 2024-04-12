import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

export default class extends Controller {
  static targets = [ "source" ]

  copy() {
    navigator.clipboard.writeText(this.sourceTarget.value);

    const toastLiveExample = document.getElementById('toast-clipboard')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    
    toastBootstrap.show();
  }
}