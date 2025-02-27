import {config} from './config';
import {AES, enc} from 'crypto-js';

export const encrypt = (data: any): string => {
    return AES.encrypt(data instanceof String ? data.toString() : JSON.stringify(data), config?.cryptoSecret as string).toString();
}

export const decrypt = <T>(data: string): T => {
    return JSON.parse(AES.decrypt(data, config?.cryptoSecret as string).toString(enc.Utf8));
}

