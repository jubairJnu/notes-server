import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

interface Iuser {
  _id: string;
  email: string;
  password: string;
  [key: string]: any;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await (this.usersService.findOne(
      email,
    ) as any as Promise<Iuser>);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const jwtPayload = { email: user.email, id: user._id };
    const token = this.jwtService.sign(jwtPayload);

    return {token};
  }
}
