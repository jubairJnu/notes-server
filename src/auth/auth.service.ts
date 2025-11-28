import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

interface Iuser {
  _id: string;
  email: string;
  password: string;
  [key: string]: any;
}
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await (this.usersService.findOne(
      email,
    ) as any as Promise<Iuser>);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const { password: userPassword, ...result } = user;
    // TODO: Generate a JWT and return it here

    

    return result;
  }
}
