import { Injectable } from '@nestjs/common';
import { Account, AccountAttributes } from './account.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    return Account.create({
      name,
      email,
      password: hashed,
    } as AccountAttributes);
  }

  async login(email: string, password: string) {
    const user = await Account.findOne({ where: { email } });
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    return user;
  }

  async getBalance(id: number) {
    return Account.findByPk(id);
  }
}
