import { get } from "env-var";
import { providers, Contract } from "ethers";

import { ABI } from "../assets/voting-system.abi";

const CONTRACT_ADDRESS = get("CONTRACT_ADDRESS").required().asString();
const NETWORK = get("NETWORK").required().asUrlString();
const provider = new providers.WebSocketProvider(NETWORK);

export const votingSystem = new Contract(
  CONTRACT_ADDRESS, 
  ABI, 
  provider
);