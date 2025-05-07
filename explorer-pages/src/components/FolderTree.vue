<template>
    <ul>
      <li v-for="folder in folders" :key="folder.id">
        <div @click="emitSelect(folder)" style="cursor: pointer;">
          📁 {{ folder.name }}
        </div>
        <FolderTree v-if="folder.children && folder.children.length" :folders="folder.children" @select="emitSelect" />
      </li>
    </ul>
  </template>
  
  <script setup>
  const props = defineProps({
    folders: Array
  })
  
  const emit = defineEmits(['select'])
  
  const emitSelect = (folder) => {
    emit('select', folder)
  }
  </script>
  