(function() {

   /* ---------------------------------- Local Variables ---------------------------------- */
	var slider = new PageSlider($('body'));
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    SessionListView.prototype.template = Handlebars.compile($("#session-list-tpl").html());
	 SessionView.prototype.template = Handlebars.compile($("#session-tpl").html());
    var service = new ConferenceService();
    service.initialize().done(function() {
        console.log("Service initialized");
				
      router.addRoute('', function() {
          slider.slidePage(new HomeView(service).render().$el);
      });

      router.addRoute('sessions/:id', function(id) {
          service.findById(parseInt(id)).done(function(session) {
              slider.slidePage(new SessionView(session).render().$el);
          });
      });

      router.start();

    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function() {
        FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function(message) {
                navigator.notification.alert(
                    message, // message
                    null, // callback
                    "Workshop", // title
                    'OK' // buttonName
                );
            };
        }
    }, false);



}());

