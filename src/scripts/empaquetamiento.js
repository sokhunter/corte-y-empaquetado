let INF = 100000 * 100000;

export class Material {
  constructor(id, height, width) {
    this.id = id;
    this.height = height;
    this.width = width;
  }
  rotate() {
    [this.height, this.width] = [this.width, this.height];
  }
}

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  moveDown() {
    this.y++;
  }
  moveLeft() {
    this.x--;
  }
}

class Rectangle {
  constructor(lowerLeft, upperRight) {
    this.lowerLeft = lowerLeft;
    this.upperRight = upperRight;
  }
  getSpace() {
    let w = this.upperRight.x - this.lowerLeft.x + 1;
    let h = this.lowerLeft.y - this.upperRight.y + 1;
    return w * h;
  }
}

export class Input {
  table = new Material();
  materials = new Array();
}

function getList(len) {
  let list = new Array();
  for (let id = 0; id < len; id++) {
    list.push(id);
  }
  return list;
}

function moveDown(rectangle) {
  rectangle.lowerLeft.moveDown();
  rectangle.upperRight.moveDown();
  return rectangle;
}

function moveLeft(rectangle) {
  rectangle.lowerLeft.moveLeft();
  rectangle.upperRight.moveLeft();
  return rectangle;
}

function haveCross(r1, r2) {
  let haveCrossX =
    r1.lowerLeft.x <= r2.upperRight.x && r2.lowerLeft.x <= r1.upperRight.x;
  let haveCrossY =
    r2.upperRight.y <= r1.lowerLeft.y && r1.upperRight.y <= r2.lowerLeft.y;
  return haveCrossX && haveCrossY;
}

function isOccupied(space, occupiedSpaces, table) {
  if (space.lowerLeft.y > table.height || space.lowerLeft.x < 1) {
    return true;
  }
  occupiedSpaces.map(rectangle => {
    if (haveCross(space, rectangle)) {
      return true;
    }
  });
  return false;
}

function insideTable(space, table) {
  return space.upperRight.y >= 1;
}

function moveSpace(space, occupiedSpaces, table) {
  let isMoveAny = false;
  let isMove;
  do {
    isMove = false;
    while (!isOccupied(moveDown(space), occupiedSpaces, table)) {
      space = moveDown(space);
      isMove = true;
    }
    while (!isOccupied(moveLeft(space), occupiedSpaces, table)) {
      space = moveLeft(space);
      isMove = true;
      while (!isOccupied(moveDown(space), occupiedSpaces, table)) {
        space = moveDown(space);
        isMove = true;
      }
    }
    if (!insideTable(space, table)) {
      isMove = false;
    }
    if (isMove) {
      isMoveAny = true;
    }
  } while (isMove);
  if (isMoveAny) {
    occupiedSpaces.push_back(space);
  }
  return isMoveAny;
}

function getSumSpaces(occupiedSpaces) {
  let sumSpaces = 0;
  occupiedSpaces.map(rectangle => {
    sumSpaces += rectangle.getSpace();
  });
  return sumSpaces;
}

function impossibleAns(space, table) {
  exceededX = space.upperRight.x - space.lowerLeft.x + 1 > table.width;
  exceededY = space.lowerLeft.y - space.upperRight.y + 1 > table.height;
  return exceededX || exceededY;
}

function getCost(ans) {
  let cost = 0;
  let occupiedSpaces;
  let materialsCount = ans.materials.size();
  for (let i = 0; i < materialsCount; i++) {
    let lowerLeft = Point(ans.table.width - ans.materials[i].width + 1, 0);
    let upperRight = Point(ans.table.width, -ans.materials[i].height + 1);
    let space = Rectangle(lowerLeft, upperRight);
    if (impossibleAns(space, ans.table)) {
      return INF;
    }
    if (!moveSpace(space, occupiedSpaces, ans.table)) {
      cost += ans.table.height * ans.table.width - getSumSpaces(occupiedSpaces);
      occupiedSpaces.clear();
      moveSpace(space, occupiedSpaces, ans.table);
    }
  }
  if (occupiedSpaces.size()) {
    cost += ans.table.height * ans.table.width - getSumSpaces(occupiedSpaces);
  }
  return cost;
}

