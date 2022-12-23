# Messari Client

A Node.js client for interacting with the Messari API.


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
    const client = new MessariClient('fake-messari-api-key');
    const asset = await client.getAsset('ethereum');

    if (asset.status.error_message) {
        // An error has been found
        // asset.data will be undefined
    }

    // Life goes on..
});
```


## Features

- [☑] Get basic metadata for an asset 
- [☑] Get the market data for an asset
- [☑] Get the quantitative metrics for an asset
- [☑] Get the list of all assets and their metrics


