import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';

import { Transaction } from './transaction.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}

  async transfer(fromId: number, toId: number, amount: number) {
    const accountServiceUrl = 'http://localhost:3000/accounts'; // Account service

    // 1: Lấy số dư tài khoản nguồn
    const fromBalance = await axios
      .get(`${accountServiceUrl}/${fromId}/balance`)
      .then((res) => res.data.balance);

    if (fromBalance < amount) {
      throw new HttpException('Insufficient balance', 400);
    }

    // 2: Gọi account-service trừ tiền người gửi
    await axios.post(`${accountServiceUrl}/deduct`, {
      id: fromId,
      amount,
    });

    // 3: Gọi account-service cộng tiền người nhận
    await axios.post(`${accountServiceUrl}/deposit`, {
      id: toId,
      amount,
    });

    // 4: Lưu transaction
    return await this.transactionModel.create({
      fromAccountId: fromId,
      toAccountId: toId,
      amount,
      status: 'completed',
    });
  }
}
