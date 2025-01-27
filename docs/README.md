# 🌉 다리건너기

## ✏️ 파일 목록

### `App.js`

- 다리 건너기 게임의 전체 기능을 실행시키는 play 메소드가 있는 클래스

### `BridgeRandomNumberGenerator.js`

- 미션을 위해 제공된 1/0 난수 생성 메소드가 있는 객체. 코드 수정 없음

### `BridgeMaker.js`

- 숫자(다리의 길이)를 입력 받고 0/1 난수 생성 메소드를 사용하여 숫자만큼 1/0(숫자 비트, number bit)에 대응되는 다리의 칸 U/D(문자 비트, character bit)를 리턴하는 메소드 포함 객체
- 메소드 내부 구현 코드 추가 빼고는 제공된 코드를 그대로 사용. 번외로, 용도에는 차이가 없으나 말뜻 차원에서 '다리 생성기(bridge maker)'보다는 다리 생성을 위한 '문자비트 생성기(character bit maker)' 역할을 함

### `BridgeUnit.js`

- '다리 한 칸'을 의미하는 다리 한 칸 생성기 bridge unit 클래스
- 문자비트 U/D를 입력받아 생성됨
- 다리 한 칸의 정보를 지니고 있고, 사용자가 선택한 문자에 따라 해당 칸의 알맞은 다리 그림 출력 요소 ('[ O ]', '[ X ]' 등)을 생성하는 메소드가 있음. 위 BridgeMaker로부터 생성된 사이즈 갯수 만큼의 문자비트 배열로부터, BridgeUnit 여러 칸이 모여 게임을 위한 다리(bridge)가 생성됨

### `BridgeGame.js`

- 다리 건너기 게임을 전반적으로 관리하는 클래스
- 한번의 다리 건너기 게임 관련 다양한 메소드 제공. 그리고 해당 게임의 데이터, 기록들이 모두 저장됨
- 사용자의 게임 플레이와는 관련이 없지만 log 필드로부터 수행된 게임의 정보 '{ 다리 생성 문자비트 배열, 게임을 중단까지 입력한 사용자 입력 배열, 게임 시도 횟수, 승리 여부 }'를 확인할 수 있음
- 주어진 각종 요구 조건 충족

### `InputView.js`

- 사용자의 입력값을 입력받고, 입력값으로 클래스를 생성하고, 클래스의 다양한 메소드들을 실행시켜 게임을 진행하는 메소드들이 있는 객체
- 메소드는 대부분 파라미터로 'bridge'(BridgeUnit 클래스 배열)와 'bridgeGame'(BridgeGame 클래스)를 가짐. 'method_name(bridgeGame, bridge)'형태
- 이는 직관적으로 '만들어진 다리 역할인 bridge'와 '다리 건너기 게임 관리자(저장소) 역할인 bridgeGame'을 입력에 넣어 특정 기능 메소드의 출력을 얻음을 의미
- 메소드명 'read( 입력값 명 )' 메소드들은 각( 입력값 )을 입력받는 메소드
- 메소드명 'try( 입력값 명 )' 메소드들은 각( 입력값 )관련된 try-catch 구문을 수행하여 에러 처리 후 게임 지속하는 메소드

### `OutputView.js`

- 다리의 모습, 메세지, 결과 정보 등을 콘솔에 출력하는 메소드들이 있는 객체

### `Const.js`

- 안내 문구나 에러 등의 메세지, 게임 규칙 관련 숫자 등의 상수들을 저장하고 있는 객체

## ✏️ 기능 목록

- [x] 다리의 길이를 숫자로 입력받고 문자비트 생성: BridgeMaker.js > makeBridge
  - [x] 다리를 생성할 때 위 칸과 아래 칸 중 건널 수 있는 칸은 0과 1 중 무작위 값을 이용해서 정함
  - [x] 위 칸을 건널 수 있는 경우 U, 아래 칸을 건널 수 있는 경우 D로 나타냄
  - [x] 무작위 값이 0인 경우 아래 칸, 1인 경우 위 칸이 건널 수 있는 칸
- [x] 문자 비트로부터 다리 한 칸(들) 생성: `BridgeUnit.js`(의 배열)
- [x] 유저가 이동할 칸을 선택: `InputView.js` > readMoving
  - [x] 유저가 이동할 때 위 칸은 대문자 U, 아래 칸은 대문자 D를 입력
- [x] 유저가 이동한 칸을 건널 수 있다면 O, 건널 수 없다면 X로 표시: `BridgeUnit.js` > setMark, setMarkIndex, setElement
- [x] 다리의 모습 출력: `InputView.js` > setMap / `OutputView.js` > printMap
- [x] 다리를 끝까지 건너면 게임 종료 `BridgeGame.js` > move, win
- [x] 다리를 건너다 실패하면 게임을 재시작하거나 종료할 수 있음 `BridgeGame.js` > lose, retry
- [x] 재시작해도 처음에 만든 다리로 재사용함: new BridgeGame(size) 클래스의 생성 객체 고정 사용
- [x] 게임 결과의 총 시도한 횟수는 첫 시도를 포함해 게임을 종료할 때까지 시도한 횟수를 나타냄: BridgeGame.js > this.trials, this.log
- [x] 사용자가 잘못된 값을 입력한 경우 예외 처리
  - [x] throw문을 사용해 예외를 발생: `BridgeGame.js` > isValidSize, isValidMoving, isValidCommand
  - [x] "[ERROR]"로 시작하는 에러 메시지를 출력: InputView.js > try ... 메소드들의 try{ } catch(error){ }
  - [x] 에러 출력 부분부터 입력을 다시 받음: try ... 메소드들 내부에 read ... 메소드들 적절히 배치

## ✏️ 예외 상황 처리

- [x] 다리 길이는 3 이상 20 이하의 정수만 입력할 수 있으며 올바른 값이 아니면 예외 치리
  - [x] 3 이상 20 이하 수지만 정수가 아닐 시 (예: 5.5) 예외 치리
- [x] 라운드마다 플레이어가 이동할 칸으로 U(위 칸)와 D(아래 칸) 중 하나의 문자를 입력받고 올바른 값이 아니면 예외 처리
- [x] 게임 재시작/종료 여부를 R(재시작)과 Q(종료) 중 하나의 문자를 입력받고 올바른 값이 아니면 예외 처리
- [x] 예외 상황 발생 후 프로그램을 종료하지 않고 직전 입력을 다시 받음
- [x] 예외 상황 처리 기능 단위 Jest 테스트 코드 작성

## ✏️ 프로그래밍 요구 사항 준수

- [x] indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다.
- [x] 함수(또는 메서드)의 길이가 10라인을 넘어가지 않도록 구현한다.
- [x] 메서드의 파라미터 개수는 최대 3개까지만 허용한다.
- [x] Jest를 이용하여 본인이 정리한 기능 목록이 정상 동작함을 테스트 코드로 확인한다.
