var Counter = function() {
  this.total = 0;
  this.count = 0;
  this.current = 0;
  this.timer;
}

Counter.prototype = {
  init: function() {
    var self = this;
    self._detectTotalChange();
    // Using e.preventDefault with click action to prevent form action
    $('#submit').click(function(e){
      e.preventDefault();
      self.start();
    });
    $('#reset').click(function(e){
      e.preventDefault();
      self._reset();
    });
    $('#restart').click(function(e){
      e.preventDefault();
      self._clear();
      self.start();
    });
  },
  _setValues: function() {
    $('#current').text(this.current);
    $('#total').text(this.total);
  },
  _detectTotalChange: function() {
    var self = this;
    $('input[type=number]').on('change paste keyup', function(){
      self.total = $(this).val();
      self._setValues();
    });
  },
  _moduloCheck: function() {
    $('.block-container .block').removeClass('active');
    if(this.current > 0){
      var div3 = this.current % 3 == 0;
      var div8 = this.current % 8 == 0;
      if(div3 && !div8) {
        $('#fingers').addClass('active');
      }
      if(!div3 && div8) {
        $('#toes').addClass('active');
      }
      if(div8 && div3) {
        $('.block-container .block').addClass('active');
      }
    }
  },
  _reset: function() {
    this._clear();
    $('#total').text(0);
    $('input[type=number]').val('');
  },
  _clear: function() {
    clearInterval(this.timer);
    $('.block-container .block').removeClass('active');
    this.current = 0;
    this.count = 0;
    $('#current').text(0);
  },
  start: function() {
    var self = this;
    if(self.count >= self.total) return;
    self.timer = setInterval(function(){
      self.count++;
      if(self.count == self.total) clearInterval(self.timer);
      self.current = self.count;
      self._setValues();
      self._moduloCheck();
    }, 1000);
  }
}
