
const { createStream } = require('table');
const tableConfig = require('../util_funk/tableConfig');
const { commandStatus, eventStatus } = require('../util_funk/registry');

module.exports = async (client) => {
    console.log(`${client.user.tag} is online.`);
    await loadTable(commandStatus, 50);
    console.log("\n");
    await loadTable(eventStatus, 50);
}

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve, reject) => {
        fn = setInterval(() => {
            if(i === arr.length)
            {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval);
    })
}
