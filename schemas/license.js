const mongoose = require('mongoose');
const { Schema } = mongoose;

const licenseSchema = new Schema({
    productId: String,
    date: Date,
    licenseType: Number
});

licenseSchema.methods.getFormatedDate = function(){

    var fullYear = this.date.getFullYear().toString();
    var date = this.date.getDate().toString();
    var month = (this.date.getMonth()+1).toString();
    var hours = this.date.getHours().toString();
    var seconds = this.date.getSeconds().toString();
    var minutes = this.date.getMinutes().toString();

    if (date.length<2) date="0"+date;
    if (month.length<2) month="0"+month;
    if (hours.length<2) hours="0"+hours;
    if (seconds.length<2) seconds="0"+seconds;
    if (minutes.length<2) minutes="0"+minutes;

    var formatedDate = fullYear+month+date+"-"+hours+minutes+seconds;//yyyymmdd-hhmmss
    return formatedDate; 
}

licenseSchema.methods.toFormatString = function()
{
    var fullYear = this.date.getFullYear().toString();
    var date = this.date.getDate().toString();
    var month = (this.date.getMonth()+1).toString();
    var hours = this.date.getHours().toString();
    var seconds = this.date.getSeconds().toString();
    var minutes = this.date.getMinutes().toString();

    if (date.length<2) date="0"+date;
    if (month.length<2) month="0"+month;
    if (hours.length<2) hours="0"+hours;
    if (seconds.length<2) seconds="0"+seconds;
    if (minutes.length<2) minutes="0"+minutes;

    var formatedDate = date+"/"+month+"/"+fullYear+" "+hours+":"+minutes+":"+seconds;//yyyymmdd-hhmmss
  
    return "FBTool-"+this.productId+"|"+formatedDate+"|"+this.licenseType;
}

module.exports = licenseSchema;
