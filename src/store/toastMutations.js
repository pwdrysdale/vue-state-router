export default {
  addToasts(state, toast) {
    // add toast to store
    state.toasts.push(toast);
  },
  removeToasts(state, id) {
    // remove toast from store
    state.toasts = state.toasts.filter((t) => t.id !== id);
  },
};
