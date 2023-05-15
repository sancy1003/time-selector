# Time selector 구현

## 사용 라이브러리

- react
- typescript
- styled-components
- eslint
- prettier

<br />
styled-components를 사용해 작성한 스타일 코드는 일반적으로 상단에 작성하거나 따로 분리하여 사용하지만 기능 코드 평가 시 가독성을 높이기 위해 하단에 작성했습니다.

<br/><br/>

## 프로젝트 폴더 구조

```
src
└─ components
    └─ Clock.tsx
        // 시간을 표시하고 변경할 수 있는 시계 UI를 관리하는 컴포넌트입니다.
    └─ TimeController.tsx
        // 시간 값을 변경할 수 있는 컨트롤러 컴포넌트입니다.
└─ App.tsx
    // Clock, TimeController 컴포넌트를 불러와 선택 컴포넌트를 제공합니다.
```

<br/><br/>

## 프로젝트 실행

```
npm i
npm run start
```

<br/><br/>

## 구현 사항

- **시간 선택 컴포넌트 구현**
  - 분 단위로 time 상태를 관리하는 시간 선택 컴포넌트를 구현했습니다.
- **좌측 영역은 24시간 형태의 시계로 mouse down, move 시에 시계상 마우스 좌표에 해당하는 시간을 선택되는 방식으로 구현**
  - canvas 요소 위에 time 값에 따라 시계의 각도를 계산하여 시계 침을 그립니다.
  - canvas 영역 위에서 마우스 이벤트가 발생하면 마우스 포인터의 좌표와 각도를 계산해 time 값을 구합니다.
- **시 / 분 에 대해서 위, 아래 버튼 클릭시 단위시간만큼 변경 가능하도록 구현.**
  - 입력한 단위만큼 time 값 변경이 가능합니다.

<br/><br/>

## 추가 구현

- **위, 아래 버튼에 Long press 이벤트 추가**
  - 사용자가 시간 변경 버튼을 길게 누르면 300ms 이후부터 이벤트가 반복 실행됩니다. (300ms는 클릭과 길게 누르는 동작을 구분하기 위한 시간입니다.)
  - 누르고 있는 시간이 길어질수록 이벤트 실행 주기가 빨라집니다.
