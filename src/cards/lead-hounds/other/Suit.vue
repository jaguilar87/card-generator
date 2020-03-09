<template>
  <div class="Suit">
    <heartSuit v-if="type === 'H'" />
    <spadeSuit v-if="type === 'S'" />
    <clubSuit v-if="type === 'C'" />
    <diamondSuit v-if="type === 'D'" />
  </div>
</template>

<script>
import heartSuit from '@/assets/lead-hounds/suits/hearts.svg';
import spadeSuit from '@/assets/lead-hounds/suits/spades.svg';
import clubSuit from '@/assets/lead-hounds/suits/clubs.svg';
import diamondSuit from '@/assets/lead-hounds/suits/diamonds.svg';

export default {
  props: {
    type: String
  },
  components: {
    heartSuit,
    spadeSuit,
    clubSuit,
    diamondSuit
  }
};
</script>

<style lang="scss" scoped>
.Suit {
  display: inline-block;
  width: 8px;
  height: 8px;
}
</style>
