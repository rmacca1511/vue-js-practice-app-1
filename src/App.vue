<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home'}" exact>
              Jet2 Exercises
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise1'}" exact>
              User Story 1
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise2'}" exact>
              User Story 2
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise3'}" exact>
              User Story 3
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise4'}" exact>
              User Story 4
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise5'}" exact>
              User Story 5
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise6'}" exact>
              User Story 6
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Exercise7'}" exact>
              User Story 7
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'MainBuild'}" exact>
              Main Build
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';


export default {
  name: 'app',
  computed: {
    ...mapState({
      rootFoo: 'foo',
      usersFoo: state => state.users.foo,
    }),
    ...mapState('robots', { robotsFoo: 'foo' }),
    ...mapGetters({ rootGetterFoo: 'foo' }),
    ...mapGetters('robots', { robotsGetterFoo: 'foo' }),
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  background: linear-gradient(to bottom, #ee3123, #f36f65);
  background-attachment: fixed;
  @media screen and (max-width: 767px) {
    margin: 0px;
  }
}
.shown {
  display: block;
}
.hidden {
  display: none;
}

</style>

<style lang="scss" scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  padding: 30px;
  background-color: white;
  width: 1184px;
  min-height: 300px;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 15px;
  }
}
header {
  background-color: #626262;
  width: 1184px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
}
ul {
  padding: 3px;
  display: flex;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  color: white;
  font-weight: 700;
  border-right: 1px solid #4b5a6b;
  cursor: pointer;

  &:hover {
      background-color: white;
      color: #626262;
  }
}
.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
.router-link-active {
  color: white;
}
.container {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}

</style>
