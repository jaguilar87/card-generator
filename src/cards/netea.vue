<template>
  <div class="Card">
    <div class="Card-header" :style="titleStyle">
      <div class="Card-headerName">
        <div class="Card-name">{{card.name}}</div>
        <div class="Card-faction">{{catalog.name}}</div>
      </div>
      <div class="Card-type">{{card.type}}</div>
    </div>

    <div class="Card-body">
      <div class="Card-stats">
        <div class="Card-stat Card-stat--header">SPD</div>
        <div class="Card-stat">{{card.speed}}</div>
        <div class="Card-stat Card-stat--header">ARM</div>
        <div class="Card-stat">{{card.armour}}</div>
        <div class="Card-stat Card-stat--header">CC</div>
        <div class="Card-stat">{{card.cc}}</div>
        <div class="Card-stat Card-stat--header">FF</div>
        <div class="Card-stat">{{card.ff}}</div>
      </div>
      <table class="Card-weapons table is-narrow">
        <tr>
          <th class="Card-weaponName">Weapon</th>
          <th class="Card-weaponRange">Range</th>
          <th class="Card-weaponStats">Stats</th>
        </tr>
        <tr v-for="weapon in card.weapons" :key="weapon.name">
          <td>{{weapon.name}}</td>
          <td>{{weapon.range}}</td>
          <td>{{getWeaponStats(weapon)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import access from 'safe-access';

export default {
  computed: {
    titleStyle() {
      return {
        background: access(this, '$props.catalog.style.titleBg') || 'darkblue',
        color: access(this, '$props.catalog.style.titleText') || 'white'
      };
    }
  },
  props: {
    card: Object,
    catalog: Object
  },
  methods: {
    getWeaponStats({ at, ap, aa, bp, ea, mwEa, skills }) {
      const dmg = [];
      const stats = [];

      // Dmg
      dmg.push(at && `AT${at}+`);
      dmg.push(ap && `AP${ap}+`);
      dmg.push(aa && `AA${aa}+`);
      dmg.push(bp && `${bp}BP`);

      stats.push(dmg && dmg.filter(item => item).join('/'));

      // Other
      stats.push(ea && `EA+${ea}`);
      stats.push(mwEa && `MW EA+${mwEa}`);
      skills && stats.push(...skills);

      return stats.filter(item => item).join(', ') || '-';
    }
  }
};
</script>

<style lang="scss">
$card-color: #000000;
$border-color: #dcdcdc;

.Card {
  height: 44mm;
  width: 67mm;
  overflow: hidden;
  border: 1px solid $card-color;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 7pt;

  &-header,
  &-body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &-header {
    padding: 0 5px;
    border-bottom: 1px solid $card-color;
  }

  &-headerName {
    width: 80%;
  }

  &-name {
    font-size: 10pt;
  }

  &-type {
    width: 20%;
    font-size: 10pt;
    text-align: right;
  }

  &-faction {
    width: 33%;
    font-size: 6pt;
    font-style: italic;
  }

  &-weapons {
    width: 88%;
    border: 0;
    margin-bottom: 0 !important;
  }

  &-weaponName {
    width: 70px;
  }
  &-weaponRange {
    width: 40px;
  }
  &-weaponStats {
    width: 70px;
  }

  &-stats {
    width: 12%;
    display: flex;
    flex-direction: column;
  }

  &-stat {
    width: 100%;
    height: 17px;
    text-align: center;
    border-right: 1px solid $border-color;

    &--header {
      font-weight: bold;
      line-height: 20px;
    }

    &:nth-child(even):not(:last-child) {
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
