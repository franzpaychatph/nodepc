//Store ua_number => socket.id in userSockets array
const addSocketUser = async (userSockets, user, socket) => {
    console.log('addSocketUser');

    socket.data.ua_number = user.ua_number;
    userSockets.set(user.ua_number, socket.id);
    console.log([...userSockets.entries()]);
};

//Remove ua_number => socket.id in userSockets array
const removeSocketUser = async (userSockets, user, socket) => {
    console.log('removeSocketUser');

    userSockets.delete(user.ua_number);
    console.log([...userSockets.entries()]);
};

//Check if ua_number => socket.id is active in userSockets array
const checkSocketStatus = async (userSockets, ua_number) => {
    console.log('checkSocketStatus: ' + ua_number);

    let is_socket_active = userSockets.has(ua_number.toString());
    return is_socket_active;
}

module.exports = {
    addSocketUser,
    removeSocketUser,
    checkSocketStatus
};






