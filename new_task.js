const amqp = require('amqplib/callback_api');
const {rabbitMQUrl} = require('./config');
amqp.connect(rabbitMQUrl, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        channel.assertQueue(queue, {
            durable: true
        });
        for (var i = 0; i < 50; i++) {
            channel.sendToQueue(queue, Buffer.from(msg + i), {
                persistent: true
            });
            console.log(" [x] Sent '%s'", msg + i);
        }
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
