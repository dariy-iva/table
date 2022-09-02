<template>
  <button type="button" @click="onDelete(item)"
          class="delete-button" :title="title">x
  </button>
</template>

<script>
export default {
  name: "DeleteItemButton",
  props: {
    onDelete: Function,
    item: Object,
    title: String,
  },
}
</script>

<style>
.delete-button {
  border: none;
  background: none;
  font-weight: 700;
  color: var(--gray-color);
  transition: all .3s;
}

.delete-button:hover {
  color: var(--red-color);
  transform: scale(1.4);
}
</style>