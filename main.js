import os from 'os';
import process from 'process';
import WebSocket, {WebSocketServer} from "ws"

function getInfo() {
    let c = os.cpus();
    return {
        message: "success",
        arch: os.arch(),
        cpuInfo: {
            model: c[0].model,
            speed: c[0].speed,
            cores: c.length,
            usage: c.map((i) => i.times),
        },
        systemInfo: {
            type: os.type(),
            release: os.release(),
            platform: os.platform(),
            version: os.version(),
        },
        menInfo: {
            totalMem: os.totalmem(),
            freeMem: os.freemem(),
        },
        storage: {
            main: "",
            total: ""
        },
        serveruptime: os.uptime(),
        processuptime: process.uptime(),
        network: os.networkInterfaces(),
    }
};

new WebSocketServer({
    port: 60030
}).on("connection", (ws) => {
    ws.on("message", (message) => {
        if (message.toString() == "getInfo") {
            ws.send(JSON.stringify(getInfo()));
        }
    })
}).on("close", () => {
    console.log(`break connection`)
})