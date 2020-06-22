<template>
  <v-app>
    <v-content>
      <VFrame/>
    </v-content>
  </v-app>
</template>

<script>
import VFrame from './components/Frame'

export default {
  name: 'App',

  components: {
    VFrame
  },

  data: () => ({
    //
  })
}
</script>
