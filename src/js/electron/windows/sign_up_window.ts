import { BrowserWindow } from "electron";
import path from "path";
// const path = require("path");

const sign_up_window = () => {
    let sign_up_win = new BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 350,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'api_preload.js')
        },
    });

    sign_up_win.loadFile('../sign_up.html');
}

export default sign_up_window;