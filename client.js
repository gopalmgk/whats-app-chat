const socket=io('http://localhost:9000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var Audio=new Audio('Tone.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        Audio.play();
    }
}

const name =prompt("enter your name join");
socket.emit('new-user-joined',name);

 socket.on('user-joinded',name=>{
append(`${name} join the chat`,'right')
 })
 socket.on('receive',data=>{
    append(`${data.name} :${data.message}`,'left')
     })
    
 socket.on('left',name=>{
    append(`${name} left the chat`,'right')
     })
     form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message=messageInput.value;
        append(`You:${message}`,'right');
        socket.emit('send',message);
        messageInput.value=" "
    })