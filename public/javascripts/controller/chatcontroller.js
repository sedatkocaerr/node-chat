app.controller('chatController',['$scope',($scope)=>{
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.onlineList=[];
    $scope.rooms=[];
    $scope.chatName = "";
    $scope.message ="";
    $scope.roomId="";

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
        $scope.chatClicked = true;
        $scope.chatName=room.name;
        $scope.roomId=room.id;
    };

    $scope.newMessage = () =>{
        const message = {
            roomId:$scope.roomId,
            message:$scope.message
        };
        socket.emit("newMessage",message);
        $scope.message="";
    };

    
}]);