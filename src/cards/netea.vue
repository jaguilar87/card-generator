<template>
  <div class="Card">
    <div class="Card-side">
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
        <div class="Card-summary">
          <table class="Card-weapons table is-narrow">
            <tr>
              <th>Weapon</th>
              <th>Range</th>
              <th>Stats</th>
            </tr>
            <tr v-for="weapon in card.weapons" :key="weapon.name">
              <td>{{weapon.name}}</td>
              <td>{{weapon.range}}</td>
              <td>{{getWeaponStats(weapon)}}</td>
            </tr>
          </table>
          <div class="Card-skills-summary">
            <strong>Skills:</strong>
            {{getSkillsSummary(card.skills)}}
          </div>
        </div>
      </div>
    </div>

    <div class="Card-side Card-side--reverse">
      <div class="Card-skills">
        <p v-for="skill in getExpandedSkills()" :key="skill.name" class="Card-skill">
          <strong>{{skill.name}} [{{skill.ref}}]:</strong>
          {{skill.desc}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import access from 'safe-access';
import expand from '../utils/expand';

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
    getExpandedSkills() {
      const skills = new Set();

      try {
        for (const skill of this.$props.card.skills) {
          skills.add(skill);
        }
      } catch (err) {
        // nothing to add here
      }

      try {
        for (const weapon of this.$props.card.weapons) {
          if (weapon.skills) {
            for (const skill of weapon.skills) {
              skills.add(skill);
            }
          }
        }
      } catch (err) {
        // nothing to add here
      }

      return Array.from(skills).map(skill =>
        expand(this.$props.system.references, skill)
      );
    },
    getSkillsSummary(skills) {
      if (!skills || !skills.length) {
        return '-';
      }

      const skillNames = skills.map(skill => {
        const expanded = expand(this.$props.system.references, skill);
        return expanded.name || expanded;
      });

      return skillNames.join(', ');
    },
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
      stats.push(ea && `EA +${ea}`);
      stats.push(mwEa && `MW EA +${mwEa}`);

      // Skills
      if (skills) {
        const skillNames = skills.map(skill => {
          const expanded = expand(this.$props.system.references, skill);
          return expanded.name || expanded;
        });

        stats.push(...skillNames);
      }

      return stats.filter(item => item).join(', ') || '-';
    }
  }
};
</script>

<style lang="scss">
$card-color: #000000;
$border-color: #dcdcdc;

.Card {
  font-size: 7pt;
  margin-bottom: 12px;

  &-side {
    height: 44mm;
    width: 67mm;
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
    padding-top: 6px;
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
  }

  &-skills-summary {
    padding: 2px;
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

  &-skills {
    padding: 5px;

    p + p {
      margin-top: 2px;
    }
  }
}
</style>
