

const calculateWater = (wall, blocks, left, right) => {
  let grid = wall * ((right - left) + 1);
  return grid - ((wall * 2) + blocks);
};

const waterFalls = (walls) => {
  // i : an array of heights of different walls
  // o : a tuple with index of wall#1, index of wall#2 and blocks of water
  // c : none
  // e : no blocks, invalid input,  
  
  //left and right need to be higher than the middle one
  //left needs to exist and right needs to exist 

  let blocks = 0;
  let maxWaterBlocks = 0;
  let result = [0, 0, 0];
  let right;
  let water;
  let smallerWall;
  let middle;

  for (let left = 0; left < walls.length - 2; left++) {
    //check if there is a valid block
    if (Math.min(walls[left], walls[left + 2] > walls[left + 1])) {
      right = left + 2; // counter for right wall
      middle = right - 1; // counter for middle wall

      // loop as long as one of the walls is higher than current middle
      while (Math.max(walls[left], walls[right]) > walls[middle] && right < walls.length) {
        blocks += walls[middle]; // accumulate blocks
        smallerWall = Math.min(walls[left], walls[right]); // find smaller wall
        water = calculateWater(smallerWall, blocks, left, right); // calculate water

        //compare water with previous water value
        if (water > maxWaterBlocks) {
          maxWaterBlocks = water;
          result = [left + 1, right + 1, water];
        }

        // reset current walls
        right += 1;
        middle = right - 1;
      }

      //reset blocks for next set of walls after while loop
      blocks = 0;
    }
  }

  return result;
}



/*
Input --> [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
Output --> [3, 8, 11]

Strategy: Iterate over array and check if next wall is smaller than current and
  the one after that is larger than the previous one. If yes, continue until you find
  a wall that is smaller than or equal to the max wall between 2 current; Accumulate water as you go
  comparing it to previous max water.
  If no, condition breaks and reset blocks and water collection with previous value of water collection

Transformation:
  [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
    [5, 3, 7] --> 7 < 3 && 7 > 5, count water blocks with smaller height - middle --> 2
      [5, 3, 7, 2] --> breaks condition of 5 or 2 being higher than 7;
    [3, 7, 2] --> breaks coz 7 is higher
    [7, 2, 6] --> 2 < 7  so collect middle walls --> 4
      [7, 2, 6, 4] --> 6 < 7 middle walls is --> 2 + 6 = 8 // calculate water and compare
      [7, 2, 6, 4, 5] --> 4 < 7, middle walls is 8 + 4 = 12 // calculate water and compare
      [7, 2, 6, 4, 5, 9] --> 5 < 9   walls is 12 + 5 --> 17 // calculate water and compare
      [7, 2, 6, 4, 5, 9, 1] --> 9 > 7  breaks condition
    [2, 6, 4] --> So on


Big O: O(n^2)// worst case it will run a nested loop over the whole array.
*/

console.log(waterFalls([5, 3, 7, 2, 6, 4, 5, 9, 1, 2])); // [3, 8, 11]
console.log(waterFalls([8, 3, 7, 2, 6, 4, 5, 9,])); // [1, 8, 21]
console.log(waterFalls([5, 3, 7, 2, 6, 4])); // [3, 5, 4]
console.log(waterFalls([2, 3, 5, 3, 4, 6])); // [3, 6, 3]
console.log(waterFalls([2, 3, 5, 6, 7])); // [0, 0, 0]
console.log(waterFalls([7, 6, 5, 4, 3])); // [0, 0, 0]
console.log(waterFalls([2, 3, 4, 3, 1])); // [0, 0, 0]

module.exports = {
  waterFalls,
  calculateWater
}