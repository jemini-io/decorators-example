import { EnableUserContext } from './user-data.decorator';
import { UserService } from './user.service';

export class UserController {
  projectService = new UserService();

  @EnableUserContext
  findAll(req: any) {
    // I have user from req.
    console.log('i have a user from the request', req.user);
    return this.projectService.findAll();
  }
}
