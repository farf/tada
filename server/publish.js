Meteor.startup(function() {
    var require = __meteor_bootstrap__.require
    var connect = require('connect')
    __meteor_bootstrap__.app.use(connect.basicAuth('yvan', 'dEzHlm1k5l!'))
    var basicAuth = __meteor_bootstrap__.app.stack.pop()
    __meteor_bootstrap__.app.stack.unshift(basicAuth)
})