const { BaseModel } = require("./base-model");

class User extends BaseModel{
    constructor(data){
        super();
        this.email = null;
        this.isAdmin = false;
        if(data){
            this.mapData(data);
        }
    }
}

module.exports = {User};