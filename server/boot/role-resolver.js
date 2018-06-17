// module.exports = function(app) {
//   var Role = app.models.Role;

//   Role.registerResolver('teacher', function(role, context, cb) {
//     function reject() {
//       process.nextTick(function() {
//         cb(null, false);
//       });
//     }

//     // do not allow anonymous users
//     var userId = context.accessToken.userId;
//     if (!userId) {
//       return reject();
//     }

//     // check if userId is in team table for the given project id
//     context.model.findById(context.modelId, function(err, model) {
//       if (err || !model)
//         return reject();

//       var Team = app.models.Team;
//       Team.count({
//         participant: model.participant,
//         memberId: userId,
//       }, function(err, count) {
//         if (err) {
//           console.log(err);
//           return cb(null, false);
//         }

//         cb(null, count > 0); // true = is a team member
//       });
//     });
//   });
// };
