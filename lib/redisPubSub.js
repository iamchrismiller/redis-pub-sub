var redis = require('redis');

/**
 * RedisPubSub - Simple Producer/Consumer
 * @param options
 *          port - Redis Port
 *          maxListeners - Max Consumers
 *          channel - Which channel to interact with
 * @constructor
 */
function RedisPubSub (options) {
  this.host =  options && options.host ? options.port : '127.0.0.1';
  this.port =  options && options.port ? options.port : 6379;
  this.maxListeners = options && options.maxListeners ? options.maxListeners : 0;
  this.channel = options && options.channel ? options.channel : 'global';

  this.redisOptions = {
    detect_buffers : options && options.detect_buffers ? options.detect_buffers : false,
    return_buffers : options && options.return_buffers ? options.return_buffers : false,
    connect_timeout : options && options.connect_timeout ? options.connect_timeout : false,
    max_attempts : options && options.max_attempts ? options.max_attempts : false
  };

  this.producer = redis.createClient(this.port, this.host, this.redisOptions);
  this.consumer = redis.createClient(this.port, this.host, this.redisOptions);
  this.consumer.setMaxListeners(this.maxListeners);
}

/**
 * Subscribe To Channel's Stream based on routing_key
 * @param routingKey
 * @param cb
 */
RedisPubSub.prototype.on = function(routingKey, cb) {
  cb = (typeof cb === 'function')  ? cb : function () {};
  //catch published message
  this.consumer.on('pmessage', function (pattern, channel, message) {
    //ensure its for current subscriber
    if (pattern === this.channel + ":" + routingKey) cb(JSON.parse(message));
  }.bind(this));

  this.consumer.psubscribe(this.channel + ":" + routingKey);
};

/**
 * Unsubscribe From Channel's Stream
 * @param routingKey
 */
RedisPubSub.prototype.off = function(routingKey) {
  this.consumer.punsubscribe(this.channel + ":" + routingKey);
}

/**
 * Publish Message To Channel's Stream
 * @param routingKey
 * @param message
 */
RedisPubSub.prototype.emit = function (routingKey, message, cb) {
  cb = (typeof cb === 'function')  ? cb : function () {};
  this.producer.publish(this.channel + ":" + routingKey, JSON.stringify(message), cb);
};

module.exports = RedisPubSub;