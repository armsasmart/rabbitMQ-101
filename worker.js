const amqp = require('amqplib/callback_api');

amqp.connect('amqp://vxpnakxj:0elWQE3rgAS5vd6D2ZoC8oU4lbz3GrQX@sidewinder.rmq.cloudamqp.com/vxpnakxj', function (error, connection) {
    connection.createChannel(function (error, channel) {
        var queue = 'task_queue';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done" + msg.content.toString());
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});
