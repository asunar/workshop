  var SessionView = function(session) {

      this.initialize = function() {
          this.$el = $('<div/>');
					this.$el.on('click', '.add-location-btn', this.addLocation);
					this.$el.on('click', '.addBtn', this.addToCalendar);
					this.$el.on('click', '.shareBtn', this.share);
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

this.addToCalendar = function() {
    if (window.plugins.calendar) {
        var hour = session.time.substring(0,session.time.indexOf(':'));
        if (session.time.indexOf("pm")>-1)
            hour = parseInt(hour)+12;

        var startDate = new Date(2014,9,23,hour,00,00); //set to PG Day workshop date
        var endDate = new Date();
        endDate.setTime(startDate.getTime() + 3600000);//one hour

        var calSuccess = function (message) {
            alert(session.title + " has been added to your calendar.");
        };
        var calError = function (message) {
            alert("Error: " + message);
        };
        window.plugins.calendar.createEvent(session.title, session.room, session.description, startDate, endDate,
            function(){alert(session.title + " has been added to your calendar.");}, function (error) {
                alert("Calendar fail " + error);
            });
    }
    else alert("Calendar plugin not found");
};

this.share = function() {
  if (window.plugins.socialsharing) {
      window.plugins.socialsharing.share("I'll be attending the session: " + session.title + ".",
          'PhoneGap Day 2014', null, "http://pgday.phonegap.com/us2014",
          function () {
              console.log("Success")
          },
          function (error) {
              console.log("Share fail " + error)
          });
  }
  else console.log("Share plugin not found");
}

      this.initialize();
  }
