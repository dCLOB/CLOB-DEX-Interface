const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

export const getAllowance = async (userAddress) => {
    const instance = new web3.eth.Contract(contractABI, '0xe22da380ee6b445bb8273c81944adeb6e8450422')

    /*-- Part of the code if you need to delete your approve --*/
    // web3.eth.sendTransaction({
    //     data: instance.methods.approve('0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911', 0).encodeABI(),
    //     to: instance._address,
    //     from: userAddress,
    //     gasPrice: '130000000000',
    //     gas: '300000',
    //     value: '0',
    // })

    return await instance.methods.allowance(userAddress, '0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911').call()
}

export const testApprove = async (userAddress) => {
    const ABI = [{
        "constant": false,
        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }]

    const instance = new web3.eth.Contract(ABI, '0xe22da380ee6b445bb8273c81944adeb6e8450422')

    return await web3.eth.sendTransaction({
        data: instance.methods.approve('0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911', BigInt(2**254-1)).encodeABI(),
        to: instance._address,
        from: userAddress,
        gasPrice: '130000000000',
        gas: '300000',
        value: '0',
    })
}

export const getDepositBalanceUSDC = async (address) => {
    const perpetualAddress = '0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911'
    const minABI = [{
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "getAccountBalance",
        "outputs": [{
            "components": [{
                "internalType": "bool",
                "name": "marginIsPositive",
                "type": "bool"
            }, {"internalType": "bool", "name": "positionIsPositive", "type": "bool"}, {
                "internalType": "uint120",
                "name": "margin",
                "type": "uint120"
            }, {"internalType": "uint120", "name": "position", "type": "uint120"}],
            "internalType": "struct DxlnTypes.Balance",
            "name": "",
            "type": "tuple"
        }],
        "stateMutability": "view",
        "type": "function"
    }]

    const contract = new web3.eth.Contract(minABI, perpetualAddress)

    return await contract.methods.getAccountBalance(address).call()
}

export const getWalletBalanceUSDC = async (userAddress) => {
    const instance = new web3.eth.Contract(contractABI, '0xe22da380ee6b445bb8273c81944adeb6e8450422')

    return await instance.methods.balanceOf(userAddress).call()
}

export const getApprove = async (address) => {
    const contractAddress = '0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911'
    const minABI = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]

    const contract = new web3.eth.Contract(minABI, '0xe22da380ee6b445bb8273c81944adeb6e8450422')

    const tokenDecimals = web3.utils.toBN(18);

    return await contract.methods.approve('0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911', tokenDecimals).send({
        from: address,
    })
}

export const getOraclePrice = async () => {
    const tokenAddress = '0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911'
    const minABI = [{
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        }, {"indexed": false, "internalType": "bool", "name": "isPositive", "type": "bool"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "bytes32", "name": "balance", "type": "bytes32"}],
        "name": "LogAccountSettled",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
            "indexed": false,
            "internalType": "bytes32",
            "name": "balance",
            "type": "bytes32"
        }],
        "name": "LogDeposit",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "uint256", "name": "settlementPrice", "type": "uint256"}],
        "name": "LogFinalSettlementEnabled",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "bytes32", "name": "index", "type": "bytes32"}],
        "name": "LogIndex",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "address", "name": "funder", "type": "address"}],
        "name": "LogSetFunder",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}],
        "name": "LogSetGlobalOperator",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}],
        "name": "LogSetLocalOperator",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "uint256", "name": "minCollateral", "type": "uint256"}],
        "name": "LogSetMinCollateral",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "address", "name": "oracle", "type": "address"}],
        "name": "LogSetOracle",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "maker", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "taker",
            "type": "address"
        }, {"indexed": false, "internalType": "address", "name": "trader", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "marginAmount",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "positionAmount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "bool", "name": "isBuy", "type": "bool"}, {
            "indexed": false,
            "internalType": "bytes32",
            "name": "makerBalance",
            "type": "bytes32"
        }, {"indexed": false, "internalType": "bytes32", "name": "takerBalance", "type": "bytes32"}],
        "name": "LogTrade",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        }, {"indexed": false, "internalType": "address", "name": "destination", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "bytes32", "name": "balance", "type": "bytes32"}],
        "name": "LogWithdraw",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
            "indexed": false,
            "internalType": "bytes32",
            "name": "balance",
            "type": "bytes32"
        }],
        "name": "LogWithdrawFinalSettlement",
        "type": "event"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "priceLowerBound",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "priceUpperBound", "type": "uint256"}],
        "name": "enableFinalSettlement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "getAccountBalance",
        "outputs": [{
            "components": [{
                "internalType": "bool",
                "name": "marginIsPositive",
                "type": "bool"
            }, {"internalType": "bool", "name": "positionIsPositive", "type": "bool"}, {
                "internalType": "uint120",
                "name": "margin",
                "type": "uint120"
            }, {"internalType": "uint120", "name": "position", "type": "uint120"}],
            "internalType": "struct DxlnTypes.Balance",
            "name": "",
            "type": "tuple"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "getAccountIndex",
        "outputs": [{
            "components": [{
                "internalType": "uint32",
                "name": "timestamp",
                "type": "uint32"
            }, {"internalType": "bool", "name": "isPositive", "type": "bool"}, {
                "internalType": "uint128",
                "name": "value",
                "type": "uint128"
            }], "internalType": "struct DxlnTypes.Index", "name": "", "type": "tuple"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getAdmin",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getFinalSettlementEnabled",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getFunderContract",
        "outputs": [{"internalType": "contract I_DxlnFunder", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getGlobalIndex",
        "outputs": [{
            "components": [{
                "internalType": "uint32",
                "name": "timestamp",
                "type": "uint32"
            }, {"internalType": "bool", "name": "isPositive", "type": "bool"}, {
                "internalType": "uint128",
                "name": "value",
                "type": "uint128"
            }], "internalType": "struct DxlnTypes.Index", "name": "", "type": "tuple"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "operator", "type": "address"}],
        "name": "getIsGlobalOperator",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "getIsLocalOperator",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getMinCollateral",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getOracleContract",
        "outputs": [{"internalType": "contract I_DxlnOracle", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getOraclePrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getTokenContract",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "hasAccountPermissions",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "address",
            "name": "oracle",
            "type": "address"
        }, {"internalType": "address", "name": "funder", "type": "address"}, {
            "internalType": "uint256",
            "name": "minCollateral",
            "type": "uint256"
        }], "name": "initializeV1", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "funder", "type": "address"}],
        "name": "setFunder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }], "name": "setGlobalOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }], "name": "setLocalOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "minCollateral", "type": "uint256"}],
        "name": "setMinCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "oracle", "type": "address"}],
        "name": "setOracle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address[]",
            "name": "accounts",
            "type": "address[]"
        }, {
            "components": [{
                "internalType": "uint256",
                "name": "takerIndex",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "makerIndex", "type": "uint256"}, {
                "internalType": "address",
                "name": "trader",
                "type": "address"
            }, {"internalType": "bytes", "name": "data", "type": "bytes"}],
            "internalType": "struct DxlnTrade.TradeArg[]",
            "name": "trades",
            "type": "tuple[]"
        }], "name": "trade", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
            "internalType": "address",
            "name": "destination",
            "type": "address"
        }, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "withdrawFinalSettlement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]

    const contract = new web3.eth.Contract(minABI, tokenAddress)

    return web3.utils.fromWei(await contract.methods.getOraclePrice().call())
}