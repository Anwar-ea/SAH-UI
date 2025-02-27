import {AES, enc} from 'crypto-js'
import axios from 'axios';
export let config: null | {backendUrl: string, cryptoSecret: string} = null;
type Configfile = {common: string}
export const loadConfig = async () => {
    await axios.get<Configfile>('../../public/config/app-settings.json')
    .then((x) => {
        console.log(x.data);
        let data = JSON.parse(AES.decrypt(x.data.common, '13a36a5d73d9bdede60567f0b7086b8540f84c6ccc6d1338b274e061cf2744ee').toString(enc.Utf8));
        config = data;
    })
    return
}

