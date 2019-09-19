const amqp = require('amqplib/callback_api');

amqp.connect('amqp://vxpnakxj:0elWQE3rgAS5vd6D2ZoC8oU4lbz3GrQX@sidewinder.rmq.cloudamqp.com/vxpnakxj', (err, conn) => {
    conn.createChannel((err, ch) => {
        const queue = 'hello';
        ch.assertQueue(queue, {durable: false});
        ch.sendToQueue(queue, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
    });
    setTimeout(() => {
        conn.close();
        process.exit(0);
    }, 500);
});
