<template>
  <v-card flat>
    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <div class="mr-4 d-flex flex-column">
            <v-icon class="mb-1" color="primary">
              mdi-check-circle-outline
            </v-icon>
            {{ date }}
          </div>
          <div>
            <p class="mb-0">
              <span class="font-weight-bold">Fault:</span>
              {{ fault }}
            </p>
            <p class="mb-0">
              <span class="font-weight-bold">Solution:</span>
              {{ solution }}
            </p>
            <p class="mb-0 error--text">
              <span class="font-weight-bold">Status:</span>
              {{ status }}
            </p>
          </div>
        </div>
        <div class="">{{ vehicle }}</div>
      </div>
    </v-card-text>
    <v-card-actions class="primary white--text">
      <v-spacer />
      <p class="mb-0">{{ criticality }}</p>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    fault: {
      type: String,
      default: 'Engine Breakdown',
    },
    solution: {
      type: String,
      default: 'Find closet mechanic',
    },
    status: {
      type: String,
      default: 'Bad - 2 days to fix',
    },
    date: {
      type: String,
      default: '1:34 PM',
    },
    vehicle: {
      type: String,
      default: 'Toyota Camry',
    },
    criticality: {
      type: String,
      default: 'Recieved critical DPC P0103',
    },
  },
}
</script>

<style lang="scss" scoped></style>
