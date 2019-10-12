# Ethereum

## TODO
- create a private blockchain
  - Create http location to get updates on blockchain
  - Create addresses to mine blocks
- Create contract and store the contracts address
- store the contract's address and http location for the ui to use

- https://medium.com/coinmonks/private-ethereum-by-example-b77063bb634f

# With the given docker-compose configuration
```yml
eth:
  image: ethereum/client-go:alltools-stable
  restart: always
  stdin_open: true
  tty: true
  ports:
    - '8545:8545'
    - '30303:30303'
  command: "--rpc --rpcaddr '0.0.0.0' --rpcport '9000' "
  volumes:
    - ./servers/ethereum/container/data-dir:/eth/data-dir
    - ./servers/ethereum/container/genesis:/eth/genesis
    - ./servers/ethereum/container/users:/eth/users
```


# 1. run the docker-compose container
- `sudo docker-compose run --rm  eth /bin/sh`

# 2. Create a few accounts
- While inside
  - `geth --datadir /eth/data-dir account new`
- Don't forget to save the passwords in text files
  - I personally saved them /eth/users/0xYOUR_PUBLIC_ADDRESS/password.txt

# 3. Setup your genesis block
- follow the directions regarding puppeth while inside
  - `puppeth`

#4 add the genesis block
  - `geth --datadir /eth/data-dir init /eth/genesis/todo_example.json`

#5 Unlock an account
- `geth --datadir /eth/data-dir --nat extip:\\`hostname -i\\` --unlock 0xA_PUBLIC_ADDRESS --password /eth/users/0xA PUBLIC_ADDRESS/password.txt`

# start a miner
- geth --datadir ./datadir --nat extip:`hostname -i` --unlock 0 --password password.txt console
- miner.start(1)

#6 Create The contract and store the contracts address
- https://medium.com/mercuryprotocol/dev-highlights-of-this-week-cb33e58c745f
