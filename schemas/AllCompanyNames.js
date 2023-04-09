const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    Name: String,
    IncorporationDate: Date,
    SIC: Number
});

module.exports = mongoose.model('AllCompanyNames', companySchema);