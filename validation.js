'use strict';

var _ = require('underscore');

function validateCharacterKeys(character) {
  var keys = [
    'name',
    'race',
    'class',
    'faction',
    'level'
  ];

  // validate if character has all of the keys
  for (var i = 0; i < keys.length; i++) {
    if (!_.has(character, keys[i])) {
      throw new Error('Character does not have key: ' + keys[i]);
    }
  }
}

function validateCharacterRace(character) {
  var races = [
    'Orc',
    'Tauren',
    'Blood Elf',
    'Human',
    'Gnome',
    'Worgen'
  ];

  // validate if character has correct race
  var hasCorrectRace = false;
  for (var i = 0; i < races.length; i++) {
    if (character.race === races[i]) {
      hasCorrectRace = true;
      break;
    }
  }

  if (!hasCorrectRace) {
    throw new Error('Character has invalid race');
  }
}

function validateCharacterClass(character) {
  var classes = [
    'Warrior',
    'Druid',
    'Death Knight',
    'Mage'
  ];

  // validate if character has correct race
  var hasCorrectClass = false;
  for (var i = 0; i < classes.length; i++) {
    if (character.class === classes[i]) {
      hasCorrectClass = true;
      break;
    }
  }
  
  if (!hasCorrectClass) {
    throw new Error('Character has invalid class');
  }
}

function validateFaction(character) {
  var factions = [
    'Horde',
    'Alliance'
  ];

  var hasCorrectFaction = false;
  for (var i = 0 ; i < factions.length; i++) {
    if (character.faction === factions[i]) {
      hasCorrectFaction = true;
      break;
    }
  }

  if (!hasCorrectFaction) {
    throw new Error('Character has invalid faction');
  }
}

function validateCharacterAttributes(character) {
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
}

exports.validateCharacter = function validateCharacter(character) {
  validateCharacterKeys(character);
  validateCharacterRace(character);
  validateCharacterClass(character);
  validateFaction(character);
  validateCharacterAttributes(character);
};
