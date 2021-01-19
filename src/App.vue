<template>
  <v-app>
    <v-app-bar
      app
      color="green lighten-2"
      dark
      fixed
    >
    <!-- <v-app-bar-title align='center'>
    Connor & Aily
    </v-app-bar-title> -->
      <v-row justify="center" align="center">
        <v-col>
          <h1 style="color: black">Connor & Aily</h1>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home'
require('dotenv').config({path: '../.env'})

export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    //
  }),
};
</script>
