import moment from "moment";

export const convertSecondsToTime = (seconds: number): string => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const secs = duration.seconds();

    return `${hours ? hours + 'h' : ''}${minutes ? minutes + 'm' : ''}${secs ? secs + 's' : ''}`;
}