'use strict';

exports.validateCharacter = function(character) {
  if (character.race === 'Orc' ||
      character.race === 'Tauren' ||
      character.race === 'Blood Elf') {

    if (character.faction !== 'Horde') {
      throw new Error('Orc, Tauren, and Blood Elf races are exclusively Horde faction');
    }
  } else if (character.race === 'Human' ||
             character.race === 'Gnome' || 
             character.race === 'Worgen') {

    if (character.faction !== 'Alliance') {
      throw new Error('Human, Gnome, and Worgen races are exclusively Alliance faction');
    }
  }

  if (character['class'] === 'Druid') {
    if (character.race !== 'Tauren' && character.race !== 'Worgen') {
      throw new Error('Only Taurens and Worgen can be Druids');
    }
  } else if (character['class'] === 'Warrior') {
    if (character.race === 'Blood Elf') {
      throw new Error('Blood Elves cannot be Warriors');
    }
  }
};
