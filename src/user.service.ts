import { UserData } from './app-context';
import { WithUserData } from './user-data.decorator';
import { UserModel } from './user.model';

export class UserService {
  projectModel = new UserModel();
  userData?: UserData;

  // Get user data with a decorator, since the decorator
  // will set the `userData` property on `this` we set it in
  // the class as an optional property to help typescript
  // and the reader.
  @WithUserData
  findAll() {
    const projects = this.projectModel.findAll();

    // Technically no needed since the model is already
    // filtering This option might be also good to ensure
    // optimal security (what if this is called not from
    // http?)
    return projects.filter(
      (el) => el.ownerId === this.userData?.userId,
    );
  }
}
