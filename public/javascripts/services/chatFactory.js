// import { response } from "express";

app.factory('chatFactory',['$http','env',($http,env)=>{
    const getMessages = (roomId =>{
        return $http({
            url :env.SERVICE_URL+'/messages/list',
            method :'GET',
            params :{
                roomId
            }
        }).then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err);
        });
    });

    return {
        getMessages
    }
}]);