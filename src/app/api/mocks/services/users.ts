import { nanoid } from "nanoid";

export interface UserData {
  id: string;
  address: string; //wallet address
  balance: {
    [key: string]: number;
  };
}

class UserService {
  userData: UserData[];

  constructor() {
    this.userData = [];
  }

  getOrCreateUser(address: string) {
    const user = this.userData.find((user) => user.address === address);
    if (user) return user;

    const newUser: UserData = { id: nanoid(), address, balance: { XLM: 0, USDC: 0, RIO: 0, VELO: 0 } };
    this.userData.push(newUser);
    return newUser;
  }

  addBalance(address: string, token: string, amount: number) {
    const user = this.getOrCreateUser(address);
    const currentBalance = user.balance[token];
    user.balance[token] = currentBalance + amount;
  }
}

export const userService = new UserService();
