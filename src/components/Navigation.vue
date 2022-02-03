<template>
  <div class="button-group">
    <router-link :to="{ name: 'Prayers' }">
      <button>Prayers</button>
    </router-link>
    <router-link :to="{ name: 'BibleReading' }">
      <button>Reading</button>
    </router-link>
    <router-link :to="{ name: 'Todos' }">
      <button>Todos</button>
    </router-link>
    <router-link :to="{ name: 'Counter' }">
      <button>Counter</button>
    </router-link>
    <router-link :to="{ name: 'TimerScreen' }">
      <button>Timer</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>
