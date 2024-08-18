<template>
  <div>
    <v-app-bar class="elevation-0" :color="appColor" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="unselectable">{{ $t('global.application-name') }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="d-none d-md-block">
        <v-btn class="transparent" elevation="0" @click="go('/scan')"><v-icon class="mr-2" :icon="mdiCamera" />{{ $t('navigation.scan') }}</v-btn>
        <v-btn class="transparent" elevation="0" @click="go('/files')"><v-icon class="mr-2" :icon="mdiFileDocumentMultiple" />{{ $t('navigation.files') }}</v-btn>
        <v-btn class="transparent" elevation="0" @click="go('/settings')"><v-icon class="mr-2" :icon="mdiCog" />{{ $t('navigation.settings') }}</v-btn>
        <!-- <v-btn class="transparent" elevation="0" @click="go('/about')"><v-icon class="mr-2" :icon="mdiInformation" />{{ $t('navigation.about') }}</v-btn> -->
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="elevation-0" app temporary>
      <v-list nav>
        <v-list-item :title="$t('navigation.scan')" @click="go('/scan')">
          <template #prepend>
            <v-icon :icon="mdiCamera" />
          </template>
        </v-list-item>

        <v-list-item :title="$t('navigation.files')" @click="go('/files')">
          <template #prepend>
            <v-icon :icon="mdiFileDocumentMultiple" />
          </template>
        </v-list-item>

        <v-list-item :title="$t('navigation.settings')" @click="go('/settings')">
          <template #prepend>
            <v-icon :icon="mdiCog" />
          </template>
        </v-list-item>
        <v-divider />
      </v-list>

      <template #append>
        <div class="d-flex flex-row pa-4 text-caption">
          User Groups: {{ groupNames.join(', ') }} <!-- Display group names -->
          <div class="ml-auto">
            &copy; {{ new Date().getFullYear() }} Kigali DT
          </div>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Constants from '../classes/constants';
import { mdiCamera, mdiCog, mdiFileDocumentMultiple, mdiInformation, mdiTools } from '@mdi/js';
import {jwtDecode} from 'jwt-decode'; // Standard import

export default {
  name: 'Navigation',

  props: {
    appColor: {
      type: String,
      default: 'accent-4'
    }
  },

  setup() {
    return {
      mdiCamera,
      mdiCog,
      mdiFileDocumentMultiple,
      mdiInformation,
      mdiTools
    };
  },

  data() {
    return {
      drawer: false,
      version: Constants.Version,
      accessToken: '',
      groupNames: []
    };
  },

  created() {
    this.accessToken = this.getCookie('accessToken');
    this.decodeToken(this.accessToken);
  },

  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    decodeToken(token) {
      try {
        const decoded = jwtDecode(token);
        this.groupNames = decoded.groups.map(group => group.name);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    },
    go(location) {
      if (this.$route.path !== location) {
        this.$router.push({ path: location, query: { token: this.accessToken } });
      }
    }
  }
};
</script>

<style>
.unselectable {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
