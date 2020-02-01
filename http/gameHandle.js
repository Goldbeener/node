module.exports = function (playerAction) {
    const options = ['rock', 'scissors', 'papper'];
    const computerAction = options[Math.floor(Math.random() * 3)]

    if(playerAction === computerAction){
        return 0
    } else if (
        playerAction === 'rock' && computerAction === 'scissors' || 
        playerAction === 'scissors' && computerAction === 'papper' || 
        playerAction === 'papper' && computerAction === 'rock'
    ) {
        return 1
    } else {
        return -1
    }
}