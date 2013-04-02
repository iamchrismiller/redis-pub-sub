Node Redis Pub/Sub
=================

Small Redis pub/sub wrapper for Node.

## Install
```bash
$ npm install redis-pub-sub
```

## Dependencies
  - nohm : ~0.9.3
  - redis : ~0.8.2
  - hiredis : ~0.1.15 (Optional)

## Usage

  - Options
    - host - default (127.0.0.1) - Set the Redis-server Host IP
    - port - default (6379) - Set the Redis-server Port #
    - maxListeners - default (0) - Set the maximum number of listeners. 0 is unlimited.
    - channel - default (global) - The Channel On Which pub/sub communicates
    - detect_buffers - default (false) - All replies will be sent to callbacks as node Buffer objects if any of the input arguments to the original command were Buffer objects. This option lets you switch between Buffers and Strings on a per-command basis, whereas return_buffers applies to every command on a client.
    - return_buffers - default (false) - All replies will be sent to callbacks as node Buffer objects instead of JavaScript Strings
    - connect_timeout - default (false) - Client will keep reconnecting until connected. This parameter should be in milliseconds and is counted once the disconnect occurs
    - max_attempts - default (null) - Client will keep reconnecting until connected. This parameter limits the total amount of reconnects


```javascript

  var redisPubSub = require('redis-pub-sub');

  var appPubSub = new redisPubSub();

  appPubSub.on('create:project', function(data) {
    console.log(data.name);
  });

  appPubSub.emit('create:project', {name : 'foo'});

```

## Tests
  - Coming Soon

## License (MIT)

Copyright 2013 Chris Miller

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.