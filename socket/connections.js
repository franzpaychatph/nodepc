//Store ua_number => socket.id in userSockets array
const addSocketUser = async (userSockets, user, socket) => {
    socket.data.ua_number = user.ua_number;
    if(user.ua_number === undefined){
        //do nothing
    } else {
        console.log('addSocketUser');
        userSockets.set(user.ua_number, socket.id);
        console.log([...userSockets.entries()]);
    }
};

//Remove ua_number => socket.id in userSockets array
const removeSocketUser = async (userSockets, user, socket) => {
    if(user.ua_number === undefined){
        //do nothing
    } else {
        console.log('removeSocketUser');
        userSockets.delete(user.ua_number);
        console.log([...userSockets.entries()]);
    }
};

//Check if ua_number => socket.id is active in userSockets array
const checkSocketStatus = async (userSockets, ua_number) => {
    console.log('checkSocketStatus: ' + ua_number);

    let is_socket_active = userSockets.has(ua_number.toString());
    return is_socket_active;
}

//Get socket.id by ua_number
const getSocketIdByUaNumber = async (userSockets, ua_number) => {
    let socket_id = userSockets.get(ua_number.toString());
    console.log('getSocketIdByUaNumber: ' + ua_number + ' = ' + socket_id);
    if(socket_id === undefined){
        return false;
    } else {
        return socket_id;
    }
}

module.exports = {
    addSocketUser,
    removeSocketUser,
    checkSocketStatus,
    getSocketIdByUaNumber
};






