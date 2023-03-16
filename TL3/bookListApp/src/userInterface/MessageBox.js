class MessageBox {
  constructor(messageBoxId, animater) {
    this.$messageBox = document.querySelector(messageBoxId);
    this.animater = animater; /// vllt gehts mit constructor 
  }
  

  showMessage(message, className) {
    const $message = document.createElement("div");
    $message.innerHTML = message;
    $message.classList.add(className, "alert");

    this.$messageBox.appendChild($message);

    this.animater.showElement(this.$messageBox);

    //  Clear in 2 seconds
    setTimeout(() => {
      this.animater.hideElement(this.$messageBox, () => {
        $message.remove();
      });
    }, 3000);
  }
}

export {MessageBox};
