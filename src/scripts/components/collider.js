AFRAME.registerComponent('collider-test', {
  schema: {
    
  },

  init: function () {
    const element = this.el;
    element.addEventListener('collide', function(e) {
      console.log(e);
      console.log('Player has collided with body #' + e.detail.body.id);

      console.log(e.detail.target.el);  // Original entity (playerEl).
      console.log(e.detail.body.el);    // Other entity, which playerEl touched.
      console.log(e.detail.contact);    // Stats about the collision (CANNON.ContactEquation).
      console.log(e.detail.contact.ni); // Normal (direction) of the collision (CANNON.Vec3).
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame
  }
});
