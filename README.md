# Using Decorators to Set and Get Request Data

- [Applying a Policy to a CSM Design](#applying-a-policy-to-a-csm-design)
- [Create the AsyncLocalStorage and Decorator](#create-the-asynclocalstorage-and-decorator)
- [Get the User Data](#get-the-user-data)

## Applying a Policy to a CSM Design

```text
src/
 |- user.controller.ts
 |- user.service.ts
 '- user.model.ts
```

Consider the use case where we want to apply a policy that
users can only see the projects they own. Often we first
query, then prune. This is a sub-par db query and is prone
to data leaks if we don't prune at the right level - in the
service.

Not only that, but in vanilla javascript, we have to pass in
the data we need for filtering all the way down to the Model
level.

We can elegantly solve this with ALS and Decorators.

`src/index.ts` simply simulates a request coming in and
running through the controller.

## Create the AsyncLocalStorage and Decorator

```text
src/
 |- app-context.ts
 '- user-data.decorator.ts
```

`app-context` uses `AsyncLocalStorage` to setup a simple
data bucket that can hold user data.

`user-data.decorator.ts` pulls off the user data from the
request object and pushes it into the `als`.

## Get the User Data

There are two ways demonstrated in looking up data.

`user.service.ts` uses the `WithUserData` decorator, this
feels nice but gets dicey since you have to decorate the
classes property - I'll be looking for a better way to do
this.

The second approach is in `user.model.ts` where we simply
use the `als` to fetch the user data from the context.
