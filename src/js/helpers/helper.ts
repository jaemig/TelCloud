import { Constants } from "./constants";
import axios from "axios";

export class Helper {

    /**
     * Builds an absolute path for outgoing requests
     * @param  {string} url
     * @returns string
     */
    public static buildRequestUrl(url: string): string { return Constants.SERVER_URL + url; }

}