<template>
  <div id="wrapper" v-html="display">
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import axios from 'axios'
  import { DateTime } from 'luxon'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
      return {
        display: '<h2><em>Welcome to R&D</em></h2>',
        pingFrequeny: this.$PING_FREQUENCY,
        apiUrl: this.$API_URL
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      getDisplay () {
        console.log(`getting display`)
        return axios.get(`${this.$API_URL}/display`)
      },
      getDateTime () {
        let utcDatetime = DateTime.utc().toISO()
        let time = DateTime.fromISO(utcDatetime).toFormat('t')
        let day = DateTime.fromISO(utcDatetime).toFormat('ccc')
        let date = DateTime.fromISO(utcDatetime).toFormat('DD')
        return `
          <div class="text-center date-time">
            <h1>${time}</h1>
            <h3>${day} ${date}</h3>
          <div>`
      }
    },
    mounted: function () {
      let msg = `
      <p>Mounted...</p>
      <p>Pinging ${this.apiUrl} every ${this.pingFrequeny / 1000} seconds...</p>`
      this.display = msg
      setInterval(() => {
        this.getDisplay()
        .then(result => {
          console.log('result')
          this.display = result.data
        })
        .catch(error => {
          console.log(error)
          this.display = this.getDateTime()
        })
      }, this.pingFrequeny)
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .date-time {
    margin-top: 100px;
    font-size: 4rem;
  }

  .text-center {
    text-align: center;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 0;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
