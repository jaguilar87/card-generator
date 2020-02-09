<template>
  <div class="Card">
    <div class="Card-side">
      <div class="Card-header" :style="titleStyle">
        <Icon class="Card-icon" :type="card.type" />
        <div class="Card-name">{{ card.name }}</div>
        <div class="Card-type">{{ card.type }}</div>
      </div>

      <div class="Card-body">
        <div class="Card-stats">
          <div class="Card-stat Card-stat--header">SPD</div>
          <div class="Card-stat">{{ card.speed }}</div>
          <div class="Card-stat Card-stat--header">ARM</div>
          <div class="Card-stat">{{ card.armour }}</div>
          <div class="Card-stat Card-stat--header">CC</div>
          <div class="Card-stat">{{ card.cc }}</div>
          <div class="Card-stat Card-stat--header">FF</div>
          <div class="Card-stat">{{ card.ff }}</div>
        </div>
        <div
          :class="{
            'Card-summary': true,
            'Card-summary--compact': card.compact
          }"
        >
          <table class="Card-weapons table is-narrow">
            <tr v-if="!card.compact">
              <th class="Card-weaponName">Weapon</th>
              <th>Range</th>
              <th>Stats</th>
            </tr>
            <tr v-for="weapon in card.weapons" :key="weapon.name">
              <td class="Card-weaponName">{{ weapon.name }}</td>
              <td>{{ weapon.range }}</td>
              <td>{{ getWeaponStats(weapon) }}</td>
            </tr>
          </table>

          <div class="Card-skills-summary">
            <strong>Skills:</strong>
            {{ getSkillsSummary(card.skills) }}
          </div>
        </div>
      </div>
    </div>

    <div class="Card-side Card-side--reverse">
      <div
        :class="{ 'Card-skills': true, 'Card-skills--compact': card.compact }"
      >
        <p
          v-for="skill in getExpandedSkills()"
          :key="skill.name"
          class="Card-skill"
        >
          <span v-if="skill.desc">
            <strong>
              <span>{{ skill.name }}</span>
              <span v-if="skill.ref">&nbsp;[{{ skill.ref }}]</span>:
            </strong>
            {{ skill.desc }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import access from 'safe-access';
import expandCollection from '../../utils/expand-collection';
import NeteaIcon from './icon.vue';

export default {
  computed: {
    titleStyle() {
      const safeThis = access(this);

      return {
        background: safeThis('$props.catalog.style.titleBg') || 'darkblue',
        color: safeThis('$props.catalog.style.titleText') || 'white'
      };
    }
  },
  props: {
    card: Object,
    catalog: Object,
    system: Object
  },
  methods: {
    getExpandedSkills({ includeSkills = true, includeWeapons = true } = {}) {
      const skills = [];
      const safeThis = access(this);

      // General Skills
      const generalSkills = safeThis('$props.card.skills');

      if (includeSkills && generalSkills) {
        skills.push(...generalSkills);
      }

      // Weapons
      const weapons = safeThis('$props.card.weapons');
      if (includeWeapons && weapons) {
        for (const weapon of this.$props.card.weapons) {
          if (weapon.skills) {
            skills.push(...weapon.skills);
          }
        }
      }

      return expandCollection(safeThis('$props.system.references'), skills);
    },
    getSkillsSummary() {
      const summ = this.getExpandedSkills({ includeWeapons: false })
        .filter(skill => !skill.skipFromSummary)
        .map(skill => skill.name || skill);

      return summ.join(', ') + '.';
    },
    getWeaponStats({ dmg, skills }) {
      const stats = [];

      // Dmg
      stats.push(dmg);

      // Skills
      if (skills) {
        const skillNames = expandCollection(
          this.$props.system.references,
          skills
        )
          .filter(skill => !skill.skipFromSummary)
          .map(skill => skill.name || skill);

        stats.push(...skillNames);
      }

      return stats.filter(item => item).join(', ') || '-';
    }
  },
  components: {
    Icon: NeteaIcon
  }
};
</script>

<style lang="scss">
$card-color: #000000;
$border-color: #dcdcdc;

@media print {
  .Card:nth-child(9n):not(:last-child) {
    margin-bottom: 100px;
  }
}

.Card {
  font-size: 7pt;
  margin-bottom: 12px;

  &-side {
    height: 41mm;
    width: 63mm;
    overflow: hidden;
    border: 1px solid $card-color;
    border-radius: 6px;

    &--reverse {
      transform: rotate(-180deg);
    }
  }

  &-header,
  &-body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &-header {
    padding: 1px 5px;
    border-bottom: 1px solid $card-color;
  }

  &-icon {
    width: 9%;
    padding-right: 2px;
  }

  &-name {
    width: 70%;
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
    width: 100%;
    border: 0;
    margin-bottom: 0 !important;
  }

  &-stats {
    width: 12%;
    display: flex;
    flex-direction: column;
  }

  &-summary {
    width: 88%;

    &--compact {
      font-size: 6pt !important;
    }
  }

  &-skills-summary {
    padding: 4px;
  }

  &-weaponName {
    max-width: 75px;
  }

  &-stat {
    width: 100%;
    height: 16px;
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

  &-skills {
    padding: 5px;

    p + p {
      margin-top: 2px;
    }

    &--compact {
      padding: 0 5px;
      font-size: 6pt !important;

      p + p {
        margin-top: 0px;
      }
    }
  }
}
</style>
