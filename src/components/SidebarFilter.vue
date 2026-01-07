<template>
  <div class="filter-panel p-3 mb-3 shadow-sm rounded bg-white bg-opacity-75">
    <div class="row g-2 align-items-end">
      
      <div class="col-6 col-md-3">
        <label class="form-label small fw-bold text-uppercase mb-1">Vuelta</label>
        <select 
          :value="vuelta" 
          @change="$emit('update:vuelta', $event.target.value)"
          class="form-select form-select-sm"
        >
          <option value="primera">Primera Vuelta</option>
          <option value="segunda">Segunda Vuelta</option>
        </select>
      </div>

      <div class="col-6 col-md-3">
        <label class="form-label small fw-bold text-uppercase mb-1">Provincia</label>
        <select 
          :value="provincia" 
          @change="cambiarProvincia" 
          class="form-select form-select-sm"
        >
          <option value="">-- Nacional --</option>
          <option v-for="p in provincias" :key="p.CODPRO" :value="p.CODPRO">
            {{ p.PROVINCIA }}
          </option>
        </select>
      </div>

      <div class="col-6 col-md-3">
        <label class="form-label small fw-bold text-uppercase mb-1">Cantón</label>
        <select 
          :value="canton" 
          @change="$emit('update:canton', $event.target.value)"
          :disabled="!provincia"
          class="form-select form-select-sm"
        >
          <option value="">-- Todos --</option>
          <option v-for="c in cantones" :key="c.CODCAN" :value="c.CODCAN">
            {{ c.CANTON }}
          </option>
        </select>
      </div>

      <div class="col-6 col-md-3">
        <label class="form-label small fw-bold text-uppercase mb-1">Partido</label>
        <select 
          :value="partido" 
          @change="$emit('update:partido', $event.target.value)"
          class="form-select form-select-sm"
        >
          <option value="">Ganadores (General)</option>
          <option v-for="p in partidos" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  vuelta: String,
  provincia: String,
  canton: String,
  partido: String,
  provincias: Array,
  cantones: Array,
  partidos: Array
});

const emit = defineEmits(['update:vuelta', 'update:provincia', 'update:canton', 'update:partido', 'reset-canton']);

const cambiarProvincia = (event) => {
  emit('update:provincia', event.target.value);
  emit('reset-canton');
};
</script>

<style scoped>
.form-label {
  color: #1dafbf; /* Usamos tu color corporativo */
  font-family: 'Oswald', sans-serif;
  letter-spacing: 0.5px;
}
.form-select {
  border: 1px solid #1dafbf;
  color: #333;
}
</style>