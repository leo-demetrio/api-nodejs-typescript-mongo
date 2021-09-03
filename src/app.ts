import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute';
import messageRouter from './routes/messageRoute';
import 'dotenv/config';

export class App {
    private express: express.Application;
    private port = 9000;
    private connection = process.env.CONNECTION;

    constructor(){
        this.express = express();       
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }
    public getApp(): express.Application {
        return this.express;
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
    }

   
    private listen(): void {
        this.express.listen(this.port, () => {
            console.log('Route test GET /v1/usuarios');
            console.log('http://localhost:' + this.port + ' /v1/usuarios');
            console.log('http://localhost:' + this.port + ' /v1/messages');
        });
    }

    private database(): void {
        mongoose.connect(this.connection,
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
            
        );
    }
    private routes(): void {
        this.express.use('/v1/usuarios', userRouter);
        this.express.use('/v1/messages', messageRouter);
    }
}