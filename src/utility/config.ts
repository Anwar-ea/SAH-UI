import {AES, enc} from 'crypto-js'
export let config: null | {backendUrl: string, cryptoSecret: string} = null;
type Configfile = {common: string}
export const loadConfig = async () => {
    await fetch('../../public/config/app-settings.json').then(x=> x.json())
    .then((x: Configfile) => {
        let data = JSON.parse(AES.decrypt(x.common, '13a36a5d73d9bdede60567f0b7086b8540f84c6ccc6d1338b274e061cf2744ee').toString(enc.Utf8));
        config = data;
        console.log(config);
    })
    return
}

