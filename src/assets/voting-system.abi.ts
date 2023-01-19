export const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votingSessionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "VoteRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votingSessionId",
        "type": "uint256"
      }
    ],
    "name": "VotingSessionClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votingSessionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "chairman",
        "type": "address"
      }
    ],
    "name": "VotingSessionCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_votingSessionId",
        "type": "uint256"
      }
    ],
    "name": "close",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_votingSessionId",
        "type": "uint256"
      }
    ],
    "name": "getProposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "decidingVote",
            "type": "uint256"
          }
        ],
        "internalType": "struct VotingSystem.Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_votingSessionId",
        "type": "uint256"
      }
    ],
    "name": "getVotingSession",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isOpen",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "closingTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct VotingSystem.VotingSession",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
      }
    ],
    "name": "getVotingSessions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isOpen",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "closingTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct VotingSystem.VotingSession[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_votingSessionId",
        "type": "uint256"
      }
    ],
    "name": "getWinningProposal",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "decidingVote",
            "type": "uint256"
          }
        ],
        "internalType": "struct VotingSystem.Proposal",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_proposalContents",
        "type": "string[]"
      }
    ],
    "name": "initVotingSession",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_votingSessionId",
        "type": "uint256"
      },
      {
        "internalType": "enum VotingSystem.Choice[]",
        "name": "_choices",
        "type": "uint8[]"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;