function getTables(ans) {
  let tables;
  let occupiedSpaces;
  let materialsCount = ans.materials.size();
  for (let i = 0; i < materialsCount; i++) {
    let lowerLeft = Point(ans.table.width - ans.materials[i].width + 1, 0);
    let upperRight = Point(ans.table.width, -ans.materials[i].height + 1);
    let space = Rectangle(lowerLeft, upperRight);
    if (!moveSpace(space, occupiedSpaces, ans.table)) {
      tables.push_back(occupiedSpaces);
      occupiedSpaces.clear();
      moveSpace(space, occupiedSpaces, ans.table);
    }
  }
  if (occupiedSpaces.size()) {
    tables.push_back(occupiedSpaces);
  }
  return tables;
}

function getBestAns(ans1, ans2) {
  return getCost(ans1) < getCost(ans2) ? ans1 : ans2;
}

function applyRotate(input, mask) {
  let materialsCount = input.materials.length;
  for (let i = 0; i < materialsCount; i++) {
    if ((mask >> i) & 1) {
      input.materials[i].rotate();
    }
  }
  return input;
}

function applyPermutate(input, id) {
  let materialsPermutate;
  let materialsCount = input.materials.length;
  for (let i = 0; i < materialsCount; i++) {
    materialsPermutate.push(input.materials[id[i]]);
  }
  input.materials = materialsPermutate;
  return input;
}

function permute(list) {
  let i, ch;
  let permArr = [];
  let usedChars = [];
  for (i = 0; i < list.length; i++) {
    ch = list.splice(i, 1)[0];
    usedChars.push(ch);
    if (list.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(list);
    list.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

function permutate(input) {
  let list = getList(input.materials.length);
  let ans = input;

  let allPermutations = permute(list);
  for (let i = 0; i < allPermutations.length; i++) {
    let inputPermutate = applyPermutate(input, allPermutations[i]);
    ans = getBestAns(ans, inputPermutate);
  }
  //   do {
  //     let inputPermutate = applyPermutate(input, list);
  //     ans = getBestAns(ans, inputPermutate);
  //   } while (next_permutation(list.begin(), list.end()));
  return ans;
}

function rotateAndPermutate(input) {
  let materialsCount = input.materials.length;
  let ans = input;
  for (let mask = 0; mask < 1 << materialsCount; mask++) {
    let inputRotate = applyRotate(input, mask);
    let ansPossible = permutate(inputRotate);
    ans = getBestAns(ans, ansPossible);
  }
  return ans;
}

export const solve = input => {
  return rotateAndPermutate(input);
};

export const readInput = () => {
  let mat = new Material();
  let input = new Input();
  let height, width;
  // cin >> height >> width;
  height = 14;
  width = 10;
  input.table = new Material("", height, width);
  let materialsCount, count, identify;
  // cin >> materialsCount;
  //   while (materialsCount--) {
  //     //     cin >> identify >> height >> width >> count;
  //     while (count--) {
  //       input.materials.push(Material(identify, height, width));
  //     }
  //   }
  input.materials.push(new Material("A", 5, 4));
  input.materials.push(new Material("A", 5, 4));
  input.materials.push(new Material("A", 5, 4));
  input.materials.push(new Material("B", 4, 1));
  input.materials.push(new Material("C", 7, 3));
  input.materials.push(new Material("C", 7, 3));
  input.materials.push(new Material("C", 7, 3));
  input.materials.push(new Material("C", 7, 3));
  return input;
};

export const ejectScript = input => {
  //   let input = readInput();
  let output = solve(input);
  console.log(getCost(output));

  let tables = getTables(output);
  for (let i = 0; i < tables.length; i++) {
    let table = tables[i];
    console.log("Table " + (i + 1));
    table.map(material => {
      console.log(
        material.lowerLeft.x +
          " - " +
          material.upperRight.x +
          "<>" +
          material.upperRight.y +
          "-" +
          material.lowerLeft.y
      );
    });
  }
  return 0;
};

export const prueba = () => {
  let resultado = new Array();
  resultado.push(new Rectangle(new Point(0, 0), new Point(5, 4)));
  resultado.push(new Rectangle(new Point(5, 4), new Point(10, 4)));
  resultado.push(new Rectangle(new Point(10, 5), new Point(14, 5)));
  resultado.push(new Rectangle(new Point(3, 4), new Point(10, 7)));
  resultado.push(new Rectangle(new Point(10, 5), new Point(14, 6)));
  resultado.push(new Rectangle(new Point(0, 7), new Point(7, 10)));
  resultado.push(new Rectangle(new Point(7, 7), new Point(14, 10)));
  return resultado;
};
