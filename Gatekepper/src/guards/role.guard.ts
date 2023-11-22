import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/helpers/user-verse.helper';
import { UserVerseService } from 'src/services/user-verse.service';

class RoleGuard implements CanActivate {
    constructor(
        private role: UserRole,
        private readonly userVerseService: UserVerseService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response: any = await this.userVerseService.verify(this.role, request.headers.authorization);
        request.user = response.user;
        return true;
    }
}

@Injectable()
export class AdminGuard extends RoleGuard {
    constructor(userVerseService: UserVerseService) {
        super(UserRole.ADMIN, userVerseService);
    }
}

@Injectable()
export class ShipperGuard extends RoleGuard {
    constructor(userVerseService: UserVerseService) {
        super(UserRole.SHIPPER, userVerseService);
    }
}

@Injectable()
export class UserGuard extends RoleGuard {
    constructor(userVerseService: UserVerseService) {
        super(UserRole.USER, userVerseService);
    }
}
