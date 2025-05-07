<template>
  <div class="explorer">
    <div class="left-panel">
      <h2>Folder Tree</h2>
      <FolderTree :folders="tree" @select="selectFolder" />
    </div>
    <div class="right-panel">
      <h2>Details</h2>
      <div v-if="selectedChildren.length > 0">
        <ul>
          <li v-for="folder in selectedChildren" :key="folder.id">
            <div @click="selectFolder(folder)" style="cursor: pointer;">
            📁 {{ folder.name }}
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No items available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FolderTree from './components/FolderTree.vue'

const tree = ref([])
const selectedChildren = ref([])

const selectFolder = (folder) => {
  selectedChildren.value = folder.children || []
}

onMounted(async () => {
  const res = await fetch('http://localhost:3000/folders/tree')
  tree.value = await res.json()
})
</script>

<style>
.explorer {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
}
.left-panel, .right-panel {
  flex: 1;
  padding: 1rem;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}
.right-panel {
  border-right: none;
}
ul {
  list-style: none;
  padding-left: 1rem;
}
</style>
