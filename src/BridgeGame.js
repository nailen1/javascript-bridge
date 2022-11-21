const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');
const { generate } = BridgeRandomNumberGenerator;

class BridgeGame {
  bridgeInputs;
  movings = [];
  steps;
  trials = 1;
  result = '실패';
  log = {
    movings: this.movings,
    bridgeInputs: this.bridgeInputs,
    trials: this.trials,
    result: this.result
  };

  constructor(size) {
    this.bridgeSize = size;
  }

  setMoving(input) {
    this.movings.push(input);
    this.steps = this.movings.length;
  }

  setBridgeInput() {
    this.bridgeInputs = BridgeMaker.makeBridge(this.bridgeSize, generate);
  }

  getMatching(index) {
    if (this.movings[index] === this.bridgeInputs[index]) return true;
    if (this.movings[index] !== this.bridgeInputs[index]) return false;
  }

  win() {
    if (this.steps === this.bridgeInputs.length && this.getMatching(this.steps - 1)) {
      this.result = '성공';
      return true
    }
  }

  lose() {
    if (!this.getMatching(this.steps - 1)) {
      return true
    }
  }

  move() {
    if (this.steps !== this.bridgeInputs.length && this.getMatching(this.steps - 1)) {
      return true
    }
  }

  retry(RorQ) {
    if (RorQ === 'R') {
      this.trials++;
      this.movings = [];
      return true
    }
    if (RorQ === 'Q') {
      return false
    }
  }

  isVaildSize(number) {
    if (number < 3 || number > 20) throw new Error('[ERROR] 다리의 길이는 3 이상 20 이하의 정수만 입력 가능합니다.');
    if (isNaN(number)) throw new Error('[ERROR] 다리의 길이는 숫자로만 입력 가능합니다.');
    if (number % 1 !== 0) throw new Error('[ERROR] 다리의 길이는 정수만 입력 가능합니다.');
  }

  isValidInput(UorD) {
    if (UorD.length !== 1) throw new Error('[ERROR] 이동할 칸은 한 문자만 입력 가능합니다.');
    if (/[a-z]/.test(UorD)) throw new Error('[ERROR] 이동할 칸은 대문자만 입력 가능합니다.');
    if (/[^UD]/.test(UorD)) throw new Error('[ERROR] 이동할 칸은 U 또는 D만 입력 가능합니다.');
  }

  isVaildCommand(RorQ) {
    if (RorQ.length !== 1) throw new Error('[ERROR] 재시도 명령어는 한 문자만 입력 가능합니다.');
    if (/[a-z]/.test(RorQ)) throw new Error('[ERROR] 재시도 명령어는 대문자만 입력 가능합니다.');
    if (/[^RQ]/.test(RorQ)) throw new Error('[ERROR] 재시도 명령어는 R 또는 Q만 입력 가능합니다.');
  }
}

module.exports = BridgeGame;
