import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('transfer')
  transfer(@Body() body: any) {
    const { fromAccountId, toAccountId, amount } = body;
    return this.transactionService.transfer(fromAccountId, toAccountId, amount);
  }
}
