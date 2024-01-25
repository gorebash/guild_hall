import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static targets = [ "messageBody", "messageContainer" ]

  connect() {
    console.log("chat controller connected");
    this.messageContainerTarget.scrollTop = this.messageContainerTarget.scrollHeight;
  }

  reset() {
    setTimeout(() => { 
      this.messageBodyTarget.value = "";
      this.messageContainerTarget.scrollTop = this.messageContainerTarget.scrollHeight;
    }, 100)
  }
}
