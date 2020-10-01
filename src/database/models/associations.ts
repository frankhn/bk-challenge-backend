
import Application from "../../resources/applications/application.model";
import Job from "../../resources/jobs/job.model";
import User from "../../resources/users/user.model";



User.hasMany(Job, {
    foreignKey: 'id'
})

User.hasMany(Application, {
    foreignKey: 'id'
})


Job.belongsTo(User, {
    foreignKey: 'userid'
})

Application.belongsTo(User, {
    foreignKey: 'userid'
})

Application.belongsTo(Job, {
    foreignKey: 'jobid'
})

export { }