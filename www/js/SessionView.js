  var SessionView = function(session) {

      this.initialize = function() {
          this.$el = $('<div/>');
					this.$el.on('click', '.add-location-btn', this.addLocation);
      };

      this.render = function() {
          this.$el.html(this.template(session));
          return this;
      };

  this.addLocation = function(event) {
      event.preventDefault();
      navigator.geolocation.getCurrentPosition(
          function(position) {
              alert(position.coords.latitude + ',' + position.coords.longitude);
          },
          function() {
              alert('Error getting location');
          });
      return false;
  };			

      this.initialize();
  }
