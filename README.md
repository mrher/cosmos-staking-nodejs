prepare node
git clone https://github.com/cosmos/cosmos-sdk
cd cosmos-sdk
git checkout v0.45.0
make build
./build/simd init my-node --chain-id my-chain\n
./build/simd keys add my-key
./build/simd keys add my-key --keyring-backend test\n
./build/simd collect-gentxs\n

nano ~/.simapp/config/genesis.json
"balances": [
  {
    "address": "cosmos1...твой_адрес",
    "coins": [
      {
        "denom": "stake",
        "amount": "1000000000"
      }
    ]
  }
]

"accounts": [
  {
    "@type": "/cosmos.auth.v1beta1.BaseAccount",
    "address": "cosmos1...твой_адрес",
    "pub_key": null,
    "account_number": "0",
    "sequence": "0"
  }
]
./build/simd gentx my-key 500000000stake --chain-id my-chain\n
./build/simd collect-gentxs



add sections


nano ~/.simapp/config/app.toml
[api]
enable = true
address = "tcp://0.0.0.0:1317"

create keys
./build/simd keys add my-key
get wallet addr
./build/simd keys show my-key -a
start node
./build/simd start

frontend (currently in progress)
- cd src
- npm start

backend
node indes.js
node status.js