class AlertService{
  constructor(){
    this.divFeedback = document.getElementById('feedback');
  }

  showAlert(type, message){
    const alertClass = this.getAlertClass(type);
    const htmlCode = `
      <div class="alert alert-dismissible ${alertClass}">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>${message}</strong>
      </div>
    `;
    this.divFeedback.innerHTML += htmlCode;
    this.autoDismiss();
  }

  getAlertClass(type){
    switch(type){
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      case 'danger':
        return 'alert-danger';
      default:
        return 'alert-primary';
    }
  }

  autoDismiss(){
    //auto-dismiss  after 5 seconds.(5000 milisecond)
    setTimeout(()=>{
      const alert = document.querySelector('.alert');
      if (alert){
        alert.remove();
      }
    }, 7000);
  }

}//class End

// Usage:
// const alertService = new AlertService();
// alertService.showAlert('success', 'Operation completed successfully!');
// alertService.showAlert('warning', 'Warning: Something went wrong.');