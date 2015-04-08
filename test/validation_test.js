'use strict';

var expect = require('chai').expect
  , Validator = require('../validation.js');

describe('Testing character validation', function() {
  it('should throw error if character race is Orc and its faction is not Horde', function() {
    expect(Validator.validateCharacter.bind(null, { 
      name: 'Test',
      level: 1,
      race: 'Orc', 
      faction: 'Alliance', 
      'class': 'Warrior',
    }))
    .to.throw('Orc, Tauren, and Blood Elf races are exclusively Horde faction');
  });

  it('should throw error if character race is Tauren and its faction is not Horde', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Tauren',
      faction: 'Alliance',
      'class': 'Warrior'
    }))
    .to.throw('Orc, Tauren, and Blood Elf races are exclusively Horde faction');
  });

  it('should throw error if character race is Blood Elf and its faction is not Horde', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Blood Elf',
      faction: 'Alliance',
      'class': 'Warrior'
    }))
    .to.throw('Orc, Tauren, and Blood Elf races are exclusively Horde faction');
  });

  it('should throw error if character race is Human and its faction is not Alliance', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Human',
      faction: 'Horde',
      'class': 'Warrior'
    }))
    .to.throw('Human, Gnome, and Worgen races are exclusively Alliance faction');
  });

  it('should throw error if character race is Gnome and its faction is not Alliance', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Gnome',
      faction: 'Horde',
      'class': 'Warrior'
    }))
    .to.throw('Human, Gnome, and Worgen races are exclusively Alliance faction');
  });

  it('should throw error if character race is Worgen and its faction is not Alliance', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Worgen',
      faction: 'Horde',
      'class': 'Warrior'
    }))
    .to.throw('Human, Gnome, and Worgen races are exclusively Alliance faction');
  });

  it('should throw error if character class is Druid and race is Blood Elf', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Blood Elf',
      faction: 'Horde',
      'class': 'Druid',
    }))
    .to.throw('Only Taurens and Worgen can be Druids');
  });

  it('should throw error if character race is Blood Elf and its class is Warrior', function() {
    expect(Validator.validateCharacter.bind(null, {
      name: 'Test',
      level: 1,
      race: 'Blood Elf',
      faction: 'Horde',
      'class': 'Warrior'
    }))
    .to.throw('Blood Elves cannot be Warriors');
  });
});
