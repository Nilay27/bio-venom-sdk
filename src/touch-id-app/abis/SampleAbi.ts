export const SampleAbi = {
	"ABI version": 2,
	"version": "2.3",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{"name":"_state","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "setState",
			"inputs": [
				{"name":"_state","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "getDetails",
			"inputs": [
			],
			"outputs": [
				{"name":"_state","type":"uint256"},
				{"name":"_tvmPubkey","type":"uint256"},
				{"name":"_msgPubkey","type":"uint256"}
			]
		},
		{
			"name": "checkSignature",
			"inputs": [
				{"name":"hash","type":"uint256"},
				{"name":"signature","type":"cell"},
				{"name":"pubkey","type":"uint256"}
			],
			"outputs": [
			]
		}
	],
	"data": [
		{"key":1,"name":"_nonce","type":"uint16"}
	],
	"events": [
		{
			"name": "StateChange",
			"inputs": [
				{"name":"_state","type":"uint256"}
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{"name":"_pubkey","type":"uint256"},
		{"name":"_timestamp","type":"uint64"},
		{"name":"_constructorFlag","type":"bool"},
		{"name":"_nonce","type":"uint16"},
		{"name":"state","type":"uint256"},
		{"name":"tvmPubkey","type":"uint256"},
		{"name":"msgPubkey","type":"uint256"}
	]
}
