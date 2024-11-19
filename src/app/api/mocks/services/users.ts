import { nanoid } from "nanoid";
import { SOROBAN_URL, TOKENS } from "@/constants";
import { getTokenBalance } from "@/hooks/useDexBalance";
import { Client, networks } from "@contracts/dex";

export interface UserData {
  id: string;
  address: string; //wallet address
  balance: {
    [key: string]: number;
  };
}

const dexContract = new Client({
  ...networks.testnet,
  rpcUrl: SOROBAN_URL,
});

class UserService {
  userData: UserData[];

  constructor() {
    this.userData = [];
  }

  async getOrCreateUser(address: string) {
    const user = this.userData.find((user) => user.address === address);
    if (user) return user;

    const res = await Promise.all(TOKENS.map((token) => getTokenBalance(dexContract, address as string, token)));
    const balance = TOKENS.reduce((obj, token, index) => ({ ...obj, [token]: Number(res[index]) }), {});

    const newUser: UserData = { id: nanoid(), address, balance };
    this.userData.push(newUser);
    return newUser;
  }

  addBalance(address: string, token: string, amount: number) {
    const user = this.userData.find((user) => user.address === address);
    if (!user) throw Error("user not found");
    const currentBalance = user.balance[token];
    user.balance[token] = currentBalance + amount;
  }

  getUserById(id: string) {
    return this.userData.find((user) => user.id === id);
  }
}

export const userService = new UserService();
