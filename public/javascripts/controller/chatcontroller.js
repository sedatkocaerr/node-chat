app.controller('chatController',['$scope','userFactory','chatFactory',($scope,userFactory,chatFactory)=>{
    
    /**
     * Initialization
     */

     function init(){
         userFactory.getUser().then(user=>{
            $scope.user = user;
         })
     }
     init();
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.loadingMessages=false;
    $scope.onlineList=[];
    $scope.rooms=[];
    $scope.chatName = "";
    $scope.message ="";   
    $scope.roomId="";
    $scope.messagelist=[];
    $scope.user = {};

    const socket = io.connect("http://localhost:3000");

    socket.on('onlinelist',users=>{
        $scope.onlineList=users;
        //  $scope.$apply();
    });

    socket.on('rooms',rooms=>{
        $scope.rooms=rooms;
        $scope.$apply();
    });

    $scope.newRoom =()=>{

        //let randomName = Math.random().toString(36).substring(10);
        let roomName = window.prompt("enter Room Name");
        if(roomName!==''&& roomName!==null)
        {
            socket.emit('newRoom',roomName);
        }
    };
    $scope.changeTab = tab=>{
        $scope.activeTab=tab;
        // $scope.$apply();
    };

    $scope.switchRoom=room =>{
        $scope.chatName=room.name;
        $scope.roomId=room.id;
       
        $scope.chatClicked = true;
        if(!$scope.messagelist.hasOwnProperty(room.id))
        {
            $scope.loadingMessages = true;
            
            chatFactory.getMessages(room.id).then(data=>{
                $scope.messagelist[room.id]=data;
                $scope.loadingMessages = false;
            });
        }
        
    };

    $scope.newMessage = () =>{
        if($scope.message.trim()!==''){
        const message = {
            roomId:$scope.roomId,
            message:$scope.message
        };

        socket.emit("newMessage",message);

        $scope.messagelist[$scope.roomId].push({
            userId:$scope.user._id,
            username:$scope.user.name,
            surname:$scope.user.surname,
            message:$scope.message
        });

        $scope.message="";
    };
}

    socket.on('newMessageRooms',message =>{
        $scope.messagelist[message.roomId].push(message);
        $scope.$apply();
    });
    
}]);