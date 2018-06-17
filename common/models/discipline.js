'use strict';

module.exports = function (Discipline) {
  Discipline.afterRemote('create', function (ctx, user, next) {

    user.updateAttribute('secretWord', makeid());
    next();
  });
};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
