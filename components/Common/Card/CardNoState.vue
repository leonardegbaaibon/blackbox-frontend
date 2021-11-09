<template>
  <v-card outlined flat class="py-16">
    <v-card-text class="text-center">
      <p class="text-h5">{{ title }}</p>
      <p v-if="subtitle" class="text-h5">{{ subtitle }}</p>
      <FormButton v-if="buttonText" x-large @click.native="$emit('clicked')">
        {{ buttonText }}
      </FormButton>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No drivers created yet',
    },
    subtitle: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
