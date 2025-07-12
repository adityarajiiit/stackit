import {createServer} from 'node:http';
import next from 'next';
import {Server} from 'socket.io';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
const dev=process.env.NODE_ENV !=='production';
const hostname=process.env.HOSTNAME||'localhost';
const app=next({dev,hostname,port:5000})
const handler=app.getRequestHandler();
app.prepare().then(()=>{
    const server=createServer(handler)
    const io=new Server(server);
    io.on("connection",async (socket)=>{
        console.log("new client connected",socket.id);
        const session=await getServerSession(authOptions);
        if(session?.user?.id){
            socket.join(session.user.id);
            console.log(`User ${session.user.email} joined room ${session.user.id}`);
        }
        socket.on("disconnect",()=>{
            console.log("client disconnected",socket.id);
        })

    })
    global.io=io;
    server.once("error",(err)=>{
        console.error(err)

    })
    .listen(5000,hostname,()=>{
        console.log(`Server is running on http://${hostname}:5000`)
    })
})