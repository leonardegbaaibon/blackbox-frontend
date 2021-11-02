<template>
  <div>
    <div v-show="label" class="mb-1 d-flex">
      <p class="mb-0 text-uppercase text--black font-weight-bold text-caption">
        {{ label }}
      </p>
      <v-spacer></v-spacer>
      <div class="text-caption">
        <slot name="label2"></slot>
      </div>
    </div>
    <v-select
      v-model="dValue"
      :items="items"
      item-text="text"
      item-value="value"
      :menu-props="{ offsetY: true }"
      outlined
      flat
      single-line
      return-object
      class="text-caption"
      @change="change"
    >
      <template #selection="{ item }">
        <span v-if="item.rendered">{{ item.rendered }}</span>
        <span v-else>{{ item.text }}</span>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: '',
    },
    // item: {
    // 	type: Array,
    // 	default: () => [],
    // },
  },
  data() {
    return {
      today: this.$dayjs(),
      dValue: '',
    }
  },

  computed: {
    items() {
      return [
        {
          text: `Today`,
          rendered: `Today - ${this.today.format('MMM DD')}`,
          value: {
            start: this.today.startOf('day').toISOString(),
            end: this.today.toISOString(),
            interval: 'hour',
            text: `Today`,
            rendered: `Today - ${this.today.format('MMM DD')}`,
          },
        },
        {
          text: 'Yesterday',
          rendered: `Yesterday - ${this.today
            .subtract(1, 'day')
            .format('MMM DD')}`,
          value: {
            start: this.today.subtract(1, 'day').startOf('day').toISOString(),
            end: this.today.subtract(1, 'day').endOf('day').toISOString(),
            interval: 'hour',
            text: 'Yesterday',
            rendered: `Yesterday - ${this.today
              .subtract(1, 'day')
              .format('MMM DD')}`,
          },
        },
        {
          text: 'Last 7 days',
          rendered: `${this.today
            .subtract(7, 'day')
            .startOf('day')
            .format('MMM DD')} - ${this.today.format('MMM DD')}`,
          value: {
            start: this.today.subtract(7, 'day').startOf('day').toISOString(),
            end: this.today.endOf('day').toISOString(),
            interval: 'day',
            text: 'Last 7 days',
            rendered: `${this.today
              .subtract(7, 'day')
              .startOf('day')
              .format('MMM DD')} - ${this.today.format('MMM DD')}`,
          },
        },
        // {
        //   text: 'Last 30 days',
        //   value: {
        //     start: this.today.subtract(30, 'day').startOf('day').toISOString(),
        //     end: this.today.endOf('day').toISOString(),
        //     text: 'Last 30 days',
        //     interval: 'day',
        //   },
        // },
        // {
        //   text: 'This Month',
        //   value: {
        //     start: this.today.startOf('month').toISOString(),
        //     end: this.today.endOf('month').toISOString(),
        //     text: 'This Month',
        //     interval: 'day',
        //   },
        // },
        // {
        //   text: 'Last Month',
        //   value: {
        //     start: this.today
        //       .subtract(1, 'month')
        //       .startOf('month')
        //       .toISOString(),
        //     end: this.today.subtract(1, 'month').endOf('month').toISOString(),
        //     interval: 'day',
        //     text: 'Last Month',
        //   },
        // },
      ]
    },
  },

  created() {
    this.dValue = this.items[0]
    this.$emit('change', this.dValue)
  },

  methods: {
    change(evt) {
      this.$emit('change', evt)
      // console.log(evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
