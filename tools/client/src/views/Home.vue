<template>
  <div class="home">
    <v-card max-width="344">
      <v-card-title><v-icon class="pr-2">mdi-newspaper-variant-outline</v-icon>News Results</v-card-title>
      <v-card-actions>
        <v-btn @click="$router.push('/results')">Results</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home'
}
</script>
