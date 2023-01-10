import { als } from './app-context';

export class UserModel {
  projects = [
    {
      ownerId: 1,
      projectName: '',
    },
    {
      ownerId: 2,
      projectName: '',
    },
  ];

  findAll() {
    const userData = als.getStore()?.userData;
    console.log('i have a user from the context', userData);

    // optimized db query, ex. select * where userId
    if (userData?.userId) {
      return this.projects.filter(
        (el) => el.ownerId === userData.userId,
      );
    }

    return this.projects;
  }
}
