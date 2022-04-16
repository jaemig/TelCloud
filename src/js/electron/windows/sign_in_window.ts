import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent, shell } from "electron";
import AuthService from "../services/auth";
import sign_up_window from "./sign_up_window";
import path from "path";
// const path = require('path');

const sign_in_window = () => {
    let sign_in_win = new BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 350,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'api_preload.js')
        },
    });
    
    sign_in_win.loadFile('../sign_in.html');
    sign_in_win.webContents.setWindowOpenHandler(({ url } : { url: string })  => {
        if (url.startsWith('https://github.com/')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    })

    ipcMain.handle('sign-in', async(event: IpcMainInvokeEvent, token: string, user_uuid: string, username: string) => {
        if (token) AuthService.setSessionToken(token);
        if (user_uuid) AuthService.setUserUuid(user_uuid);
        if (username) AuthService.setUsername(username);
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.close();
    })

    ipcMain.handle('set-session-token', async(event: IpcMainInvokeEvent, token: string) => AuthService.setSessionToken(token))

    ipcMain.handle('get-username', async() => AuthService.getUsername());

    ipcMain.handle('show-sign-up-window', () => {
        sign_in_win.close();
        sign_up_window();
    })
}

export default sign_in_window;