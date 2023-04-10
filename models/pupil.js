const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const pupilSchema = new Schema(
    {
        fullName: { type: String },
        dateOfBirth: { type: String },
        gender: { type: String },
        address: { type: String },
        email: { type: String },
        password: { type: String },
        photo: { type: String },
        parentName: { type: String },
        parentPhoneNumber: { type: String },
        emergencyName: { type: String },
        emergencyPhoneNumber: { type: String },
        emergencyRelationship: { type: String },
        admin:{type:Boolean, default: false}
    },
    {
        timestamps: true,
    })

    pupilSchema.methods.comparePassword = function(password) {
        return password === this.password;
      };

    pupilSchema.pre('save', async function (next) {

        try {
    
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            next()
    
    
        } catch (error) {
            next(error)
    
        }
    })
    

pupilSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error

    }
}

let pupilModel = mongoose.model('pupil', pupilSchema);

module.exports = pupilModel;