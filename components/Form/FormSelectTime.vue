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
      <template #append-item>
        <v-list-item ripple class="" @click="dialog = true">
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              Custom time
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-text class="pa-16">
          <v-form>
            <!-- Start -->
            <v-row align="end">
              <v-col>
                <FormDatePicker
                  v-model="startDate"
                  rules="required"
                  label="Start"
                  :max="endDate"
                />
              </v-col>
              <v-col>
                <v-dialog
                  ref="dialog1"
                  v-model="modal1"
                  :return-value.sync="startTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startTime"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="modal1"
                    v-model="startTime"
                    :max="endTime"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(startTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <!-- End -->
            <v-row align="end">
              <v-col>
                <FormDatePicker
                  v-model="endDate"
                  rules="required"
                  label="End"
                  :min="startDate"
                />
              </v-col>
              <v-col>
                <v-dialog
                  ref="dialog2"
                  v-model="modal2"
                  :return-value.sync="endTime"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="endTime"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="modal2"
                    v-model="endTime"
                    :min="startTime"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog2.save(endTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <!-- <div class="mb-1 d-flex">
              <p class="mb-0 text-uppercase text--black font-weight-bold">
                Pick date range
              </p>
            </div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  prepend-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" range no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu> -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <FormButton color="" @click.native="dialog = false">
            Cancel
          </FormButton>
          <FormButton
            :disabled="!startTime || !endTime || !startDate || !endDate"
            @click.native="change(customTime)"
          >
            Save
          </FormButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      startDate: '',
      startTime: null,
      endDate: '',
      endTime: null,
      modal1: false,
      modal2: false,
      // ========
      today: this.$dayjs(),
      dValue: '',
      dialog: false,
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

    customTime() {
      return {
        outside: true,
        text: `Custom Time`,
        rendered: `${this.$dayjs(
          this.startDate + ',' + this.startTime,
          'YYYY-MM-DD,HH:mm'
        ).format('MMM DD, HH:mm')} - ${this.$dayjs(
          this.endDate + ',' + this.endTime,
          'YYYY-MM-DD,HH:mm'
        ).format('MMM DD, HH:mm')}`,
        value: {
          start: this.$dayjs(
            this.startDate + ',' + this.startTime,
            'YYYY-MM-DD,HH:mm'
          ).toISOString(),
          end: this.$dayjs(
            this.endDate + ',' + this.endTime,
            'YYYY-MM-DD,HH:mm'
          ).toISOString(),
          text: `Custom Time`,
          rendered: `${this.$dayjs(
            this.startDate + ',' + this.startTime,
            'YYYY-MM-DD,HH:mm'
          ).format('MMM DD, HH:mm')} - ${this.$dayjs(
            this.endDate + ',' + this.endTime,
            'YYYY-MM-DD,HH:mm'
          ).format('MMM DD, HH:mm')}`,
        },
      }
    },
  },

  created() {
    this.dValue = this.items[0]
    this.$emit('change', this.dValue)
  },

  methods: {
    change(evt) {
      this.$emit('change', evt)
      this.dialog = false
      if (evt.outside) {
        const { outside, ...rest } = evt
        this.dValue = rest
      }
    },

    toggle() {},
  },
}
</script>

<style lang="scss" scoped></style>
