import { v4 as uuid } from "uuid";

export default {
  addToasts(context, { text, type }) {
    const toast = {
      id: uuid(),
      text,
      type,
    };

    // dispatch addToasts mutation
    context.commit("addToasts", toast);

    // set timeout to remove toast
    setTimeout(() => {
      context.commit("removeToasts", toast.id);
    }, 5000);
  },
};
