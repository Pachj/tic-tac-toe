/**
 * Created by Henry on 07.03.17.
 */

function triggerNextMove(selectedField) {
  let trigger;
  switch (selectedField) {
    case 1: {
      trigger = '#field-one';
      break;
    }
    case 2: {
      trigger = '#field-two';
      break;
    }
    case 3: {
      trigger = '#field-three';
      break;
    }
    case 4: {
      trigger = '#field-four';
      break;
    }
    case 5: {
      trigger = '#field-five';
      break;
    }
    case 6: {
      trigger = '#field-six';
      break;
    }
    case 7: {
      trigger = '#field-seven';
      break;
    }
    case 8: {
      trigger = '#field-eight';
      break;
    }
    case 9: {
      trigger = '#field-nine';
      break;
    }
    default: {
      console.log('ERROR! A NON EXPECTED VALUE HAS BEEN SELECTED!');
      break;
    }
  }
  $(trigger).trigger('click');
}

/**
 * @param {Array} player1 - All fields of the player
 * @param {Array} player2 - All fields of the AI
 * @param {Array} notUsedFields - All fields who aren't used *
 */
export default function newAiMove(player1, player2, notUsedFields) { // ToDo: comments
  const cornersAndCenter = [1, 3, 5, 7, 9];
  const edges = [2, 4, 6, 8];
  const remainingFields = notUsedFields.length;

  if (remainingFields === 9) {
    triggerNextMove(Math.floor(Math.random() * cornersAndCenter.length));
  }
}
