const amqp = require('amqplib/callback_api');
const {rabbitMQUrl} = require('./config');
amqp.connect(rabbitMQUrl, (err, conn) => {
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
