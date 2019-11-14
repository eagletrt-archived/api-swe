module.exports = {
    srotola: (array, timestamp, millis) => {
        const interval = millis / array.length;
        return array.map((val, index) => [timestamp + interval * index, val]);
    },
    fromData: (data, params) => {
        return data.map(val => {
            const keys = params.split('.');
            const result = {
                timestamp: val.timestamp,
                value: val
            };
            while (keys.length) {
                result.value = result.value[keys[0]];
                keys.shift();
            }
            return result;
        });
    }
}