export default {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
  reset(state) {
    state.count = 0;
  },
};
