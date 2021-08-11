import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv')

export class App {
    private express: express.Application;
    private port = 9000;
    private connection = process.env.CONNECTION;

    constructor(){
        this.express = express();
        this.listen();
        this.middlewares();
        this.database();
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
            console.log('Server running...' + this.port);
        });
    }

    private database(): void {
        mongoose.connect('mongodb+srv://user_admin:20202020@cluster0.ocmtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true
         }
            
        );
    }
}