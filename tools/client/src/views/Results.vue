<template>

  <v-flex lg12>

    <v-card class="pa-4" dark>
      <v-dialog
        v-if="selected"
        v-model="dialog"
        max-width="290"

      >
        <v-card text class="pa-4">
          <v-flex text>
            <v-card-title class="headline pa-0 mb-4">Delete {{selected.title}} ?</v-card-title>
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                dark
                @click="dialog = false"
              >
                <v-icon left>save</v-icon>
                Keep
              </v-btn>
              <v-btn
                color="red darken-1"
                dark
                :loading="loading"
                @click="confirmDelete(selected)"
              >
                <v-icon left>delete</v-icon>
                Delete
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-card>
      </v-dialog>
      <v-card-title class="pa-0 mb-4 grey--text text--darken-4">

        <div>

          <div class="headline mb-4 white--text">
            <v-icon class="mr-3">mdi-newspaper-variant-outline</v-icon>
            Results
            <span class="text-sm-subtitle-2 grey--text">total: {{items.length}}</span>
          </div>
        </div>
      </v-card-title>
      <v-card-actions class="mb-4 pa-0">

        <v-btn text ripple class="info" @click="upDateResults">
          Update Results
          <v-icon right>mdi-import</v-icon>
        </v-btn>
      </v-card-actions>

      <v-list light v-if="items.length > 0" two-line subheader loading>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          multiple
        >

          <v-list-item-action class="ml-1 mr-3">
            <v-icon large>mdi-newspaper-variant-outline
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <span>{{ item.date }}</span>
          </v-list-item-content>
          <v-list-item-action >
            <v-btn small class="" icon ripple target="_blank" :href="item.link">
              <v-icon>
                mdi-link
              </v-icon>
            </v-btn>
          </v-list-item-action>
<!--          <v-list-item-action>-->
<!--            <v-btn class="" small icon ripple>-->
<!--              <v-icon @click.stop="selectDelete(item)"-->
<!--                      color="black"-->
<!--              >delete-->
<!--              </v-icon>-->
<!--            </v-btn>-->
<!--          </v-list-item-action>-->

        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item-content>
          <v-list-item-title>No Results available! Update the results.</v-list-item-title>
        </v-list-item-content>
<!--        <v-list-item-action>-->
<!--          <v-btn icon ripple>-->
<!--            <v-icon color="grey lighten-1">add-->
<!--            </v-icon>-->
<!--          </v-btn>-->
<!--        </v-list-item-action>-->

      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ResultsList',
  data () {
    return {
      loading: false,
      selected_item: false,
      dialog: false
    }
  },
  computed: {
    ...mapState({
      items: state => state.results.items,
      selected: state => state.results.selected
    })
  },
  created () {
    this.getResults()
  },
  methods: {
    ...mapActions({
      fetch: 'fetch',
      remove: 'remove',
      scrape: 'scrape'
    }),
    ...mapMutations({
      setSelected: 'selected'
    }),

    getResults () {
      const $this = this
      this.loading = true
      this.fetch((d) => {
        d()
        $this.loading = false
        console.log(this.items())
      })
    },
    upDateResults () {
      this.scrape()
    },
    showResult (item) {
      this.setSelected(item)
      this.$router.push({ name: 'ShowResult', params: { id: item._id } })
    },
    confirmDelete (item) {
      const $this = this
      $this.loading = true
      $this.remove({
        item: item,
        doneParams: $this,
        done: () => {
          $this.loading = false
          $this.dialog = false
        }
      })
    },
    selectDelete (item) {
      this.loading = false
      this.dialog = true
      this.setSelected(item)
    },
    edit (item) {
      this.setSelected(item)
      this.$router.push({ name: 'EditResult', params: { id: item._id } })
    }
  }
}
</script>
<style lang="stylus" scoped>
.v-list-item
  border-bottom: thin solid grey
</style>
