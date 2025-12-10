import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.accountService.register(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.accountService.login(body.email, body.password);
    if (!user) return { error: 'Invalid email or password' };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    };
  }

  @Get(':id/balance')
  getBalance(@Param('id') id: string) {
    return this.accountService.getBalance(Number(id));
  }
}
