# Messari Client

A Node.js client for interacting with the Messari API, which provides crypto research, data and tools.


## Installation

You can install the latest version of the client using:

```bash
$ npm install @torr7s/messari-client
$ yarn add @torr7s/messari-client
```
    
## Getting Started

```javascript
import { MessariClient } from '@torr7s/messari-client';

(async () => {
    const client = new MessariClient('random-messari-api-key');
    const asset = await client.getAsset('ethereum');

    if (asset.status.error_message) {
        // An error has been found
        // asset.data will be undefined
    }

    // Life goes on..
})();
```

## License
This project is (MIT licensed.)[https://github.com/Torr7s/messari-client/blob/main/LICENSE