import { Connection } from "mongoose";

declare global{
    var mongoose: {
        cnc: Connection | null;
        promise: Promise<Connection> | null
    }
}

export {}