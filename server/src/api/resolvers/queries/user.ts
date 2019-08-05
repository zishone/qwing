import { VError } from "verror";

const user = async (obj, args, ctx) => {
  try {
    if (!ctx.username) {
      throw new VError(`Unauthorized`);
    }
    const currentUser = await ctx.mongo.findOne("users", { username: ctx.username }, {});
    currentUser.client = ctx.client;
    return currentUser;
  } catch (error) {
    throw new VError(error, `Error while fetching user`);
  }
};

export { user };
