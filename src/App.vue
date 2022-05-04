<template>
  <div id="app">
    <h1>Ejemplo aumentar reducir y asignar</h1>
    <h2>Contador {{ counter }}</h2>
    <v-row>
      <v-col cols="12" sm="4">
        <v-btn color="primary" elevation="2" large>Boton</v-btn>
      </v-col>
      <v-col cols="12" sm="4">
        <button class="btn primary" @click="increment">incrementar</button>
      </v-col>
      <v-col cols="12" sm="4">
        <button class="btn primary" @click="decrement">restar</button>
      </v-col>
      <v-col cols="12" sm="4">
        <button class="btn primary" @click="asignar">asignar</button>
      </v-col>
      <v-col cols="12" sm="4">
        <input type="number" v-model="cantidad" />
      </v-col>
    </v-row>

    <h1>Ejemplo Ajax. Precio de Bitcoin</h1>

    <section v-if="errored">
      <p>
        Lo sentimos, no es posible obtener la información en este momento, por
        favor intente nuevamente mas tarde
      </p>
    </section>

    <section v-else>
      <div v-if="loading">Cargando...</div>

      <div v-else v-for="currency in info" :key="currency.id" class="currency">
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span
          >{{ currency.rate_float | currencydecimal }}
        </span>
      </div>
    </section>

    <h1>Ejemplo Ajax. Lista de usuarios</h1>

    <section v-if="errored">
      <p>
        Lo sentimos, no es posible obtener la información en este momento, por
        de los usuarios favor intente nuevamente mas tarde
      </p>
    </section>

    <section v-else>
      <div v-if="loading">Cargando...</div>

      <!--<div v-else v-for="u in lista" :key="u.id" class="">
        {{ u.email }}:
        <span class="lighten">
          <span v-html="u.name"></span> {{ u.balance }}
        </span>
      </div> -->
      <!-- <div v-else>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="u in lista" :key="u.id">
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div> -->

      <!-- <div v-else>
        <v-data-table 
          :headers='headers'
          :items="lista"
          :items-per-page="5"
          class="elevation-1"></v-data-table>
      </div>-->
      <div v-else>
        <data-table v-bind="parametersTable1" @actionTriggered="handleAction" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import users from "./users";
export default {
  name: "App",
  data() {
    return {
      counter: 0,
      cantidad: 0,
      info: "",
      loading: true,
      errored: false,
      lista: "",
      vuetify,
    };
  },
  computed: {
    parametersTable1() {
      return {
        data: users,
        actionMode: "multiple",
        columnKeys: [
          "name",
          "email",
          "gender",
          "country",
          "job",
          "city",
          "created_at",
        ],
      };
    },
  },
  methods: {
    increment() {
      // update component state
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
    asignar() {
      this.counter = this.cantidad;
    },
    handleAction(actionName, data) {
      console.log(actionName, data);
      window.alert("check out the console to see the logs");
    },
  },
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        this.info = response.data.bpi;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .get("https://my-json-server.typicode.com/jeroc1123/sampleson/users")
      .then((response) => {
        this.lista = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style>
</style>
