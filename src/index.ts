import assert from 'assert';
import { UserController } from './user.controller';

/**
 * We can simulate the workflow by setting up and calling the controller the method to findAll
 */
const ctrl = new UserController();
const result = ctrl.findAll({ user: { userId: 1 } });
console.log(result);
assert(result[0].ownerId === 1);
assert(result.length === 1);
